import { useLocation, useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import styled from "styled-components";

export default function TopNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Wrapper>
      <BackIconWrapper>
        <FaChevronLeft
          size={24}
          className="icon"
          onClick={() => navigate(-1)}
        />
      </BackIconWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 390px;
  height: 56px;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 50;
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
`;

const BackIconWrapper = styled.div`
  .icon {
    color: #4b5563;
    cursor: pointer;
  }
`;
