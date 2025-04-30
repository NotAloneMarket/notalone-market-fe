import "./App.css";
import { Routes, Route } from "react-router-dom";
import ChatRooms from "./pages/chat/ChatRooms";
import ChatRoom from "./pages/chat/ChatRoom";
import Orders from "./pages/orders/Orders";
import Home from "./pages/home/Home";
import SearchResult from "./pages/home/SearchResult";
import ProductUploadPage from "./pages/regist/ProductUpload";

function App() {
  return (
    <>
      <Routes>
        <Route path="/ChatRooms" element={<ChatRooms />} />
        <Route path="/ChatRoom" element={<ChatRoom />} />
        <Route path="/Orders" element={<Orders />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/SearchResult" element={<SearchResult />} />
        <Route path="/upload" element={<ProductUploadPage />} />
      </Routes>
    </>
  );
}

export default App;
