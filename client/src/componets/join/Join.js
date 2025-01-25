import React from 'react';
import styles from "./join.module.css";

function Join() {
  return (
    <div className={styles.container}>
      <h1 className={styles.headerText}>Join Skill Hub Today</h1>
      <div className={styles.buttons}>
        <button className={styles.btn}>Learners</button>
        <button className={styles.btn}>Teachers</button>
        <button className={styles.btn}>Contact Us</button>
      </div>
    </div>
  );
}

export default Join;
