import React, { useState } from "react";
import { FaChevronLeft, FaSearch, FaPen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("식품");

  const categories = [
    "전체",
    "식품",
    "도서/반려/티켓",
    "가구/인테리어",
    "잡화",
  ];

  // 상품 리스트는 추후 axios로 대체
  const productList = Array(5).fill({
    title: "단백질 쉐이크 18개입",
    price: "1,333 원",
    chatCount: 3,
    image: "/sample.svg", // 실제 경로로 대체 예정
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

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      navigate(`/SearchResult?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="bg-white min-h-screen max-w-sm mx-auto flex flex-col pb-16 relative">
      {/* 상단 헤더 */}
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <FaChevronLeft className="text-gray-700" onClick={() => navigate(-1)} />
        <h1 className="text-lg font-bold text-blue-600">Home</h1>
        <FaSearch
          className="text-gray-700"
          onClick={() => setSearchOpen(!searchOpen)}
        />
      </div>

      {/* 검색창 */}
      {searchOpen && (
        <div className="p-4">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className="w-full border rounded-full px-4 py-2 bg-gray-100 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearchSubmit}
          />
        </div>
      )}

      {/* 카테고리 */}
      <div className="flex overflow-x-auto gap-2 px-4 py-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-full border text-sm whitespace-nowrap ${
              selectedCategory === cat
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-600 border-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
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
        onClick={() => navigate("/write")}
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
