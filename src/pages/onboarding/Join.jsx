import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaIdBadge,
  FaPhone,
  FaLock,
  FaUniversity,
} from "react-icons/fa";
import axios from "../../api/axiosInstance";

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

  const handleSubmit = async () => {
    if (!form.agreed) {
      alert("약관에 동의해주세요.");
      return;
    }

    if (form.password !== form.passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const payload = {
        loginId: form.username,
        password: form.password,
        nickname: form.nickname,
        phoneNum: form.phone,
        accountNumber: form.account,
      };

      const res = await axios.post(
        "http://localhost:8080/user/register",
        payload
      );

      if (res.status === 201) {
        alert("회원가입이 완료되었습니다.");
        navigate("/Login");
      }
    } catch (err) {
      console.error("회원가입 오류:", err);
      alert("회원가입 실패. 이미 존재하는 아이디일 수 있습니다.");
    }
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
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#5a6ef5",
              marginBottom: "8px",
            }}
          >
            나혼자 안산다
          </h1>
          <p style={{ fontSize: "13px", color: "#888" }}>
            1인 가구를 위한 공동구매 플랫폼
          </p>
        </div>

        <div
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "16px",
            marginBottom: "24px",
          }}
        >
          회원가입
        </div>

        {renderInput(<FaUser />, "닉네임", "nickname")}
        {renderInput(<FaIdBadge />, "아이디", "username")}
        {renderInput(<FaPhone />, "전화번호", "phone")}
        {renderInput(<FaLock />, "비밀번호", "password", "password")}
        {renderInput(
          <FaLock />,
          "비밀번호 확인",
          "passwordConfirm",
          "password"
        )}
        {renderInput(<FaUniversity />, "계좌번호", "account")}

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
