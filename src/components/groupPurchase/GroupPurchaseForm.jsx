import React, { useState, useEffect } from "react";
import "./GroupPurchaseForm.css";

const GroupPurchaseForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    category: "",
    productName: "단백질 쉐이크 18개입",
    totalAmount: 24000,
    totalQuantity: 18,
    userQuantity: 2,
    maxParticipants: 4,
    description: "단백질 쉐이크 같이 사실 분 구합니다\n채팅방 들어와주세요",
    productLink: "https://link.coupang.com/a/cneppo",
    imageFile: null,
  });

  const [preview, setPreview] = useState(null);
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, imageFile: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleFormSubmit} className="form">
      {/* 이미지 업로드 */}
      <label htmlFor="imageUpload" className="image-upload-box">
        {preview ? (
          <img src={preview} alt="미리보기" className="image-preview" />
        ) : (
          <span role="img" aria-label="camera" className="camera-icon">
            📷
          </span>
        )}
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="image-input"
        />
      </label>

      {/* 카테고리 */}
      <div className="form-group">
        <label>카테고리</label>
        <select name="category" value={form.category} onChange={handleChange}>
          <option value="">선택하세요</option>
          <option value="식품">식품</option>
          <option value="생활용품">생활용품</option>
          <option value="기타">기타</option>
        </select>
      </div>

      {/* 상품명 */}
      <div className="form-group">
        <label>상품명</label>
        <input
          type="text"
          name="productName"
          value={form.productName}
          onChange={handleChange}
        />
      </div>

      {/* 총 금액 */}
      <div className="form-group">
        <label>총 금액</label>
        <input
          type="number"
          name="totalAmount"
          value={form.totalAmount}
          onChange={handleChange}
        />
      </div>

      {/* 수량 */}
      <div className="form-row">
        <div className="form-group">
          <label>총 수량</label>
          <input
            type="number"
            name="totalQuantity"
            value={form.totalQuantity}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>본인이 구매할 수량</label>
          <input
            type="number"
            name="userQuantity"
            value={form.userQuantity}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* 인원 제한 + 1인 금액 */}
      <div className="form-row">
        <div className="form-group">
          <label>공구 인원 제한</label>
          <input
            type="number"
            name="maxParticipants"
            value={form.maxParticipants}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>1인당 예상 금액</label>
          <input type="number" value={pricePerPerson} readOnly />
          <p className="price-note">
            본인 구매 기준 예상 금액은 {pricePerPerson.toLocaleString()}원
            입니다
          </p>
        </div>
      </div>

      {/* 설명 */}
      <div className="form-group">
        <label>설명</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
        />
      </div>

      {/* 상품 링크 */}
      <div className="form-group">
        <label>상품 링크</label>
        <input
          type="text"
          name="productLink"
          value={form.productLink}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="submit-btn">
        업로드 하기
      </button>
    </form>
  );
};

export default GroupPurchaseForm;
