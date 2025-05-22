import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";

export default function TopNav({ title = "Title", backPath = -1 }) {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-md mx-auto h-14 flex items-center px-4 border-b border-gray-200 bg-white fixed top-0 left-0 right-0 z-50">
      <button
        onClick={() => (backPath === -1 ? navigate(-1) : navigate(backPath))}
        className="text-gray-700 text-lg"
      >
        <FaChevronLeft />
      </button>
      <h1 className="flex-1 text-center text-lg font-bold text-blue-600">
        {title}
      </h1>
      {/* 오른쪽 빈 공간 확보용 (뒤로가기 버튼과 좌우 정렬 맞추기 위해) */}
      <div className="w-5" />
    </div>
  );
}
