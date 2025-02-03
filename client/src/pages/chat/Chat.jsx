import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Container } from 'react-bootstrap';
import { checkAuthStatus } from '../../redux/UserSlice';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Contacts from './Contacts';
import Welcome from './welcome/Welcome';
import styles from './Chat.module.css';
import ChatContainer from './ChatContainer';
import { io } from 'socket.io-client';

function Chat() {
  const socket = useRef(); // Fixed typo: soket -> socket
  const dispatch = useDispatch();
  const { loggedIn, user, userId, userRole } = useSelector((state) => state.auth);
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const host = 'http://localhost:5000';

  // Check authentication status on mount
  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  // Redirect to login if not logged in
  useEffect(() => {
    if (!loggedIn || !user) {
      navigate('/login');
    }
  }, [loggedIn, user, navigate]);

  // Initialize socket connection
  useEffect(() => {
    if (user) {
      socket.current = io(host, { withCredentials: true });
      socket.current.emit('add-user', userId);

      // Cleanup socket connection on unmount
      return () => {
        if (socket.current) {
          socket.current.disconnect();
        }
      };
    }
  }, [userId, user]);

  // Fetch contacts based on user role
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const endpoint = userRole === 'mentor' ? '/api/auth/get-user' : '/api/auth/get-ventor';
        const response = await axios.get(endpoint);
        setContacts(response.data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
        setError('Failed to load contacts');
      } finally {
        setLoading(false);
      }
    };

    if (loggedIn && user) fetchContacts();
  }, [loggedIn, user, userRole]);

  // Handle chat change
  const handleChatChange = useCallback((chat) => {
    setCurrentChat(chat);
  }, []);

  return (
    <Container>
      <div className={styles.container}>
        <Contacts contacts={contacts} changeChat={handleChatChange} />
        {loading ? (
          <div>Loading contacts...</div>
        ) : error ? (
          <div>{error}</div>
        ) : currentChat === undefined ? (
          <Welcome contacts={contacts} />
        ) : (
          <ChatContainer currentChat={currentChat} socket={socket} />
        )}
      </div>
    </Container>
  );
}

export default Chat;