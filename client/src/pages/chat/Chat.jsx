import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { checkAuthStatus } from '../../redux/UserSlice';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Contacts from './Contacts';
import Welcome from './welcome/Welcome';
import styles from './Chat.module.css';
import ChatContainer from './ChatContainer';

function Chat() {
  const dispatch = useDispatch();
  const { loggedIn, user, userId } = useSelector((state) => state.auth);
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [loadingContacts, setLoadingContacts] = useState(true); // Renamed for clarity
  const [error, setError] = useState(null); // For error handling
  const navigate = useNavigate();

  // Check authentication status
  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  // Redirect to login page if not logged in
  useEffect(() => {
    if (!loggedIn || !user) {
      navigate('/login');
    }
  }, [loggedIn, user, navigate]);

  // Fetch contacts
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('/api/auth/get-student'); // API call
        setContacts(response.data);
        setLoadingContacts(false); // Mark loading as false after data is fetched
        console.log("contact id",response.data)

      } catch (error) {
        console.error('Error fetching contacts:', error);
        setError('Failed to load contacts'); // Set error message
        setLoadingContacts(false); // Stop loading if there is an error
      }
    };
    if (loggedIn && user) {
      fetchContacts();
    }
  }, [loggedIn, user]);

  // Handle chat selection
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <Container>
      <div className={styles.container}>
        <Contacts contacts={contacts} changeChat={handleChatChange} />
        {loadingContacts ? (
          <div>Loading contacts...</div> // Show loading message if still fetching contacts
        ) : error ? (
          <div>{error}</div> // Display error message if there was an error
        ) : currentChat === undefined ? (
          <Welcome contacts={contacts} />
        ) : (
          <ChatContainer currentChat={currentChat} contacts={contacts} />
        )}
      </div>
    </Container>
  );
}

export default Chat;
