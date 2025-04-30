import React from "react";
import { FaUserCircle, FaEnvelope, FaPhone, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const navigate = useNavigate();

  return (
    <div style={{ width: "100%", maxWidth: 390, margin: "0 auto", backgroundColor: "#fff", minHeight: "100vh", paddingBottom: 40 }}>
      {/* 상단바 */}
      <div style={{ display: "flex", alignItems: "center", padding: 16, borderBottom: "1px solid #eee" }}>
        <span style={{ fontSize: 18, cursor: "pointer" }} onClick={() => navigate(-1)}>←</span>
        <h2 style={{ marginLeft: 10, fontSize: 16, fontWeight: "bold" }}>내 정보 수정</h2>
      </div>

      {/* 프로필 */}
      <div style={{ textAlign: "center", marginTop: 32 }}>
        <div style={{ position: "relative", display: "inline-block" }}>
          <div style={{
            width: 100, height: 100, borderRadius: "50%",
            backgroundColor: "#ddd", display: "flex",
            justifyContent: "center", alignItems: "center"
          }}>
            <FaUserCircle size={60} color="#999" />
          </div>
          <div style={{
            position: "absolute", bottom: 0, right: 0,
            backgroundColor: "#f89c1c", borderRadius: "50%",
            width: 24, height: 24, fontSize: 12, color: "#fff",
            display: "flex", justifyContent: "center", alignItems: "center"
          }}>✎</div>
        </div>
        <div style={{ marginTop: 12, fontWeight: "bold", fontSize: 16 }}>김동덕</div>
      </div>

      {/* 입력 필드 */}
      <div style={{ padding: 24 }}>
        <InputBlock icon={<FaEnvelope />} label="아이디" defaultValue="xxx@gmail.com" />
        <InputBlock icon={<FaPhone />} label="전화번호" defaultValue="+82 010-0000-0000" />
        <InputBlock icon={<FaLock />} label="비밀번호" defaultValue="••••••••" type="password" />

        <button style={buttonStyle}>수정 정보 저장하기</button>
      </div>
    </div>
  );
}

function InputBlock({ icon, label, defaultValue, type = "text" }) {
  return (
    <>
      <label style={{ fontSize: 13, marginBottom: 6, display: "block", marginTop: 16 }}>{label}</label>
      <div style={inputWrapperStyle}>
        <span style={iconStyle}>{icon}</span>
        <input style={inputStyle} defaultValue={defaultValue} type={type} />
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
