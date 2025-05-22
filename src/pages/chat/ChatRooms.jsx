import React from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const chatRooms = [
  {
    id: 1,
    title: '제주 감귤 10kg',
    message: '두 분 더 들어오면 거래 시작할게요',
    status: '진행중',
  },
  {
    id: 2,
    title: '콜라 100캔',
    message: '이번주 금요일 어떠세요?',
    status: '진행중',
  },
  {
    id: 3,
    title: '제습제 20개입',
    message: '감사합니다~!',
    status: '완료',
  },
];

export default function ChatRooms() {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Header>
        <Title>채팅방</Title>
      </Header>

      <RoomList>
        {chatRooms.map((room) => (
          <RoomItem key={room.id} onClick={() => navigate('/ChatRoom')}>
            <Profile />
            <RoomInfo>
              <RoomTop>
                <RoomTitle>{room.title}</RoomTitle>
                <RoomStatus status={room.status}>{room.status}</RoomStatus>
              </RoomTop>
              <RoomMessage>{room.message}</RoomMessage>
            </RoomInfo>
          </RoomItem>
        ))}
      </RoomList>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: white;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  svg {
    margin-right: 0.5rem;
    color: #374151;
    cursor: pointer;
  }
`;

const Title = styled.span`
  font-size: 1.3rem;
  font-weight: 500;
  margin-left: 2.7rem;
  margin-top: -0.3rem;
`;

const RoomList = styled.div`
`;

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

const RoomInfo = styled.div`
  flex: 1;
`;

const RoomTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RoomTitle = styled.span`
  font-weight: bold;
  font-size: 0.875rem;
`;

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
