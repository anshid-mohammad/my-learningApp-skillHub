import React, { useState, useEffect } from 'react';
import styles from "./LearnersHome.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, checkAuthStatus } from "../../redux/UserSlice";
import Courses from './Courses/Courses';
import StudentProgress from './studentProgress/StudentProgress';
import Chat from '../chat/Chat';
import Profile from './Profile/Profile';

function LearnersHome() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const { loggedIn, user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token');
    if (token) {
      dispatch(loginSuccess({ token }));
      console.log('Token stored:', token);
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  useEffect(() => {
    if (!loading && (!loggedIn || !user)) {
      navigate('/login');
    }
  }, [loggedIn, user, loading, navigate]);

  const sectionContent = {
    home: (
      <div className={styles.courseCard}>
        <h2>Add your courses</h2>
        <p>
          "Education is the key to success in life, and teachers make a 
          lasting impact in the lives of their students."
        </p>
        <button className={styles.addCourseButton}>Add Course</button>
        <div className={styles.cardImage}>
          <img src="/images/addcourse.png" alt="Add Course Illustration" />
        </div>
      </div>
    ),
    courses:(
      <Courses></Courses>

    ),
    addmissionProgress: (
      <StudentProgress></StudentProgress>
    ),
    myAccount: <Section title="My Account" text="Account details and settings..." />,
    teachers: <Section title="Teachers" text="Manage students here..." />,
    myProfile: (
      <Profile/>
    ),
    yourCourses: <Section title="Your Courses" text="Verify students here..." />,
    chat:(<Chat></Chat>
    ),
  };

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleSectionClick = (section) => {
    setActiveSection(section);
    setIsSidebarOpen(false);
  };

  return (
    <div className={styles.learnerHomePage}>
      <header className={styles.header}>
        <button
          className={styles.toggleSidebarButton}
          onClick={toggleSidebar}
        >
          ☰ Tool Kit
        </button>
      </header>
      
      <nav className={`${styles.sidebar} ${isSidebarOpen ? styles.show : styles.hidden}`}>
        <h3 className={styles.logo}>Skill Hub</h3>
        <button className={styles.closeSidebarButton} onClick={toggleSidebar}>
          ✖
        </button>
        <ul className={styles.navLinks}>
          {Object.keys(sectionContent).map((key) => (
            
            <li key={key}>
              
              <button
                onClick={() => handleSectionClick(key)}
                className={activeSection === key ? styles.active : ''}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
              
            </li>
            
          ))}
        </ul>
      </nav>
      
      <main className={styles.content}>
        {sectionContent[activeSection]}
      </main>
    </div>
  );
}

function Section({ title, text }) {
  return (
    <div className={styles.section}>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

export default LearnersHome;
