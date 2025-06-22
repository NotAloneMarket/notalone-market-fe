import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const userId = params.get("userId");

    const alreadyLoggedIn = !!localStorage.getItem("token");

    if (alreadyLoggedIn) {
      console.log("이미 로그인됨");
      navigate("/home");
      return;
    }

    if (token && userId) {
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      console.log("토큰 저장 완료:", token);

      // 쿼리스트링 제거 → 재진입 방지
      window.history.replaceState({}, "", "/home");
      navigate("/home");
    } else {
      console.log("토큰 없음, 로그인 페이지로");
      window.location.href = "http://localhost:8080/thymeleaf-login";
    }
  }, [navigate]);

  return <div>로그인 중입니다...</div>;
}
