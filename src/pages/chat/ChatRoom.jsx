import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaChevronLeft, FaArrowUp } from "react-icons/fa";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import axios from "../../api/axiosInstance"; // axiosInstance로 변경
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

  useEffect(() => {
    // 메시지 목록
    axios.get(`/chatrooms/${chatId}/messages`).then((res) => {
      const fetchedMessages = res.data.map((msg) => ({
        senderId: msg.senderId,
        sender: msg.sender,
        text: msg.message,
      }));
      setMessages(fetchedMessages);
    });

    // 게시글 정보
    axios.get(`/posts/from-chatroom/${chatId}`).then((res) => {
      const post = res.data;
      setPostTitle(post.title);
      setParticipantLimit(post.participantLimit);
      setIsOwner(post.writerId === userId);
    });

    // 거래 완료 여부
    axios.get(`/chatrooms/${chatId}`).then((res) => {
      setIsDealEnded(res.data.isCompleted === "Y");
    });

    // 현재 참여 인원
    axios.get(`/chatrooms/${chatId}/count`).then((res) => {
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
  }, [chatId, userId]);

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
      // 1. postId 얻기
      const postRes = await axios.get(`/posts/from-chatroom/${chatId}`);
      const postId = postRes.data.id;

      // 2. 게시글 상태 완료 처리
      await axios.post(`/posts/${postId}/complete`);

      // 3. 채팅방 거래 종료
      await axios.put(`/chatrooms/${chatId}/complete`, {});

      // 4. 구매 내역 생성
      const historyRes = await axios.post(`/buyHistory/create`);
      console.log("✅ 구매 내역 생성 응답:", historyRes.data);

      // 5. UI 업데이트
      setIsDealEnded(true);
      setShowModal(false);
      alert("거래가 완료되었습니다.");
    } catch (err) {
      alert("거래 완료 처리 중 오류가 발생했습니다.");
      console.error("거래 완료 실패", err);
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
              {participantCount}명 / {participantLimit}명 |{" "}
              {isOwner ? "개설자" : "참여자"}
            </SubTitle>
          </HeaderInfo>

          {!isDealEnded ? (
            <EndButton
              onClick={isOwner ? () => setShowModal(true) : undefined}
              title={isOwner ? "" : "개설자만 거래를 종료할 수 있습니다"}
            >
              거래 완료하기
            </EndButton>
          ) : (
            <EndDoneButton disabled>거래 종료</EndDoneButton>
          )}
        </Header>

        <MessagesArea>
          {messages.map((msg, i) => (
            <MessageContainer key={i} isMe={msg.senderId === userId}>
              {msg.senderId !== userId && <Sender>{msg.sender}</Sender>}
              <MessageBubble isMe={msg.senderId === userId}>
                {msg.text}
              </MessageBubble>
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
              <ModalButton $cancel onClick={() => setShowModal(false)}>
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
