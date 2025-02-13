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
import { IoArrowBack } from 'react-icons/io5'; // Import back icon

function Chat() {
  const socket = useRef();
  const dispatch = useDispatch();
  const { loggedIn, user, userId, userRole } = useSelector((state) => state.auth);
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const host = 'http://localhost:5000';

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  useEffect(() => {
    if (!loggedIn || !user) {
      navigate('/login');
    }
  }, [loggedIn, user, navigate]);

  useEffect(() => {
    if (user) {
      socket.current = io(host, { withCredentials: true });
      socket.current.emit('add-user', userId);
      return () => socket.current && socket.current.disconnect();
    }
  }, [userId, user]);

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

  const handleChatChange = useCallback((chat) => {
    setCurrentChat(chat);
  }, []);
const handleback=()=>{
  if(userRole==="mentor"){
    navigate("/teachers")
  }else{
    navigate("/learners")
  }
}
  return (
    <Container>
      <div className={styles.header}>
        {/* Back Button */}
        <button className={styles.backButton} onClick={handleback}>
          <IoArrowBack /> Back
        </button>
      </div>

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
