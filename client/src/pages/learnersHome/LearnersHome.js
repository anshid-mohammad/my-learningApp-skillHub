import React, { useState, useEffect } from 'react';
import styles from "./LearnersHome.module.css";
import {  useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import {loginSuccess} from "../../redux/UserSlice"




function LearnersHome() {
  const [activeSection, setActiveSection] = useState('home');
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const username = urlParams.get('username');
    const userRole = urlParams.get('userRole');
    const userId = urlParams.get('userid');


    if (token && username && userRole&&userId) {
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      localStorage.setItem('userRole', userRole);
      localStorage.setItem("userid",userId)

      // Dispatch loginSuccess to update Redux state
      dispatch(loginSuccess({ token, username, role: userRole }));
      console.log('Token stored:', token);

    } else {
      console.log('No token found in the URL');
    }
  }, [dispatch]);
  // Content for the sections
  const sectionContent = {
    courses: (
      <div>
        <h2>All Courses</h2>
        <p>Here are the available courses...</p>
        {/* Add your courses list or API data here */}
      </div>
    ),
  
    addmissionProgress: (
      <div>
        <h2>addmission Progress</h2>
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
    teachers: (
      <div>
        <h2>teachers</h2>
        <p>Manage students here...</p>
      </div>
    ),
    myProfile: (
      <div>
        <h2>My Profile</h2>
        <p>View and edit your profile here...</p>
      </div>
    ),
    yourCourses: (
      <div>
        <h2>your course</h2>
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
        <button className={styles.addCourseButton}>Add Course</button>
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

          <li><button onClick={() => setActiveSection("addmissionProgress")}>addmission Progress</button></li>
          <li className={styles.disabled}><button onClick={() => setActiveSection("myAccount")} disabled>My Account</button></li>
          <li><button onClick={() => setActiveSection("teachers")}>teachers</button></li>
          <li><button onClick={() => setActiveSection("myProfile")}>My Profile</button></li>
          <li><button onClick={() => setActiveSection("yourCourses")}>Your Courses</button></li>
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

export default LearnersHome;
