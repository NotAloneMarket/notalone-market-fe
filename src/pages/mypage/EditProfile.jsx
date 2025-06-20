import React, { useState } from "react";
import { FaUserCircle, FaPhone, FaPen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const handleSubmit = async () => {
  try {
    const formData = new FormData();
    formData.append("userId", 1); // 예시. 실제 로그인 유저 ID로 교체
    formData.append("nickname", nickname);
    formData.append("phoneNum", phoneNum);

    const token = localStorage.getItem("token");

    const res = await axios.put(
      "http://localhost:8080/user/profile",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("프로필 수정 완료!");
    navigate("/mypage");
  } catch (err) {
    console.error(err);
    alert("수정 실패!");
  }
};

export default function EditProfile() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("닉넴");
  const [phoneNum, setPhoneNum] = useState("01012345678");

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 390,
        margin: "0 auto",
        backgroundColor: "#fff",
        minHeight: "100vh",
        paddingBottom: 40,
      }}
    >
      {/* 상단바 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: 16,
          borderBottom: "1px solid #eee",
        }}
      >
        <span
          style={{ fontSize: 18, cursor: "pointer" }}
          onClick={() => navigate(-1)}
        >
          ←
        </span>
        <h2 style={{ marginLeft: 10, fontSize: 16, fontWeight: "bold" }}>
          내 정보 수정
        </h2>
      </div>

      {/* 프로필 */}
      <div style={{ textAlign: "center", marginTop: 32 }}>
        <div style={{ position: "relative", display: "inline-block" }}>
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              backgroundColor: "#ddd",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FaUserCircle size={60} color="#999" />
          </div>
        </div>
        <div style={{ marginTop: 12, fontWeight: "bold", fontSize: 16 }}>
          김동덕
        </div>
      </div>

      {/* 입력 필드 */}
      <div style={{ padding: 24 }}>
        <InputBlock
          icon={<FaPen />}
          label="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <InputBlock
          icon={<FaPhone />}
          label="전화번호"
          value={phoneNum}
          onChange={(e) => setPhoneNum(e.target.value)}
        />

        <button style={buttonStyle} onClick={handleSubmit}>
          수정 정보 저장하기
        </button>
      </div>
    </div>
  );
}

function InputBlock({ icon, label, value, onChange, type = "text" }) {
  return (
    <>
      <label
        style={{
          fontSize: 13,
          marginBottom: 6,
          display: "block",
          marginTop: 16,
        }}
      >
        {label}
      </label>
      <div style={inputWrapperStyle}>
        <span style={iconStyle}>{icon}</span>
        <input
          style={inputStyle}
          value={value}
          onChange={onChange}
          type={type}
        />
      </div>
    </>
  );
}

const inputWrapperStyle = {
  display: "flex",
  alignItems: "center",
  backgroundColor: "#fafafa",
  border: "1px solid #eee",
  borderRadius: "12px",
  padding: "10px 14px",
};

const iconStyle = {
  color: "#aaa",
  marginRight: 10,
};

const inputStyle = {
  flex: 1,
  border: "none",
  outline: "none",
  background: "transparent",
  fontSize: "14px",
};

const buttonStyle = {
  marginTop: 32,
  width: "100%",
  padding: 14,
  border: "1px solid #5a6ef5",
  color: "#5a6ef5",
  fontWeight: "bold",
  borderRadius: 12,
  backgroundColor: "#fff",
  fontSize: 15,
  cursor: "pointer",
};
