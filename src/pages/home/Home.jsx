import React, { useState, useEffect } from "react";
import { FaPen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import sampleImg from "../../assets/sample.png";
import * as S from "./Home.styles";
import axios from "../../api/axiosInstance";

export default function Home() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [productList, setProductList] = useState([]);

  const categories = [
    "전체",
    "식품",
    "도서/반려/티켓",
    "가구/인테리어",
    "잡화",
  ];

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/posts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log("posts 응답 데이터:", res.data);

      const data = res.data ?? [];

      const filtered =
        selectedCategory === "전체"
          ? data
          : data.filter((p) => p.categoryName === selectedCategory);

      const transformed = filtered.map((item) => ({
        id: item.id,
        title: item.title,
        price: `${Math.floor(item.totalAmount / item.totalQuantity)} 원`,
        chatCount: 0,
        image: item.imageUrl?.startsWith("/uploads")
          ? `http://localhost:8080${item.imageUrl}`
          : sampleImg, // 로컬 이미지 대체
      }));

      setProductList(transformed);
    } catch (err) {
      console.error("상품 목록 불러오기 실패", err);
      setProductList([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const renderChatDots = (count) => {
    const dots = Array(Math.min(count, 3)).fill("●");
    return (
      <S.ChatDots>
        {dots.map((dot, i) => (
          <span key={i}>{dot}</span>
        ))}
        {count > 3 && <span>...</span>}
      </S.ChatDots>
    );
  };

  return (
    <S.Container>
      <S.CategoryBar>
        {categories.map((cat) => (
          <S.CategoryButton
            key={cat}
            active={selectedCategory === cat}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </S.CategoryButton>
        ))}
      </S.CategoryBar>

      <S.ProductList>
        {productList.map((product) => (
          <S.ProductItem key={product.id} onClick={() => navigate(`/Detail`)}>
            <S.ProductImage src={product.image} alt="product" />
            <S.ProductInfo>
              <S.ProductTitle>{product.title}</S.ProductTitle>
              <S.ProductSub>1개당 예상 금액</S.ProductSub>
              <S.ProductFooter>
                {renderChatDots(product.chatCount)}
                <S.ProductPrice>{product.price}</S.ProductPrice>
              </S.ProductFooter>
            </S.ProductInfo>
          </S.ProductItem>
        ))}
      </S.ProductList>

      <S.FloatingButton onClick={() => navigate("/ProductUpload")}>
        <FaPen />
      </S.FloatingButton>
    </S.Container>
  );
}
