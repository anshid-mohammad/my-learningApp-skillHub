import React, { useState, useEffect } from 'react';
import styles from "./TeachersHome.module.css";
import { useNavigate } from 'react-router-dom';


function TeachersHome() {
  const   Navigate=useNavigate()
  const [activeSection, setActiveSection] = useState("home"); // State to track active section

  const handleCourseButton=(e)=>{
Navigate("/teachers-form")
  }

  // Content for the sections
  const sectionContent = {
    courses: (
      <div className={styles.courseCard}>
      <h2>Add your courses</h2>
      <p>
        "Education is the key to success in life, and teachers make a <br /> lasting
        impact in the lives of their students."
      </p>
      <button onClick={handleCourseButton} className={styles.addCourseButton}>Add Course</button>
      <div className={styles.cardImage}>
        <img src="../../../images/addcourse.png" alt="Add Course Illustration" />
      </div>
    </div>
    ),
    approvedCourses: (
      <div>
        <h2>Approved Courses</h2>
        <p>Here are your approved courses...</p>
        {/* Add your approved courses data here */}
      </div>
    ),
    approvedCourses: (
      <div>
        <h2>Approved Courses</h2>
        <p>Here are your approved courses...</p>
        {/* Add your approved courses data here */}
      </div>
    ),
    myAccount: (
      <div>
        <h2>My Account</h2>
        <p>Account details and settings...</p>
      </div>
    ),
    students: (
      <div>
        <h2>Students</h2>
        <p>Manage students here...</p>
      </div>
    ),
    myProfile: (
      <div>
        <h2>My Profile</h2>
        <p>View and edit your profile here...</p>
      </div>
    ),
    studentVerification: (
      <div>
        <h2>Student Verification</h2>
        <p>Verify students here...</p>
      </div>
    ),
    chat: (
      <div>
        <h2>Chat</h2>
        <p>Chat with students or teachers...</p>
      </div>
    ),
    home: (
      <div className={styles.courseCard}>
        <h2>Add your courses</h2>
        <p>
          "Education is the key to success in life, and teachers make a <br /> lasting
          impact in the lives of their students."
        </p>
        <button onClick={handleCourseButton} className={styles.addCourseButton}>Add Course</button>
        <div className={styles.cardImage}>
          <img src="../../../images/addcourse.png" alt="Add Course Illustration" />
        </div>
      </div>
    ),
  };

  return (
    <div className={styles.learnerHomePage}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <h3 className={styles.logo}>Skill Hub</h3>
        <ul className={styles.navLinks}>
          <li><button onClick={() => setActiveSection("courses")}>Courses</button></li>
          <li><button onClick={() => setActiveSection("approvedCourses")}>Approved Courses</button></li>
          <li className={styles.disabled}><button onClick={() => setActiveSection("myAccount")} disabled>My Account</button></li>
          <li><button onClick={() => setActiveSection("students")}>Students</button></li>
          <li><button onClick={() => setActiveSection("myProfile")}>My Profile</button></li>
          <li><button onClick={() => setActiveSection("studentVerification")}>Student Verification</button></li>
          <li><button onClick={() => setActiveSection("chat")}>Chat</button></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className={styles.content}>
        {sectionContent[activeSection]}
      </div>
    </div>
  );
}

export default TeachersHome;
