// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import MainLayout from "@/pages/MainLayout";
import ChatRooms from "@/pages/chat/ChatRooms";
import ChatRoom from "@/pages/chat/ChatRoom";
import Orders from "@/pages/orders/Orders";
import Home from "@/pages/home/Home";
import SearchResult from "@/pages/home/SearchResult";
import OnBoarding from "@/pages/onboarding/OnBoarding";
import Login from "@/pages/onboarding/Login";
import Join from "@/pages/onboarding/Join";
import MyPage from "@/pages/mypage/MyPage";
import EditProfile from "@/pages/mypage/EditProfile";
import ProductUpload from "@/pages/regist/ProductUpload";

export default function AppRoutes() {
  return (
    <Routes>
      {/* 레이아웃 없이 보여줄 페이지 */}
      <Route path="/Login" element={<Login />} />
      <Route path="/Join" element={<Join />} />
      <Route path="/" element={<OnBoarding />} />
      <Route path="/ChatRoom" element={<ChatRoom />} />

      {/* 공통 레이아웃이 적용되는 페이지 */}
      <Route
        path="/Home"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />
      <Route
        path="/SearchResult"
        element={
          <MainLayout>
            <SearchResult />
          </MainLayout>
        }
      />
      <Route
        path="/ChatRooms"
        element={
          <MainLayout>
            <ChatRooms />
          </MainLayout>
        }
      />
      <Route
        path="/Orders"
        element={
          <MainLayout>
            <Orders />
          </MainLayout>
        }
      />
      <Route
        path="/MyPage"
        element={
          <MainLayout>
            <MyPage />
          </MainLayout>
        }
      />
      <Route
        path="/EditProfile"
        element={
          <MainLayout>
            <EditProfile />
          </MainLayout>
        }
      />
      <Route
        path="/ProductUpload"
        element={
          <MainLayout>
            <ProductUpload />
          </MainLayout>
        }
      />
    </Routes>
  );
}
