import React from "react";
import { FaChevronLeft, FaPen } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

export default function SearchResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("q");

  // 추후 axios로 대체할 상품 리스트
  const productList = Array(5).fill({
    title: "단백질 쉐이크 18개입",
    price: "1,333 원",
    chatCount: 3,
    image: "/sample.svg",
  });

  const renderChatDots = (count) => {
    const dots = Array(Math.min(count, 3)).fill("●");
    return (
      <div className="flex gap-1 text-blue-500 text-sm items-center">
        {dots.map((dot, i) => (
          <span key={i}>{dot}</span>
        ))}
        {count > 3 && <span>...</span>}
      </div>
    );
  };

  return (
    <div className="bg-white min-h-screen max-w-sm mx-auto flex flex-col pb-16 relative">
      {/* 상단 헤더 */}
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <FaChevronLeft className="text-gray-700" onClick={() => navigate(-1)} />
        <h1 className="text-lg font-bold text-blue-600">검색 결과</h1>
        <div className="w-5" /> {/* 오른쪽 아이콘 없음 */}
      </div>

      {/* 검색어 요약 */}
      <div className="px-4 py-2 text-sm text-gray-500">
        <span className="font-semibold text-black">"{keyword}"</span>에 대한
        검색 결과입니다.
      </div>

      {/* 상품 리스트 */}
      <div className="p-4 space-y-4 overflow-y-auto">
        {productList.map((product, idx) => (
          <div key={idx} className="flex items-center border-b pb-3">
            <img
              src={product.image}
              alt="product"
              className="w-16 h-16 object-cover rounded mr-4"
            />
            <div className="flex-1">
              <div className="font-semibold text-sm mb-1">{product.title}</div>
              <div className="text-xs text-gray-400 mb-1">1개당 예상 금액</div>
              <div className="flex items-center justify-between">
                {renderChatDots(product.chatCount)}
                <div className="font-bold text-sm">{product.price}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 플로팅 작성 버튼 */}
      <button
        className="fixed bottom-20 right-4 w-12 h-12 rounded-full bg-blue-500 text-white shadow-lg flex items-center justify-center"
        onClick={() => navigate("/create")}
      >
        <FaPen />
      </button>

      {/* 하단 고정 내비게이션 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t flex justify-around py-2 z-10">
        <div className="text-center text-blue-500">Home</div>
        <div className="text-center text-gray-400">Chat</div>
        <div className="text-center text-gray-400">Orders</div>
        <div className="text-center text-gray-400">Mypage</div>
      </div>
    </div>
  );
}
