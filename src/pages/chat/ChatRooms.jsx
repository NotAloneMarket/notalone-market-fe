import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "../../api/axiosInstance";

export default function ChatRooms() {
  const navigate = useNavigate();
  const [chatRooms, setChatRooms] = useState([]);
  const [postMap, setPostMap] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) return;

    axios
      .get(`/chatrooms`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(async (res) => {
        const rooms = res.data;
        setChatRooms(rooms);

        const myPostIds = rooms.map((room) => Number(room.postId));
        const postResponses = await Promise.all(
          myPostIds.map((id) =>
            axios
              .get(`/posts/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
              })
              .then((res) => ({ id, data: res.data }))
              .catch(() => null)
          )
        );

        const postMapData = {};
        postResponses.forEach((item) => {
          if (item && item.data) postMapData[item.id] = item.data;
        });

        setPostMap(postMapData);
      })
      .catch((err) => {
        console.error("채팅방 또는 게시글 정보 불러오기 실패", err);
      });
  }, []);

  return (
    <Wrapper>
      <Header><Title>채팅방</Title></Header>
      <RoomList>
        {chatRooms.map((room) => {
          const post = postMap[room.postId];
          return (
            <RoomItem key={`${room.id}-${room.postId}`} onClick={() => navigate(`/ChatRoom/${room.id}`)}>
              <Profile src={post?.imageUrl || "/default.png"} />
              <RoomInfo>
                <RoomTop>
                  <RoomTitle>{post?.title || "제목 없음"}</RoomTitle>
                  <RoomStatus $status={room.isCompleted === 'Y' ? "완료" : "진행중"}>
                    {room.isCompleted === 'Y' ? "완료" : "진행중"}
                  </RoomStatus>
                </RoomTop>
                <RoomMessage>메시지를 입력해보세요</RoomMessage>
              </RoomInfo>
            </RoomItem>
          );
        })}
      </RoomList>
    </Wrapper>
  );
}

const Wrapper = styled.div` min-height: 100vh; background-color: white; `;
const Header = styled.div` display: flex; align-items: center; padding: 1rem; `;
const Title = styled.span` font-size: 1.3rem; font-weight: 500; margin: auto; `;
const RoomList = styled.div``;
const RoomItem = styled.div`
  display: flex; align-items: center; padding: 1rem; cursor: pointer; border-bottom: 1px solid #e5e7eb;
`;
const Profile = styled.img`
  width: 3rem; height: 3rem; border-radius: 9999px; background-color: #e5e7eb; margin-right: 1rem; object-fit: cover;
`;
const RoomInfo = styled.div` flex: 1; `;
const RoomTop = styled.div` display: flex; justify-content: space-between; align-items: center; `;
const RoomTitle = styled.span` font-weight: bold; font-size: 0.875rem; `;
const RoomStatus = styled.span`
  font-size: 0.75rem; padding: 0.25rem 0.5rem; border-radius: 0.25rem;
  background-color: ${(props) => props.$status === '진행중' ? '#3B82F6' : '#D1D5DB'};
  color: ${(props) => props.$status === '진행중' ? 'white' : 'black'};
`;
const RoomMessage = styled.div`
  font-size: 0.875rem; color: #6b7280; margin-top: 0.25rem;
`;
