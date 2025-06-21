import { useEffect } from "react";

export default function OnBoardingRedirect() {
  useEffect(() => {
    // 8080 포트의 타임리프 온보딩 페이지로 리디렉션
    window.location.href = "http://localhost:8080/onboarding";
  }, []);

  return null; // 아무것도 렌더링하지 않음
}
