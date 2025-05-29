import React, { useState, useEffect } from "react";
import { FaPen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import sampleImg from "../../assets/sample.png"; // 또는 상대경로: ../../assets/sample.png
import * as S from "./Home.styles";

export default function Home() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("식품");
  const [productList, setProductList] = useState([]);

  const categories = [
    "전체",
    "식품",
    "도서/반려/티켓",
    "가구/인테리어",
    "잡화",
  ];

  // axios 또는 fetch로 교체
  const fetchProducts = async () => {
    // 임시 데이터
    const response = Array(10).fill({
      id: crypto.randomUUID(), // key로 활용
      title: "단백질 쉐이크 18개입",
      price: "1,333 원",
      chatCount: 4,
      image: sampleImg,
    });
    setProductList(response);
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]); // 카테고리 변경 시 다시 불러오기

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
      {/* 카테고리 */}
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
      {/* 상품 리스트 */}
      <S.ProductList>
        {productList.map((product) => (
          <S.ProductItem key={product.id}>
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
      {/* 글쓰기 버튼 */}
      <S.FloatingButton onClick={() => navigate("/group-purchase/create")}>
        <FaPen />
      </S.FloatingButton>
    </S.Container>
  );
}
