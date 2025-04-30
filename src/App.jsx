import "./App.css";
import { Routes, Route } from "react-router-dom";
import ChatRooms from "./pages/chat/ChatRooms";
import ChatRoom from "./pages/chat/ChatRoom";
import Orders from "./pages/orders/Orders";
import Home from "./pages/home/Home";
import SearchResult from "./pages/home/SearchResult";
import OnBoarding from "./pages/onboarding/OnBoarding";
import Login from "./pages/onboarding/Login";
import Join from "./pages/onboarding/Join";
import MyPage from "./pages/mypage/MyPage";
import EditProfile from "./pages/mypage/EditProfile";
import ChangePassword from "./pages/mypage/ChangePassword";

function App() {
  return (
    <>
      <Routes>
        <Route path="/ChatRooms" element={<ChatRooms />} />
        <Route path="/ChatRoom" element={<ChatRoom />} />
        <Route path="/Orders" element={<Orders />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/SearchResult" element={<SearchResult />} />
        <Route path="/OnBoarding" element={<OnBoarding />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Join" element={<Join />} />
        <Route path="/MyPage" element={<MyPage />} />
        <Route path="/EditProfile" element={<EditProfile />} />
        <Route path="/ChangePassword" element={<ChangePassword />} />

      </Routes>
    </>
  );
}

export default App;
