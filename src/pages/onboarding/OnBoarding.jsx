import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/notalone_logo.png";

export default function OnBoarding() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-yellow-100 text-center">
      <img src={logo} alt="로고" className="w-24 h-24 mb-6" />
      <h1 className="text-2xl font-bold text-blue-600">나혼자 안산다</h1>
      <p className="text-sm text-gray-500 mt-2">
        1인 가구를 위한 공동구매 플랫폼
      </p>
    </div>
  );
}
