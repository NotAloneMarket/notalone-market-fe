import React, { useEffect, useState } from "react";
import sampleImg from "@/assets/sample.png";
import * as S from "./Orders.styles";
import axios from "@/api/axiosInstance";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  function parseJwt(token) {
    try {
      const base64Url = token.split(".")[1]; // payload 부분
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
          .join("")
      );
      return JSON.parse(jsonPayload); // payload 객체 반환
    } catch (e) {
      console.error("JWT 파싱 실패", e);
      return null;
    }
  }

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/buyHistory", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const transformed = res.data.buyHistory.map((item) => ({
        id: item.postId,
        date:
          new Date(item.completedAt).toLocaleDateString("ko-KR", {
            month: "2-digit",
            day: "2-digit",
          }) + " 거래 완료", // 예: "05.20 거래 완료"
        title: item.title,
        quantity: item.quantity,
        price: item.price.toLocaleString() + " 원",
        image: "http://localhost:8080" + item.imageUrl || sampleImg,
      }));

      setOrders(transformed);
    } catch (err) {
      console.error("주문 데이터 불러오기 실패", err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const payload = parseJwt(token);
    console.log("로그인한 사용자 정보:", payload); // userId, loginId 등 확인

    fetchOrders();
  }, []);

  return (
    <S.PageWrapper>
      <S.Header>
        <S.Title>Orders</S.Title>
      </S.Header>

      <S.Main>
        {orders.map((order, idx) => (
          <S.OrderItem key={order.id ?? idx}>
            <S.Image src={order.image} alt="product" />
            <S.OrderInfo>
              <S.OrderDate>{order.date}</S.OrderDate>
              <S.OrderTitle>{order.title}</S.OrderTitle>
            </S.OrderInfo>
            <S.OrderRight>
              <S.OrderQty>1개 당</S.OrderQty>
              <S.OrderPrice>{order.price}</S.OrderPrice>
            </S.OrderRight>
          </S.OrderItem>
        ))}
      </S.Main>
    </S.PageWrapper>
  );
}
