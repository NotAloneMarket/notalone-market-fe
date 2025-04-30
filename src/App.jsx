import "./App.css";
import { Routes, Route } from "react-router-dom";
import ChatRooms from "./pages/ChatRooms";
import ChatRoom from "./pages/ChatRoom";

function App() {
  return (
    <>
      <div className="text-center text-lg font-bold p-4">박창섭의 애제자들 화이팅~!</div>
      <Routes>
        <Route path="/ChatRooms" element={<ChatRooms />} />
        <Route path="/ChatRoom" element={<ChatRoom />} />
      </Routes>
    </>
  );
}

export default App;
