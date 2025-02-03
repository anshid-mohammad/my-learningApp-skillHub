import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthStatus } from '../../redux/UserSlice';
import { useNavigate } from 'react-router-dom';
import styles from './Contact.module.css';
import { Container } from 'react-bootstrap';

function Contacts({ contacts, changeChat }) {
  const dispatch = useDispatch();
  const { loggedIn, user,userId } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [currentSelected, setCurrentSelected] = useState(null);

  // Check authentication status on mount
  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  // Redirect to login if not logged in
  useEffect(() => {
    if (!loggedIn) {
      navigate('/login');
    }
  }, [loggedIn, navigate]);

  // Handle chat change
  const handleChatChange = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  if (!contacts) {
    return <div className={styles.loading}>Loading contacts...</div>;
  }

  if (contacts.length === 0) {
    return <div className={styles.noContacts}>No contacts available.</div>;
  }
  const filteredContacts = Array.isArray(contacts)
    ? contacts.filter(contact => contact?.teacherId === userId)
    : [];
  return (
    loggedIn &&
    user && (
      <Container className={styles.container}>
        <div className={styles.brand}>
          <img src="/images/logo.png" alt="Logo" className={styles.logo} />
          <h3>SkillHub</h3>
        </div>

        <div className={styles.contactsList}>
          {contacts.map((contact, index) => (
            <div
              key={contact.studentId || index}
              className={`${styles.contactCard} ${currentSelected === index ? styles.selected : ''}`}
              onClick={() => handleChatChange(index, contact)}
            >
              <div className={styles.avatar}>
                <img src="/default-avatar.png" alt={`${contact.name}'s Avatar`} className={styles.avatarImg} />
              </div>
              <div className={styles.userName}>
                <h3 className={styles.name}>{contact.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </Container>
    )
  );
}

export default Contacts;