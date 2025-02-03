import React, { useEffect, useState, useRef } from 'react';
import styles from './ChatContainer.module.css';
import { Container } from 'react-bootstrap';
import ChatINput from './ChatINput.jsx/ChatINput';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const { userId } = useSelector((state) => state.auth);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  // Fetch messages for the current chat
  useEffect(() => {
    const fetchMessages = async () => {
      if (currentChat) {
        try {
          const { data } = await axios.post('/api/auth/get-message', {
            from: userId,
            to: currentChat._id,
          });
          setMessages(data);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      }
    };

    fetchMessages();
  }, [currentChat, userId]);

  // Handle sending a message
  const handleSendMsg = async (msg) => {
    if (!msg.trim()) return;

    const newMessage = {
      fromSelf: true,
      message: msg,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);

    try {
      const { data } = await axios.post('/api/auth/add-message', {
        from: userId,
        to: currentChat._id,
        message: msg,
        timestamp: new Date().toISOString(),
      });

      if (data.msg === 'Message added successfully') {
        socket.current.emit('send-msg', {
          to: currentChat._id,
          from: userId,
          message: msg,
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Listen for incoming messages
  useEffect(() => {
    if (!socket.current) return;

    const handleMessageReceive = (msg) => {
      setArrivalMessage({ fromSelf: false, message: msg });
    };

    socket.current.on('msg-receive', handleMessageReceive);

    return () => {
      socket.current.off('msg-receive', handleMessageReceive);
    };
  }, [socket]);

  // Add arrival message to the messages list
  useEffect(() => {
    if (arrivalMessage) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage]);

  // Scroll to the latest message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Container>
      <div className={styles.chatheader}>
        <div className={styles.userDetails}>
          <div className={styles.avatar}>
            <img
              className={styles.imageAvatar}
              src={currentChat.photo || '/default-avatar.png'}
              alt={`${currentChat.name}'s Avatar`}
            />
          </div>
          <div className={styles.username}>
            <h3>{currentChat.name}</h3>
          </div>
        </div>
      </div>
      <div className={styles.chatMessages}>
        {messages.length > 0 ? (
          messages.map((message) => (
            <div
              ref={scrollRef}
              key={uuidv4()}
              className={`${styles.message} ${message.fromSelf ? styles.sended : styles.received}`}
            >
              <div className={styles.content}>
                <p>{message.message}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No messages to display.</p>
        )}
      </div>
      <ChatINput handleSendMsg={handleSendMsg} />
    </Container>
  );
}