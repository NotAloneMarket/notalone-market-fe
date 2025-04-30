import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProductUploadPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    category: "",
    productName: "단백질 쉐이크 18개입",
    totalAmount: 24000,
    totalQuantity: 18,
    userQuantity: 2,
    maxParticipants: 4,
    description: "단백질 쉐이크 같이 사실 분 구합니다\n채팅방 들어와주세요",
    productLink: "https://link.coupang.com/a/cneppo",
  });

  const [pricePerPerson, setPricePerPerson] = useState(0);

  useEffect(() => {
    const perItemPrice =
      form.totalQuantity > 0 ? form.totalAmount / form.totalQuantity : 0;
    const personalPrice = perItemPrice * form.userQuantity;
    setPricePerPerson(Math.floor(personalPrice));
  }, [form.totalAmount, form.totalQuantity, form.userQuantity]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpload = () => {
    alert("업로드 완료!");
    // TODO: 업로드 처리 로직
    navigate("/Home");
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6 font-sans">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-gray-600 hover:text-black"
      >
        {"<"} 뒤로가기
      </button>

      {/* 이미지 업로드 박스 */}
      <div className="w-full h-72 bg-gray-400 rounded-xl flex items-center justify-center mb-6">
        <span role="img" aria-label="camera" className="text-4xl">
          📷
        </span>
      </div>

      {/* 카테고리 */}
      <div className="mb-4">
        <label className="block text-sm font-medium">카테고리</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="mt-1 w-full p-2 border rounded-lg"
        >
          <option value="">선택하세요</option>
          <option value="식품">식품</option>
          <option value="생활용품">생활용품</option>
          <option value="기타">기타</option>
        </select>
      </div>

      {/* 상품명 */}
      <div className="mb-4">
        <label className="block text-sm font-medium">상품명</label>
        <input
          type="text"
          name="productName"
          value={form.productName}
          onChange={handleChange}
          className="mt-1 w-full p-2 border rounded-lg"
        />
      </div>

      {/* 총 금액 */}
      <div className="mb-4">
        <label className="block text-sm font-medium">총 금액</label>
        <input
          type="number"
          name="totalAmount"
          value={form.totalAmount}
          onChange={handleChange}
          className="mt-1 w-full p-2 border rounded-lg"
        />
      </div>

      {/* 수량 입력 */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium">총 수량</label>
          <input
            type="number"
            name="totalQuantity"
            value={form.totalQuantity}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            본인이 구매할 수량
          </label>
          <input
            type="number"
            name="userQuantity"
            value={form.userQuantity}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded-lg"
          />
        </div>
      </div>

      {/* 제한 인원 / 1인당 금액 */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium">공구 인원 제한</label>
          <input
            type="number"
            name="maxParticipants"
            value={form.maxParticipants}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">1인당 예상 금액</label>
          <input
            type="number"
            value={pricePerPerson}
            readOnly
            className="mt-1 w-full p-2 border rounded-lg bg-gray-100"
          />
          <p className="text-[11px] text-red-500 mt-1">
            본인 구매 기준 예상 금액은 {pricePerPerson.toLocaleString()}원
            입니다
          </p>
        </div>
      </div>

      {/* 설명 */}
      <div className="mb-4">
        <label className="block text-sm font-medium">설명</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          className="mt-1 w-full p-2 border rounded-lg resize-none"
        />
      </div>

      {/* 상품 링크 */}
      <div className="mb-6">
        <label className="block text-sm font-medium">상품 링크</label>
        <input
          type="text"
          name="productLink"
          value={form.productLink}
          onChange={handleChange}
          className="mt-1 w-full p-2 border rounded-lg"
        />
      </div>

      {/* 업로드 버튼 */}
      <button
        onClick={handleUpload}
        className="w-full py-3 bg-[#4D7ADB] text-white font-semibold rounded-xl hover:bg-[#3B6AD4] transition"
      >
        업로드 하기
      </button>
    </div>
  );
}

export default ProductUploadPage;
