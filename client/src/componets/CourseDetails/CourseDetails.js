import React, { useState, useEffect } from 'react';
import styles from './CourseDetails.module.css';
import axios from 'axios';

function CourseDetails() {
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get('/api/auth/get-course');
        setCourseData(response.data);
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };
    fetchCourse();
  }, []);

  // Determine the number of cards to display
  const displayedCourses = showAll
    ? courseData
    : isMobile
    ? courseData.slice(0, 3) // Show 3 cards on mobile screens
    : courseData.slice(0, 4); // Show 4 cards on larger screens

  return (
    <div>
      <h3 className={styles.coursesheading}>Available Courses</h3>

      <div className={styles.courseavailable}>
        {displayedCourses.map((course, index) => (
          <div
            className={styles.coursecard}
            key={index}
            onClick={() => (window.location.href = course.link)}
          >
            <div className={styles.imagecontainer}>
              <img
                src={course.photo}
                alt={course.title}
                className={styles.courseimage}
              />
            </div>
            <div className={styles.cardbody}>
              <h5 className={styles.coursename}>{course.courseName}</h5>
              <p className={styles.coursedescription}>{course.description}</p>
              {/* <button className={styles.enrollbutton}>Enroll Now</button> */}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.buttoncontainer}>
        {!showAll ? (
          <button
            className={styles.actionbutton}
            onClick={() => setShowAll(true)}
          >
            See More
          </button>
        ) : (
          <button
            className={styles.actionbutton}
            onClick={() => setShowAll(false)}
          >
            Hide Courses
          </button>
        )}
      </div>
    </div>
  );
}

export default CourseDetails;
