import React, { useState } from "react";
import { FaChevronLeft, FaArrowUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ChatRoom() {
  const navigate = useNavigate();

  // 유저 타입과 거래 상태 (개설자 or 참여자, 거래중 or 종료됨)
  const [isOwner, setIsOwner] = useState(true); // 개설자일 경우 true
  const [isDealEnded, setIsDealEnded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: "무지한 무지", text: "안녕하세요" },
    { id: 2, sender: "이상한 나라의 단무지", text: "블라블라블라블라블라" },
    {
      id: 3,
      sender: isOwner ? "나" : "내가 바로 주최자",
      text: "두 분 더 들어오면 거래 시작할게요",
    },
    { id: 4, sender: "me", text: "안녕하세요" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: "me", text: input }]);
    setInput("");
  };

  const handleDealEnd = () => {
    setIsDealEnded(true);
    setShowModal(false);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* 헤더 */}
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <div className="flex items-center">
          <FaChevronLeft
            className="text-gray-700 mr-2"
            onClick={() => navigate("/ChatRooms")}
          />
          <div>
            <div className="font-bold">제주 감귤 10kg</div>
            <div className="text-xs text-gray-500">
              2명 / 3명 {isOwner ? "개설자" : "참여자"}
            </div>
          </div>
        </div>
        {isOwner && (
          <button
            onClick={() => !isDealEnded && setShowModal(true)}
            disabled={isDealEnded}
            className={`text-sm font-medium px-3 py-1 rounded ${
              isDealEnded
                ? "bg-gray-300 text-gray-500"
                : "bg-blue-500 text-white"
            }`}
          >
            {isDealEnded ? "거래 종료" : "거래 완료하기"}
          </button>
        )}
      </div>

      {/* 메시지 목록 */}
      <div className="flex-1 px-4 py-2 space-y-4 overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.sender === "me" ? "items-end" : "items-start"
            }`}
          >
            {msg.sender !== "me" && (
              <div className="text-xs text-gray-500 mb-1">{msg.sender}</div>
            )}
            <div
              className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm ${
                msg.sender === "me"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-100 text-black rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* 거래 종료 상태 */}
      {isDealEnded && (
        <div className="bg-gray-100 text-center text-sm text-gray-500 py-2 border-t">
          거래가 종료된 채팅방입니다.
        </div>
      )}

      {/* 입력창 */}
      {!isDealEnded && (
        <div className="flex items-center p-2 border-t">
          <input
            type="text"
            placeholder="메시지를 입력하세요"
            className="flex-1 px-4 py-2 text-sm border rounded-full bg-gray-100 focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            className="ml-2 p-2 bg-blue-500 rounded-full text-white"
            onClick={handleSend}
          >
            <FaArrowUp size={16} />
          </button>
        </div>
      )}

      {/* 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-72 text-center">
            <p className="mb-4 font-medium">거래를 종료 하시겠습니까?</p>
            <div className="flex justify-between">
              <button
                className="bg-gray-200 text-black px-4 py-2 rounded w-[45%]"
                onClick={() => setShowModal(false)}
              >
                아니요
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded w-[45%]"
                onClick={handleDealEnd}
              >
                예
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
