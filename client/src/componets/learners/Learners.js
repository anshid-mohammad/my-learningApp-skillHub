import React from 'react';
import styles from './Learners.module.css';
import { useNavigate } from 'react-router-dom';

function Learners() {
  const navigate = useNavigate(); // Hook for navigation

  const handleSignup = () => {
    navigate('/signup'); // Navigate to the signup route
  };
  return (
    <div className={styles.container}>
      {/* Left Section (Image) */}
      <div className={styles.teacherLeft}>
        <img className={styles.teacherImage} src="../../../images/learners.png" alt="learners" />
      </div>

      {/* Right Section (Text) */}
      <div className={styles.teacherRight}>
        <h1 className={styles.headerText}>
          Curious learner exploring technology, communication,<br />
          and leadership to grow both personally and professionally.
        </h1>
        <p className={styles.subtextHeader}>STUDENTS AND LEARNERS</p>
        <div className={styles.ctaButtons}>
          <button  className={styles.learnersBtn} onClick={handleSignup}>Teachers, Start Here</button>
        </div>
      </div>
    </div>
  );
}

export default Learners;
