import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaChevronLeft, FaArrowUp } from "react-icons/fa";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import axios from "../../api/axiosInstance";
import styled, { css } from "styled-components";

export default function ChatRoom() {
  const { id: chatId } = useParams();
  const navigate = useNavigate();
  const [isOwner, setIsOwner] = useState(false);
  const [isDealEnded, setIsDealEnded] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [participantCount, setParticipantCount] = useState(0);
  const [participantLimit, setParticipantLimit] = useState(0);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [stompClient, setStompClient] = useState(null);

  const userId = Number(localStorage.getItem("userId"));
  const token = localStorage.getItem("token");

  // 초기 데이터 조회
useEffect(() => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // 메시지
  axios.get(`/chatrooms/${chatId}/messages`, config).then((res) => {
    const fetchedMessages = res.data.map((msg) => ({
      senderId: msg.senderId,
      sender: msg.sender,
      text: msg.message,
    }));
    setMessages(fetchedMessages);
  });

  // 게시글 정보
  axios.get(`/posts/from-chatroom/${chatId}`, config).then((res) => {
    const post = res.data[0];
    console.log("게시글 정보", post);
    setPostTitle(post.title);
    setParticipantLimit(post.participantLimit);
    setIsOwner(post.writerId === userId);
  });

  // 참여자 수
  axios.get(`/chatrooms/${chatId}/count`, config).then((res) => {
    setParticipantCount(res.data.participantCount);
  });

  // WebSocket 연결
  const socket = new SockJS("http://localhost:8080/ws");
  const client = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,
    onConnect: () => {
      client.subscribe(`/topic/chat/${chatId}`, (message) => {
        const newMessage = JSON.parse(message.body);
        setMessages((prev) => [
          ...prev,
          {
            senderId: newMessage.senderId,
            sender: newMessage.sender,
            text: newMessage.content,
          },
        ]);
      });
    },
  });

  client.activate();
  setStompClient(client);

  return () => client.deactivate();
}, [chatId, token, userId]);
s

  const handleSend = () => {
    if (!input.trim() || !stompClient) return;

    const dto = {
      chatId: Number(chatId),
      senderId: userId,
      content: input,
      messageType: "TALK",
    };

    stompClient.publish({
      destination: "/app/chat/send",
      body: JSON.stringify(dto),
    });

    setInput("");
  };

  const handleDealComplete = async () => {
    try {
      await axios.post(
        `/chatrooms/${chatId}/complete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsDealEnded(true);
      setShowModal(false);
    } catch (err) {
      alert("거래 종료 실패");
    }
  };

  return (
    <LayoutWrapper>
      <Wrapper>
        <Header>
          <FaChevronLeft onClick={() => navigate("/ChatRooms")} />
          <HeaderInfo>
            <Title>{postTitle}</Title>
            <SubTitle>
              {participantCount}명 / {participantLimit}명 | {isOwner ? "개설자" : "참여자"}
            </SubTitle>
          </HeaderInfo>
          {isOwner && !isDealEnded && (
            <EndButton onClick={() => setShowModal(true)}>거래 완료하기</EndButton>
          )}
          {isOwner && isDealEnded && <EndDoneButton disabled>거래 종료</EndDoneButton>}
        </Header>

        <MessagesArea>
          {messages.map((msg, i) => (
            <MessageContainer key={i} isMe={msg.senderId === userId}>
              {msg.senderId !== userId && <Sender>{msg.sender}</Sender>}
              <MessageBubble isMe={msg.senderId === userId}>{msg.text}</MessageBubble>
            </MessageContainer>
          ))}
        </MessagesArea>

        {isDealEnded ? (
          <DealEndedText>거래가 종료된 채팅방입니다.</DealEndedText>
        ) : (
          <InputBox>
            <ChatInput
              type="text"
              placeholder="메시지를 입력하세요"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <SendButton onClick={handleSend}>
              <FaArrowUp size={16} />
            </SendButton>
          </InputBox>
        )}
      </Wrapper>

      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalText>거래를 종료하시겠습니까?</ModalText>
            <ModalActions>
              <ModalButton gray onClick={() => setShowModal(false)}>
                아니요
              </ModalButton>
              <ModalButton onClick={handleDealComplete}>예</ModalButton>
            </ModalActions>
          </ModalContent>
        </ModalOverlay>
      )}
    </LayoutWrapper>
  );
}

//✅ styled-components
const LayoutWrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #f3f4f6;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 390px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
`;

const HeaderInfo = styled.div`
  flex: 1;
  margin: 0 8px;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const SubTitle = styled.div`
  font-size: 12px;
  color: #6b7280;
`;

const EndButton = styled.button`
  font-size: 12px;
  padding: 6px 12px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

const EndDoneButton = styled(EndButton)`
  background-color: #d1d5db;
  color: #6b7280;
  cursor: default;
`;

const MessagesArea = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ isMe }) => (isMe ? "flex-end" : "flex-start")};
`;

const Sender = styled.div`
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 4px;
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 20px;
  ${({ isMe }) =>
    isMe
      ? css`
          background-color: #3b82f6;
          color: white;
          border-bottom-right-radius: 0;
        `
      : css`
          background-color: #f3f4f6;
          color: black;
          border-bottom-left-radius: 0;
        `}
`;

const DealEndedText = styled.div`
  text-align: center;
  font-size: 14px;
  color: #6b7280;
  background-color: #f3f4f6;
  padding: 12px 0;
  border-top: 1px solid #e5e7eb;
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  border-top: 1px solid #e5e7eb;
`;

const ChatInput = styled.input`
  flex: 1;
  font-size: 14px;
  padding: 8px 16px;
  border-radius: 9999px;
  border: 1px solid transparent;
  background-color: #f3f4f6;
  outline: none;
`;

const SendButton = styled.button`
  margin-left: 8px;
  padding: 8px;
  border-radius: 9999px;
  background-color: #3b82f6;
  color: white;
  border: none;
  cursor: pointer;
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  width: 280px;
  text-align: center;
`;

const ModalText = styled.p`
  margin-bottom: 16px;
  font-weight: 500;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ModalButton = styled.button`
  width: 45%;
  padding: 8px 0;
  border-radius: 8px;
  border: none;
  font-weight: 500;
  ${({ gray }) =>
    gray
      ? css`
          background-color: #e5e7eb;
          color: black;
        `
      : css`
          background-color: #3b82f6;
          color: white;
        `}
`;
