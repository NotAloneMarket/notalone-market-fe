import React, { useEffect, useState } from "react";
import sampleImg from "@/assets/sample.png";
import * as S from "./Orders.styles";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      // 더미 데이터
      const dummyData = Array(10).fill({
        id: crypto.randomUUID(), // 고유 키
        date: "04.10 거래 완료",
        title: "단백질 쉐이크 18개입",
        quantity: 3,
        price: "3,999 원",
        image: sampleImg,
      });

      setOrders(dummyData);
    } catch (err) {
      console.error("주문 데이터 불러오기 실패", err);
    }
  };

  useEffect(() => {
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
              <S.OrderQty>{order.quantity}개</S.OrderQty>
              <S.OrderPrice>{order.price}</S.OrderPrice>
            </S.OrderRight>
          </S.OrderItem>
        ))}
      </S.Main>
    </S.PageWrapper>
  );
}
