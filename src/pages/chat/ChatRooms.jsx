import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "../../api/axiosInstance";

export default function ChatRooms() {
  const navigate = useNavigate();
  const [chatRooms, setChatRooms] = useState([]);
  const userId = 1;

  useEffect(() => {
    axios.get(`/chatrooms?userId=${userId}`).then(res => {
      setChatRooms(res.data); // [{ id, title, status, lastMessage }]
    });
  }, []);

  return (
    <Wrapper>
      <Header><Title>채팅방</Title></Header>

      <RoomList>
        {chatRooms.map((room) => (
          <RoomItem key={room.id} onClick={() => navigate(`/ChatRoom/${room.id}`)}>
            <Profile />
            <RoomInfo>
              <RoomTop>
                <RoomTitle>{room.title}</RoomTitle>
                <RoomStatus status={room.status}>{room.status}</RoomStatus>
              </RoomTop>
              <RoomMessage>{room.lastMessage}</RoomMessage>
            </RoomInfo>
          </RoomItem>
        ))}
      </RoomList>
    </Wrapper>
  );
}

const Wrapper = styled.div` min-height: 100vh; background-color: white; `;
const Header = styled.div` display: flex; align-items: center; padding: 1rem; `;
const Title = styled.span` font-size: 1.3rem; font-weight: 500; margin: auto; `;
const RoomList = styled.div``;

const RoomItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  border-bottom: 1px solid #e5e7eb;
`;

const Profile = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
  background-color: #e5e7eb;
  margin-right: 1rem;
`;

const RoomInfo = styled.div` flex: 1; `;
const RoomTop = styled.div` display: flex; justify-content: space-between; align-items: center; `;
const RoomTitle = styled.span` font-weight: bold; font-size: 0.875rem; `;

const RoomStatus = styled.span`
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  background-color: ${(props) =>
    props.status === '진행중' ? '#3B82F6' : '#D1D5DB'};
  color: ${(props) =>
    props.status === '진행중' ? 'white' : 'black'};
`;

const RoomMessage = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.25rem;
`;
