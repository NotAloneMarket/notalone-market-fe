import React from "react";
import "./GroupPurchaseDetailPage.css";
import sampleImg from "../../assets/sample.png";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function GroupPurchaseDetailPage() {
  const totalAmount = 24000;
  const totalQuantity = 18;
  const availableQuantity = 16;
  const unitPrice = Math.floor(totalAmount / totalQuantity);
  const navigate = useNavigate();

  return (
    <div className="detail-page">
      {/* 상단 바 */}
      <div className="top-bar">
        <FaChevronLeft
          size={24}
          className="back-btn"
          onClick={() => navigate(-1)}
        />
        <div className="menu-btn">
          <span />
          <span />
          <span />
        </div>
      </div>

      {/* 상품 이미지 */}
      <div className="image-container">
        <img src={sampleImg} alt="단백질 쉐이크" className="product-image" />
      </div>

      {/* 본문 정보 */}
      <div className="info-section">
        <h1 className="title">단백질 쉐이크 18개입</h1>
        <div className="sub-info">
          <span className="category">식품</span>
          <span className="nickname">닉네임</span>
        </div>

        <div className="description">
          단백질 쉐이크 같이 사실 분 구합니다 <br />
          채팅방 들어와주세요
        </div>

        <div className="detail-table">
          <div className="row">
            <span>총 금액</span>
            <span>{totalAmount.toLocaleString()} 원</span>
          </div>
          <div className="row">
            <span>총 수량</span>
            <span>{totalQuantity} 개</span>
          </div>
          <div className="row">
            <span>구매 가능 수량</span>
            <span>{availableQuantity} 개</span>
          </div>
        </div>
      </div>

      {/* 하단 고정 바 */}
      <div className="bottom-bar">
        <div className="left-info">
          <div className="unit-price-label">1개 당 예상 금액</div>
          <div className="unit-price">{unitPrice.toLocaleString()} 원</div>
        </div>

        <div className="member-info">
          <span className="dot" />
          <span className="dot" />
          <span className="dot empty" />
          <span className="dot empty" />
        </div>

        <button className="chat-btn">채팅방 참여</button>
      </div>
    </div>
  );
}
