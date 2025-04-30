import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaEdit, FaChevronRight } from "react-icons/fa";
import BottomNav from "../../components/BottomNav";
export default function MyPage() {
  const navigate = useNavigate();

  const purchases = [
    { item: "이케아 - 의자 양말", date: "2025.03.01" },
    { item: "이케아 - 원목 책상 협탁", date: "2025.03.01" },
    { item: "코스트코 - 2L 생수 5개 묶음", date: "2025.03.01" },
  ];

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", backgroundColor: "#fff" }}>
      {/* 상단바 */}
      <div
        style={{
          padding: "16px",
          borderBottom: "1px solid #eee",
          display: "flex",
          alignItems: "center",
        }}
      >
        <span
          onClick={() => navigate(-1)}
          style={{ fontSize: 18, cursor: "pointer", marginRight: 12 }}
        >
          ←
        </span>
        <h2
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "#5a6ef5",
            textTransform: "uppercase",
          }}
        >
          MY PAGE
        </h2>
      </div>

      {/* 프로필 */}
      <div
        style={{
          textAlign: "center",
          padding: "24px 0",
          borderBottom: "1px solid #eee",
        }}
      >
        <div style={{ position: "relative", display: "inline-block" }}>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              backgroundColor: "#ddd",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              color: "#fff",
            }}
          >
            <FaUserCircle size={60} />
          </div>
          <FaEdit
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              backgroundColor: "#f89c1c",
              color: "white",
              borderRadius: "50%",
              padding: 4,
              fontSize: 12,
            }}
          />
        </div>
        <div style={{ marginTop: 8, fontWeight: "bold" }}>닉네임</div>
        <div style={{ fontSize: 13, color: "#888" }}>swsystempg@google.com</div>
      </div>

      {/* 거래 내역 */}
      <div style={{ padding: "20px" }}>
        <h3 style={{ fontSize: 14, fontWeight: "bold", marginBottom: 12 }}>
          거래 내역
        </h3>

        {purchases.map((purchase, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  backgroundColor: "#f0f0f0",
                  marginRight: 12,
                }}
              ></div>
              <div>
                <div style={{ fontWeight: "bold", fontSize: 14 }}>{purchase.item}</div>
                <div style={{ fontSize: 12, color: "#999" }}>{purchase.date}</div>
              </div>
            </div>
            <FaChevronRight color="#ccc" />
          </div>
        ))}
      </div>

      {/* Logout 버튼 */}
      <div
        style={{
          padding: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button
          style={{
            width: "100%",
            maxWidth: 280,
            padding: "12px",
            border: "1px solid #5a6ef5",
            borderRadius: "12px",
            backgroundColor: "#fff",
            color: "#5a6ef5",
            fontWeight: "bold",
            fontSize: 15,
            cursor: "pointer",
          }}
          onClick={() => alert("로그아웃")}
        >
          Logout
        </button>
        <BottomNav/>
      </div>
    </div>
  );
}
