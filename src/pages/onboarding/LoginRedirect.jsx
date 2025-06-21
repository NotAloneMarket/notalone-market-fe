import { useEffect } from "react";

export default function LoginRedirect() {
  useEffect(() => {
    // Spring 서버의 login 페이지로 이동
    window.location.href = "http://localhost:8080/thymeleaf-login";
  }, []);

  return null;
}
