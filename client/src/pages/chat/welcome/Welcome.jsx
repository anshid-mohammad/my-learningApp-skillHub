import React from 'react';
import styles from "./Welcome.module.css";
import { FaRobot } from 'react-icons/fa';

export default function Welcome({ currentChat }) {
  if (!currentChat) {
    return null; // Ensure currentChat exists before rendering
  }

  return (
    <div className={styles.container}>
      <FaRobot className={styles.imgrobot} /> {/* Correct usage of FaRobot */}
      <h1 className={styles.welcomeHeader}>
        Welcome, <span>{currentChat.name}</span>
      </h1>
      <h3 className={styles.welcomesub}>Please select a chat to start messaging</h3>
    </div>
  );
}
