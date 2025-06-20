import React, { useState, useEffect } from "react";
import { FaUserCircle, FaPhone, FaPen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const handleSubmit = async () => {
  try {
    const formData = new FormData();
    formData.append("userId", 1); // 실제 로그인 사용자 ID
    formData.append("nickname", nickname);
    formData.append("phoneNum", phoneNum);
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    const token = localStorage.getItem("token");

    const res = await axios.put(
      "http://localhost:8080/user/profile",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("프로필이 수정되었습니다.");
    navigate("/mypage");
  } catch (err) {
    console.error(err);
    alert("수정 실패");
  }
};

export default function EditProfile() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("닉넴");
  const [phoneNum, setPhoneNum] = useState("01012345678");
  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:8080/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { nickname, phoneNum, profileImageUrl } = res.data;
        setNickname(nickname);
        setPhoneNum(phoneNum);
        if (profileImageUrl) {
          setPreviewUrl(`http://localhost:8080${profileImageUrl}`);
        }
      } catch (err) {
        console.error("유저 정보 불러오기 실패", err);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 390,
        margin: "0 auto",
        backgroundColor: "#fff",
        minHeight: "100vh",
        paddingBottom: 40,
      }}
    >
      {/* 상단바 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: 16,
          borderBottom: "1px solid #eee",
        }}
      >
        <span
          style={{ fontSize: 18, cursor: "pointer" }}
          onClick={() => navigate(-1)}
        >
          ←
        </span>
        <h2 style={{ marginLeft: 10, fontSize: 16, fontWeight: "bold" }}>
          내 정보 수정
        </h2>
      </div>

      {/* 프로필 */}
      <div style={{ textAlign: "center", marginTop: 32 }}>
        <div style={{ position: "relative", display: "inline-block" }}>
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              backgroundColor: "#ddd",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <label htmlFor="profileImageInput">
              <div
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  backgroundColor: "#ddd",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
              >
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="미리보기"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <FaUserCircle size={60} color="#999" />
                )}
              </div>
            </label>

            <input
              type="file"
              id="profileImageInput"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setProfileImage(file);
                  setPreviewUrl(URL.createObjectURL(file));
                }
              }}
            />
          </div>
        </div>
        <div style={{ marginTop: 12, fontWeight: "bold", fontSize: 16 }}>
          김동덕
        </div>
      </div>

      {/* 입력 필드 */}
      <div style={{ padding: 24 }}>
        <InputBlock
          icon={<FaPen />}
          label="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <InputBlock
          icon={<FaPhone />}
          label="전화번호"
          value={phoneNum}
          onChange={(e) => setPhoneNum(e.target.value)}
        />

        <button style={buttonStyle} onClick={handleSubmit}>
          수정 정보 저장하기
        </button>
      </div>
    </div>
  );
}

function InputBlock({ icon, label, value, onChange, type = "text" }) {
  return (
    <>
      <label
        style={{
          fontSize: 13,
          marginBottom: 6,
          display: "block",
          marginTop: 16,
        }}
      >
        {label}
      </label>
      <div style={inputWrapperStyle}>
        <span style={iconStyle}>{icon}</span>
        <input
          style={inputStyle}
          value={value}
          onChange={onChange}
          type={type}
        />
      </div>
    </>
  );
}

const inputWrapperStyle = {
  display: "flex",
  alignItems: "center",
  backgroundColor: "#fafafa",
  border: "1px solid #eee",
  borderRadius: "12px",
  padding: "10px 14px",
};

const iconStyle = {
  color: "#aaa",
  marginRight: 10,
};

const inputStyle = {
  flex: 1,
  border: "none",
  outline: "none",
  background: "transparent",
  fontSize: "14px",
};

const buttonStyle = {
  marginTop: 32,
  width: "100%",
  padding: 14,
  border: "1px solid #5a6ef5",
  color: "#5a6ef5",
  fontWeight: "bold",
  borderRadius: 12,
  backgroundColor: "#fff",
  fontSize: 15,
  cursor: "pointer",
};
