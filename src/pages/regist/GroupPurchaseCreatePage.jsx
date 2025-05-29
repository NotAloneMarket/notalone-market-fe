import React from "react";
import { useNavigate } from "react-router-dom";
import GroupPurchaseForm from "../../components/groupPurchase/GroupPurchaseForm";
import "./GroupPurchaseCreatePage.css";

const GroupPurchaseCreatePage = () => {
  const navigate = useNavigate();

  const handleUpload = (form) => {
    alert("업로드 완료!");
    // TODO: 여기에 업로드 API 호출 로직 작성
    console.log("제출된 데이터:", form);
    navigate("/Home");
  };

  return (
    <div className="group-purchase-page">
      <button onClick={() => navigate(-1)} className="back-button">
        {"<"} 뒤로가기
      </button>
      <GroupPurchaseForm onSubmit={handleUpload} />
    </div>
  );
};

export default GroupPurchaseCreatePage;
