import "./App.css";
import { Routes, Route } from "react-router-dom";
import ChatRooms from "./pages/chat/ChatRooms";
import ChatRoom from "./pages/chat/ChatRoom";
import Orders from "./pages/orders/Orders";
import Home from "./pages/home/Home";
import SearchResult from "./pages/home/SearchResult";

function App() {
  return (
    <>
      <Routes>
        <Route path="/ChatRooms" element={<ChatRooms />} />
        <Route path="/ChatRoom" element={<ChatRoom />} />
        <Route path="/Orders" element={<Orders />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/SearchResult" element={<SearchResult />} />
      </Routes>
    </>
  );
}

export default App;
