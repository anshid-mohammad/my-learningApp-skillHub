import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "./Teachers.module.css"; // Import CSS module

function Teachers() {
  return (
   <div className={styles.container}>
         {/* Left Section (Image) */}
         <div className={styles.teacherLeft}>
           <img className={styles.teacherImage} src="../../../images/teacher4.png" alt="learners" />
         </div>
   
         {/* Right Section (Text) */}
         <div className={styles.teacherRight}>
           <h1 className={styles.headerText}>
           "Passionate about creating <br /> impactful courses that inspire <br />
           and empower learners to <br /> achieve their goals."
           </h1>
           <p className={styles.subtextHeader}>STUDENTS AND LEARNERS</p>
           <div className={styles.ctaButtons}>
             <button className={styles.learnersBtn}>Teachers, Start Here</button>
           </div>
         </div>
       </div>
  );
}

export default Teachers;
