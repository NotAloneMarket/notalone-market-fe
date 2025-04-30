import React from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const chatRooms = [
  {
    id: 1,
    title: '제주 감귤 10kg',
    message: '두 분 더 들어오면 거래 시작할게요',
    status: '진행중',
  },
  {
    id: 2,
    title: '콜라 100캔',
    message: '이번주 금요일 어떠세요?',
    status: '진행중',
  },
  {
    id: 3,
    title: '제습제 20개입',
    message: '감사합니다~!',
    status: '완료',
  },
];

export default function ChatRooms() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <div className="flex items-center p-4 border-b">
        <FaChevronLeft className="mr-2 text-gray-700"  onClick={() => navigate('/')}/>
        <span className="text-lg font-medium">채팅방</span>
      </div>

      {/* 채팅방 리스트 */}
      <div className="divide-y">
        {chatRooms.map((room) => (
          <div key={room.id} className="flex items-center p-4" onClick={() => navigate('/ChatRoom')} >
            {/* 프로필 이미지 */}
            <div className="w-12 h-12 rounded-full bg-gray-200 mr-4" />

            {/* 채팅 정보 */}
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm">{room.title}</span>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    room.status === '진행중'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-300 text-black'
                  }`}
                >
                  {room.status}
                </span>
              </div>
              <div className="text-sm text-gray-500 mt-1">{room.message}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 하단 탭바 */}
      <div className="fixed bottom-0 left-0 right-0 border-t bg-white flex justify-around items-center h-16">
        <div className="flex flex-col items-center text-black">
          <svg className="w-6 h-6 mb-1 fill-current" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
          <span className="text-xs">Home</span>
        </div>
        <div className="flex flex-col items-center text-gray-400">
          <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
          <span className="text-xs">Chat</span>
        </div>
        <div className="flex flex-col items-center text-gray-400">
          <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
          <span className="text-xs">Orders</span>
        </div>
        <div className="flex flex-col items-center text-gray-400">
          <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5.121 17.804A9.004 9.004 0 0112 15a9.004 9.004 0 016.879 2.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          <span className="text-xs">Mypage</span>
        </div>
      </div>
    </div>
  );
}
