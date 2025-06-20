import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaArrowUp } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../api/axiosInstance"; // baseURL 설정된 axios
import styled, { css } from "styled-components";

export default function ChatRoom() {
  const navigate = useNavigate();
  const { chatId } = useParams(); // /ChatRoom/:chatId

  const [isOwner, setIsOwner] = useState(false);
  const [isDealEnded, setIsDealEnded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const userId = 1; // 로그인 사용자 (임시로 하드코딩)

  useEffect(() => {
    // 참여 정보 가져오기
    axios.get(`/api/chat/${chatId}/status?userId=${userId}`).then(res => {
      setIsOwner(res.data.isOwner);
      setIsDealEnded(res.data.isDealEnded);
    });

    // 메시지 불러오기
    axios.get(`/api/chat/${chatId}/messages`).then(res => {
      setMessages(res.data);
    });
  }, [chatId]);

  const handleSend = () => {
    if (!input.trim()) return;

    axios.post(`/api/chat/${chatId}/message`, {
      senderId: userId,
      content: input,
    }).then(() => {
      setMessages([...messages, { id: Date.now(), sender: "me", text: input }]);
      setInput("");
    });
  };

  const handleDealEnd = () => {
    axios.post(`/api/chat/${chatId}/complete?userId=${userId}`).then(() => {
      setIsDealEnded(true);
      setShowModal(false);
    });
  };

  return (
    <LayoutWrapper>
      <Wrapper>
        <Header>
          <HeaderLeft>
            <FaChevronLeft onClick={() => navigate("/ChatRooms")} />
            <div>
              <Title>채팅방 {chatId}</Title>
              <SubTitle>{isOwner ? "개설자" : "참여자"}</SubTitle>
            </div>
          </HeaderLeft>
          {isOwner && (
            <EndButton
              disabled={isDealEnded}
              ended={isDealEnded}
              onClick={() => !isDealEnded && setShowModal(true)}
            >
              {isDealEnded ? "거래 종료" : "거래 완료하기"}
            </EndButton>
          )}
        </Header>

        <MessagesArea>
          {messages.map((msg) => (
            <MessageContainer key={msg.id} isMe={msg.sender === "me"}>
              {msg.sender !== "me" && <Sender>{msg.sender}</Sender>}
              <MessageBubble isMe={msg.sender === "me"}>{msg.text}</MessageBubble>
            </MessageContainer>
          ))}
        </MessagesArea>

        {isDealEnded && <DealEndedText>거래가 종료된 채팅방입니다.</DealEndedText>}

        {!isDealEnded && (
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

        {showModal && (
          <ModalOverlay>
            <ModalContent>
              <ModalText>거래를 종료 하시겠습니까?</ModalText>
              <ModalActions>
                <ModalButton onClick={() => setShowModal(false)} gray>
                  아니요
                </ModalButton>
                <ModalButton onClick={handleDealEnd}>예</ModalButton>
              </ModalActions>
            </ModalContent>
          </ModalOverlay>
        )}
      </Wrapper>
    </LayoutWrapper>
  );
}

// ✅ styled-components (생략 없이 포함)
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
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  svg {
    color: #374151;
    margin-right: 8px;
    cursor: pointer;
  }
`;

const Title = styled.div` font-weight: bold; `;
const SubTitle = styled.div` font-size: 12px; color: #6b7280; `;

const EndButton = styled.button`
  font-size: 14px;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 8px;
  background-color: ${({ ended }) => (ended ? "#D1D5DB" : "#3B82F6")};
  color: ${({ ended }) => (ended ? "#6B7280" : "white")};
  border: none;
  cursor: ${({ ended }) => (ended ? "not-allowed" : "pointer")};
`;

const MessagesArea = styled.div`
  flex: 1;
  padding: 8px 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ isMe }) => (isMe ? "flex-end" : "flex-start")};
`;

const Sender = styled.div` font-size: 12px; color: #6b7280; margin-bottom: 4px; `;
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
  padding: 8px 0;
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
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  width: 288px;
  text-align: center;
`;

const ModalText = styled.p` margin-bottom: 16px; font-weight: 500; `;

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
