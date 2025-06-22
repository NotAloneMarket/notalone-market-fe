import React, { useState, useEffect } from "react";
import { FaPen, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import sampleImg from "../../assets/sample.png";
import * as S from "./Home.styles";
import axios from "../../api/axiosInstance";

export default function Home() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [productList, setProductList] = useState([]);
  const [keyword, setKeyword] = useState("");

  const categories = ["전체", "식품", "전자제품", "생활용품", "의류", "기타"];

  const fetchProducts = async () => {
    try {
      let url = "/posts";
      const params = {};

      if (keyword.trim() !== "") {
        params.keyword = keyword.trim();
      }
      if (selectedCategory !== "전체") {
        params.category = selectedCategory;
      }

      const res = await axios.get(url, {
        params,
      });

      const rawData = Array.isArray(res.data)
        ? res.data
        : res.data.postList ?? [];

      const transformed = rawData.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.totalAmount
          ? `${Math.floor(item.totalAmount / item.totalQuantity)} 원`
          : "가격 정보 없음",
        chatCount: 0,
        image: item.imageUrl?.startsWith("/uploads")
          ? `http://localhost:8080${item.imageUrl}`
          : item.imageUrl || sampleImg,
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

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchProducts();
    }
  };

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
      {/* 검색창 */}
      <S.SearchBox>
        <FaSearch style={{ marginRight: 8, color: "#888" }} />
        <S.SearchInput
          type="text"
          placeholder="검색어를 입력하세요"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleSearchKeyDown}
        />
      </S.SearchBox>

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
          <S.ProductItem
            key={product.id}
            onClick={() => navigate(`/Detail/${product.id}`)}
          >
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
