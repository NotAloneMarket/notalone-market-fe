import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";

export default function TopNav() {
  const navigate = useNavigate();

  return (
    <div className="w-[390px] h-[56px] fixed top-0 left-1/2 -translate-x-1/2 z-50 bg-white border-b flex items-center">
      <div className="ml-[27.5px] h-[24px] flex items-center">
        <FaChevronLeft
          size={24}
          className="text-gray-700 cursor-pointer"
          onClick={() => navigate(-1)}
        />
      </div>
    </div>
  );
}
