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

  const categoryMap = {
    전체: null,
    식품: 1,
    전자제품: 2,
    생활용품: 3,
    의류: 4,
    기타: 5,
  };

  const fetchProducts = async () => {
    try {
      const params = {};
      if (keyword.trim()) params.keyword = keyword.trim();

      const categoryId = categoryMap[selectedCategory];
      if (categoryId) params.categoryId = categoryId;

      const res = await axios.get("/posts", { params });

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
      console.log("받은 상품 리스트:", transformed);
      setProductList(transformed);
    } catch (err) {
      console.error("상품 목록 불러오기 실패", err);
      setProductList([]);
    }
  };

  // 카테고리 변경 시 검색어 포함하여 자동 검색
  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") fetchProducts();
  };

  // 검색 버
  const handleSearchClick = () => {
    fetchProducts();
  };

  // 채팅방 인원수
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
      <S.SearchBox>
        <FaSearch
          style={{ marginRight: 8, color: "#888", cursor: "pointer" }}
          onClick={handleSearchClick}
        />
        <S.SearchInput
          type="text"
          placeholder="검색어를 입력하세요"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleSearchKeyDown}
        />
      </S.SearchBox>

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
        {productList.length === 0 ? (
          <S.NoResultMessage>
            {keyword.trim()
              ? selectedCategory !== "전체"
                ? `"${selectedCategory}"에서 "${keyword}" 검색 결과가 없습니다.`
                : `"${keyword}"에 대한 검색 결과가 없습니다.`
              : `"${selectedCategory}"에 등록된 상품이 없습니다.`}
          </S.NoResultMessage>
        ) : (
          productList.map((product) => (
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
          ))
        )}
      </S.ProductList>

      <S.FloatingButton onClick={() => navigate("/ProductUpload")}>
        <FaPen />
      </S.FloatingButton>
    </S.Container>
  );
}
