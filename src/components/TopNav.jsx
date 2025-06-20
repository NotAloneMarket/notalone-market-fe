import { useLocation, useNavigate } from "react-router-dom";
import { FaChevronLeft, FaSearch } from "react-icons/fa";
import styled from "styled-components";
import { useState } from "react";

export default function TopNav({ searchOpen, setSearchOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      navigate(`/SearchResult?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };
  return (
    <>
      <Wrapper>
        <BackIconWrapper>
          <FaChevronLeft
            size={24}
            className="icon"
            onClick={() => navigate(-1)}
          />
        </BackIconWrapper>

        {location.pathname.toLowerCase() === "/home" && (
          <SearchIconWrapper>
            <FaSearch
              size={20}
              className="icon"
              onClick={() => setSearchOpen(!searchOpen)}
            />
          </SearchIconWrapper>
        )}
      </Wrapper>

      {/* 검색창 */}
      {searchOpen && location.pathname.toLowerCase() === "/home" && (
        <SearchBox>
          <SearchInput
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearchSubmit}
          />
        </SearchBox>
      )}
    </>
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

const SearchIconWrapper = styled.div`
  .icon {
    color: #4b5563;
    cursor: pointer;
  }
`;

const SearchBox = styled.div`
  width: 100%;
  max-width: 390px;
  margin: 56px auto 0 auto;
  padding: 1rem;
  background-color: white;
  position: fixed;
  top: 56px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 49;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  background-color: #f3f4f6;
  border: 1px solid #d1d5db;
  font-size: 0.875rem;
`;
