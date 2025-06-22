import React, { useState, useEffect } from "react";
import { FaPen, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import sampleImg from "../../assets/sample.png";
import * as S from "./Home.styles";
import axios from "../../api/axiosInstance";

export default function Home() {
  const navigate = useNavigate();

  // 선택된 카테고리 상태 ("전체", "식품", ...)
  const [selectedCategory, setSelectedCategory] = useState("전체");

  // 렌더링할 상품 리스트
  const [productList, setProductList] = useState([]);

  // 검색어 입력값 상태
  const [keyword, setKeyword] = useState("");

  // 카테고리 리스트
  const categories = ["전체", "식품", "전자제품", "생활용품", "의류", "기타"];

  // 상품 리스트를 서버에서 불러오는 함수 (검색어, 카테고리 반영)
  const fetchProducts = async () => {
    try {
      const params = {};

      if (keyword.trim() !== "") {
        params.keyword = keyword.trim();
      }
      if (selectedCategory !== "전체") {
        params.category = selectedCategory;
      }

      const res = await axios.get("http://localhost:8080/posts", {
        params,
      });


      // 응답 형식 유연하게 처리 (배열 또는 객체 내부 postList)
      const rawData = Array.isArray(res.data)
        ? res.data
        : res.data.postList ?? [];

      // 서버 응답을 화면 출력용 형태로 변환
      const transformed = rawData.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.totalAmount
          ? `${Math.floor(item.totalAmount / item.totalQuantity)} 원`
          : "가격 정보 없음",
        chatCount: 0, // 추후 채팅 수 데이터가 있으면 반영
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

  // 카테고리 선택 변경 시 자동으로 상품 목록 불러오기
  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  // Enter 키 입력 시 검색 수행
  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") fetchProducts();
  };

  // 검색 버튼 클릭 시 검색 수행
  const handleSearchClick = () => {
    fetchProducts();
  };

  // 채팅 개수에 따라 점(...) 표시 렌더링
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
      {/* 🔍 검색창 */}
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

      {/* 🗂 카테고리 버튼 바 */}
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

      {/* 🛍 상품 리스트 영역 */}
      <S.ProductList>
        {productList.length === 0 ? (
          // 결과가 없을 경우 메시지 출력
          <S.NoResultMessage>검색 결과가 없습니다.</S.NoResultMessage>
        ) : (
          // 결과가 있을 경우 상품 렌더링
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

      {/* ➕ 상품 등록 버튼 (우측 하단 고정) */}
      <S.FloatingButton onClick={() => navigate("/ProductUpload")}>
        <FaPen />
      </S.FloatingButton>
    </S.Container>
  );
}
