import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaIdBadge,
  FaPhone,
  FaLock,
  FaCheckSquare,
  FaRegSquare,
  FaUniversity,
} from "react-icons/fa";

export default function Join() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nickname: "",
    username: "",
    phone: "",
    password: "",
    passwordConfirm: "",
    account: "",
    agreed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    if (!form.agreed) {
      alert("약관에 동의해주세요.");
      return;
    }
    alert("회원가입 완료");
    navigate("/Login");
  };

  const renderInput = (icon, placeholder, name, type = "text") => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#fafafa",
        border: "1px solid #eee",
        borderRadius: "12px",
        padding: "10px 14px",
        marginBottom: "16px",
      }}
    >
      <div style={{ marginRight: 10, color: "#aaa" }}>{icon}</div>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={form[name]}
        onChange={handleChange}
        style={{
          flex: 1,
          border: "none",
          outline: "none",
          background: "transparent",
          fontSize: "14px",
        }}
      />
    </div>
  );

  return (
    <div
      style={{
        backgroundColor: "#f8f8f8",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "360px",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          padding: "40px 24px",
          boxShadow: "0 0 10px rgba(0,0,0,0.05)",
        }}
      >
        {/* 상단 로고/제목 */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#5a6ef5", marginBottom: "8px" }}>
            나혼자 안산다
          </h1>
          <p style={{ fontSize: "13px", color: "#888" }}>
            1인 가구를 위한 공동구매 플랫폼
          </p>
        </div>

        {/* 페이지 제목 */}
        <div style={{ textAlign: "center", fontWeight: "bold", fontSize: "16px", marginBottom: "24px" }}>
          회원가입
        </div>

        {/* 입력 폼 */}
        {renderInput(<FaUser />, "닉네임", "nickname")}
        {renderInput(<FaIdBadge />, "아이디", "username")}
        {renderInput(<FaPhone />, "전화번호", "phone")}
        {renderInput(<FaLock />, "비밀번호", "password", "password")}
        {renderInput(<FaLock />, "비밀번호 확인을 위해 비밀번호 재입력", "passwordConfirm", "password")}
        {renderInput(<FaUniversity />, "계좌번호", "account")}

        {/* 약관 동의 */}
        <label
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 13,
            color: "#666",
            marginBottom: 20,
            gap: 8,
          }}
        >
          <input
            type="checkbox"
            name="agreed"
            checked={form.agreed}
            onChange={handleChange}
            style={{ width: 16, height: 16 }}
          />
          <span>
            모든 사항을 확인하였고,{" "}
            <span style={{ color: "#5a6ef5", fontWeight: "bold" }}>
              나혼자 안산다
            </span>{" "}
            에 가입합니다.
          </span>
        </label>

        {/* 가입 버튼 */}
        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            backgroundColor: "#5a6ef5",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            padding: "12px",
            fontSize: "15px",
            fontWeight: "bold",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          회원가입 완료
        </button>

        {/* 하단 로그인 유도 */}
        <div style={{ textAlign: "center", fontSize: 13, color: "#888" }}>
          이미 계정이 있으신가요?{" "}
          <span
            onClick={() => navigate("/Login")}
            style={{
              color: "#5a6ef5",
              textDecoration: "underline",
              cursor: "pointer",
              marginLeft: 4,
            }}
          >
            로그인
          </span>
        </div>
      </div>
    </div>
  );
}
