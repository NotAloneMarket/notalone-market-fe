// src/components/BottomNav.jsx
import React from "react";
import { FaHome, FaCommentDots, FaClipboardList, FaUser } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

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
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: 56,
        backgroundColor: "#fff",
        borderTop: "1px solid #eee",
        zIndex: 100,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 390,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <div
              key={item.label}
              onClick={() => navigate(item.path)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: isActive ? "#5a6ef5" : "#999",
                fontSize: 11,
                cursor: "pointer",
                fontWeight: isActive ? "bold" : "normal",
              }}
            >
              {item.icon}
              <span style={{ marginTop: 4 }}>{item.label}</span>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
