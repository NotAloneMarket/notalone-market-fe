import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaChevronLeft, FaPen } from "react-icons/fa";
import * as S from "./SearchResult.styles";
import sampleImg from "../../assets/sample.png";

export default function SearchResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("q");

  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async (keyword) => {
    setIsLoading(true);
    try {
      // const res = await axios.get(`/api/products/search?q=${keyword}`);
      const dummyData = Array(10).fill({
        id: crypto.randomUUID(),
        title: "단백질 쉐이크 18개입",
        price: "1,333 원",
        chatCount: 3,
        image: sampleImg,
      });
      setProductList(dummyData);
    } catch (error) {
      console.error("검색 실패:", error);
      setProductList([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (keyword) fetchProducts(keyword);
  }, [keyword]);

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
      <S.KeywordSummary>
        <span className="highlight">"{keyword}"</span>에 대한 검색 결과입니다.
      </S.KeywordSummary>

      {/* ✅ 로딩 처리 */}
      {isLoading ? (
        <S.ProductList>불러오는 중...</S.ProductList>
      ) : productList.length === 0 ? (
        <S.ProductList>검색 결과가 없습니다.</S.ProductList>
      ) : (
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
      )}
    </S.Container>
  );
}
