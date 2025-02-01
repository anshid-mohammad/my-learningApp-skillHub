import React, { useEffect, useState } from "react";
import { checkAuthStatus } from "../../redux/UserSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./Contact.module.css";
import { Container } from "react-bootstrap";

function Contacts({ contacts, changeChat }) {
  const dispatch = useDispatch();
  const { loggedIn, user, userId } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [currentSelected, setCurrentSelected] = useState(null);

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    }
  }, [loggedIn, navigate]);

  const filteredContacts = contacts?.filter(contact => contact.teacherId === userId) || [];

  if (!contacts) {
    return <div className={styles.loading}>Loading contacts...</div>;
  }

  if (filteredContacts.length === 0) {
    return <div className={styles.noContacts}>No contacts available.</div>;
  }

  const handleChatChange = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    loggedIn && user && (
      <Container className={styles.container}>
        <div className={styles.brand}>
          <img src="/images/logo.png" alt="SkillHub Logo" className={styles.logo} />
          <h3>SkillHub</h3>
        </div>

        <div className={styles.contactsList}>
          {filteredContacts.map((contact, index) => (
            <div
              key={contact.studentId || index} // Changed to studentId
              className={`${styles.contactCard} ${currentSelected === index ? styles.selected : ""}`}
              onClick={() => handleChatChange(index, contact)}
            >
              <div className={styles.avatar}>
                <img src={contact.photo || "/default-avatar.png"} alt={`${contact.name}'s Avatar`} className={styles.avatarImg} />
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
