import React from "react";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const navigate = useNavigate();

  return (
    <div style={{ width: "100%", maxWidth: 390, margin: "0 auto", backgroundColor: "#fff", minHeight: "100vh", paddingBottom: 40 }}>
      {/* 상단바 */}
      <div style={{ display: "flex", alignItems: "center", padding: 16, borderBottom: "1px solid #eee" }}>
        <span style={{ fontSize: 18, cursor: "pointer" }} onClick={() => navigate(-1)}>←</span>
        <h2 style={{ marginLeft: 10, fontSize: 16, fontWeight: "bold" }}>PW 수정 페이지</h2>
      </div>

      {/* 입력 영역 */}
      <div style={{ padding: 24 }}>
        <InputBlock label="현재 비밀번호" defaultValue="xxx@gmail.com" />
        <InputBlock label="변경 비밀번호" defaultValue="xxx@gmail.com" />
        <InputBlock label="변경 비밀번호 확인" defaultValue="xxx@gmail.com" />

        <button style={buttonStyle}>수정 정보 저장하기</button>
      </div>
    </div>
  );
}

function InputBlock({ label, defaultValue }) {
  return (
    <>
      <label style={{ fontSize: 13, marginBottom: 6, display: "block", marginTop: 16 }}>{label}</label>
      <div style={inputWrapperStyle}>
        <span style={iconStyle}><FaLock /></span>
        <input style={inputStyle} defaultValue={defaultValue} type="password" />
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
