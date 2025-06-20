import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import axios from "../../api/axiosInstance"; 

export default function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("/user/login", {
        loginId: id,
        password: password,
      });

      const { token, userId } = response.data;

      // 토큰을 localStorage 또는 sessionStorage에 저장
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      console.log("token: ", token);
      // 홈 화면으로 이동
      navigate("/Home");
    } catch (err) {
      console.error(err);
      setError("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  };

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
          <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#5a6ef5", marginBottom: "8px" }}>
            나혼자 안산다
          </h1>
          <p style={{ fontSize: "13px", color: "#888" }}>
            1인 가구를 위한 공동구매 플랫폼
          </p>
        </div>

        <div style={{ textAlign: "center", fontWeight: "bold", fontSize: "16px", marginBottom: "24px" }}>
          로그인
        </div>

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
          <FaEnvelope style={{ marginRight: "10px", color: "#aaa" }} />
          <input
            type="text"
            placeholder="아이디"
            value={id}
            onChange={(e) => setId(e.target.value)}
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: "14px",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#fafafa",
            border: "1px solid #eee",
            borderRadius: "12px",
            padding: "10px 14px",
            marginBottom: "24px",
          }}
        >
          <FaLock style={{ marginRight: "10px", color: "#aaa" }} />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: "14px",
            }}
          />
        </div>

        {error && (
          <div style={{ color: "red", fontSize: "13px", marginBottom: "16px", textAlign: "center" }}>
            {error}
          </div>
        )}

        <button
          onClick={handleLogin}
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
            marginBottom: "12px",
          }}
        >
          로그인
        </button>

        <div style={{ textAlign: "center" }}>
          <span
            style={{
              fontSize: "13px",
              color: "#5a6ef5",
              cursor: "pointer",
              textDecoration: "underline",
            }}
            onClick={() => navigate("/Join")}
          >
            회원가입
          </span>
        </div>
      </div>
    </div>
  );
}
