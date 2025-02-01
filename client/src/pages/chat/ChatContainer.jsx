import React, { useEffect, useState } from 'react';
import styles from "./ChatContainer.module.css";
import { Container } from 'react-bootstrap';
import ChatINput from './ChatINput.jsx/ChatINput';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function ChatContainer({ currentChat }) {
  const [messages, setMessages] = useState([]);
  const { userId } = useSelector((state) => state.auth);

  // Fetch messages when the currentChat changes
  useEffect(() => {
    const fetchMessages = async () => {
      if (!currentChat) return; // Don't fetch if no chat is selected

      try {
        const response = await axios.post("/api/auth/get-message", {
          from: userId,
          to: currentChat._id,
        });

        // Sort messages by timestamp before setting them in state
        const sortedMessages = response.data.sort(
          (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
        );
        setMessages(sortedMessages);
      } catch (error) {
        console.error("Error fetching messages", error);
      }
    };

    fetchMessages();
  }, [currentChat, userId]); // Re-fetch when currentChat or userId changes

  // Handle sending a new message
  const handleSendMsg = async (msg) => {
    if (!msg.trim()) return; // Don't send empty messages

    try {
      const response = await axios.post("/api/auth/add-message", {
        from: userId,
        to: currentChat._id,
        message: msg,
        timestamp: new Date().toISOString(), // Add timestamp to the message
      });

      if (response.data && response.data.msg === "Message added successfully") {
        // Add the new message to the state with a timestamp
        const newMessage = {
          fromSelf: true,
          message: msg,
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, newMessage]);
      }
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  // Sort messages by timestamp before rendering
  const sortedMessages = messages.sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  );

  // If no chat is selected, show a placeholder
  if (!currentChat) {
    return <div>No chat selected</div>;
  }

  return (
    <Container>
      {/* Chat Header */}
      <div className={styles.chatheader}>
        <div className={styles.userDetails}>
          <div className={styles.avatar}>
            <img
              className={styles.imageAvatar}
              src={currentChat.photo || "/default-avatar.png"}
              alt={`${currentChat.name}'s Avatar`}
            />
          </div>
          <div className={styles.username}>
            <h3>{currentChat.name}</h3>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className={styles.chatMessages}>
        {sortedMessages.length > 0 ? (
          sortedMessages.map((message, index) => (
            <div
              key={message._id || `msg-${index}`} // Use unique key
              className={`${styles.message} ${
                message.fromSelf ? styles.sended : styles.received
              }`}
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

      {/* Chat Input */}
      <ChatINput handleSendMsg={handleSendMsg} />
    </Container>
  );
}