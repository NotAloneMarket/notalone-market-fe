import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaPen, FaChevronRight } from "react-icons/fa";
import axios from "axios";
import BottomNav from "../../components/BottomNav";

export default function MyPage() {
  const navigate = useNavigate();

  const purchases = [
    { item: "이케아 - 의자 양말", date: "2025.03.01" },
    { item: "이케아 - 원목 책상 협탁", date: "2025.03.01" },
    { item: "코스트코 - 2L 생수 5개 묶음", date: "2025.03.01" },
  ];

  const [nickname, setNickname] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("✅ 사용자 정보:", res.data);
        setNickname(res.data.nickname);
        setProfileImageUrl("http://localhost:8080" + res.data.profileImageUrl);
      } catch (err) {
        console.error("❌ 사용자 정보를 불러오지 못했습니다", err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", backgroundColor: "#fff" }}>
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
              overflow: "hidden",
            }}
          >
            {profileImageUrl ? (
              <img
                src={profileImageUrl}
                alt="프로필 이미지"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <FaUserCircle size={60} />
            )}
          </div>
          <div
            onClick={() => navigate("/editprofile")}
            style={{
              position: "absolute",
              right: -6,
              bottom: -6,
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundColor: "#f89c1c",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              zIndex: 2,
            }}
          >
            <FaPen
              style={{
                color: "#fff",
                fontSize: 14,
              }}
            />
          </div>
        </div>
        <div style={{ marginTop: 8, fontWeight: "bold" }}>{nickname}</div>
      </div>

      {/* 내가 쓴 글 */}
      <div style={{ padding: "20px" }}>
        <h3 style={{ fontSize: 14, fontWeight: "bold", marginBottom: 12 }}>
          내가 쓴 글
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
                <div style={{ fontWeight: "bold", fontSize: 14 }}>
                  {purchase.item}
                </div>
                <div style={{ fontSize: 12, color: "#999" }}>
                  {purchase.date}
                </div>
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
          onClick={() => {
            localStorage.removeItem("token"); // 토큰 삭제
            alert("로그아웃 되었습니다."); // 알림창 표시
            navigate("/login"); // 로그인 페이지로 이동
          }}
        >
          Logout
        </button>
        <BottomNav />
      </div>
    </div>
  );
}
