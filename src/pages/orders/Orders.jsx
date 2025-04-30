import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import sampleImg from "../../assets/sample.png";

export default function OrdersPage() {
  const navigate = useNavigate();

  // 추후 axios로 대체 예정
  const orders = Array(5).fill({
    date: "04.10 거래 완료",
    title: "단백질 쉐이크 18개입",
    quantity: 3,
    price: "3,999 원",
    image: "sampleImg",
  });

  return (
    <div className="bg-white min-h-screen max-w-sm mx-auto flex flex-col pb-16">
      {/* 상단 헤더 */}
      <div className="flex items-center px-4 py-3 border-b">
        <FaChevronLeft
          className="text-gray-700 mr-3"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-lg font-bold text-blue-600">Orders</h1>
      </div>

      {/* 주문 목록 */}
      <div className="p-4 space-y-4">
        {orders.map((order, idx) => (
          <div key={idx} className="flex border-b pb-3">
            <img
              src={order.image}
              alt="product"
              className="w-16 h-16 object-cover rounded mr-4"
            />
            <div className="flex-1">
              <div className="text-xs text-gray-400 mb-1">{order.date}</div>
              <div className="font-semibold text-sm mb-1">{order.title}</div>
              <div className="text-sm text-gray-600">{order.quantity}개</div>
            </div>
            <div className="text-right font-semibold text-base">
              {order.price}
            </div>
          </div>
        ))}
      </div>

      {/* 하단 고정 내비게이션 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t flex justify-around py-2 z-10">
        <div className="text-center text-gray-400">Home</div>
        <div className="text-center text-gray-400">Chat</div>
        <div className="text-center text-blue-500">Orders</div>
        <div className="text-center text-gray-400">Mypage</div>
      </div>
    </div>
  );
}
