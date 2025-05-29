// src/components/BottomNav.jsx
import React from "react";
import { FaHome, FaCommentDots, FaClipboardList, FaUser } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Home", icon: <FaHome />, path: "/Home" },
    { label: "Chat", icon: <FaCommentDots />, path: "/ChatRooms" },
    { label: "Orders", icon: <FaClipboardList />, path: "/Orders" },
    { label: "Mypage", icon: <FaUser />, path: "/MyPage" },
  ];

  return (
    <NavWrapper>
      <NavInner>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavItem
              key={item.label}
              $active={isActive}
              onClick={() => navigate(item.path)}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavItem>
          );
        })}
      </NavInner>
    </NavWrapper>
  );
}

const NavWrapper = styled.nav`
  position: fixed;
  width: 390px;
  max-width: 390px;
  margin: 0 auto;
  bottom: 0;
  left: 0;
  right: 0;
  height: 56px;
  background-color: #fff;
  border-top: 1px solid #eee;
  z-index: 100;
  display: flex;
  justify-content: center;
`;

const NavInner = styled.div`
  width: 100%;
  max-width: 390px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 11px;
  cursor: pointer;
  font-weight: ${({ $active }) => ($active ? "bold" : "normal")};
  color: ${({ $active }) => ($active ? "#5a6ef5" : "#999")};

  span {
    margin-top: 4px;
  }
`;
