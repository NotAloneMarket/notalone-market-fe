import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/notalone_logo.png";

export default function OnBoarding() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/Login");
    }, 3000); // 3초 뒤 이동

    return () => clearTimeout(timer);
  }, [navigate]);

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "390px",
      height: "100vh",
      textAlign: "center",
      margin: "auto",
    },
    logo: {
      width: "100px",
      height: "100px",
      marginBottom: "1.5rem",
    },
    title: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "#2563eb",
    },
    subtitle: {
      fontSize: "0.875rem",
      color: "#6b7280",
      marginTop: "0.5rem",
    },
  };

  return (
    <div style={styles.container}>
      <img src={logo} alt="로고" style={styles.logo} />
      <h1 style={styles.title}>나혼자 안산다</h1>
      <p style={styles.subtitle}>1인 가구를 위한 공동구매 플랫폼</p>
    </div>
  );
}
