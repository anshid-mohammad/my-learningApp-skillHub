import React, { useState, useEffect } from 'react';
import styles from "./Courses.module.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Courses() {
  const [courseData, setCourseData] = useState([]);
  const navigate = useNavigate();

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

  const handleClickData = (courseId) => {
    navigate(`/course-details/${courseId}`);
  };

  return (
    <div>
      <h3 className={styles.coursesheading}>Available Courses</h3>

      <div className={styles.courseavailable}>
        {courseData
          .filter((course) => course.status === "approved")
          .map((course) => (
            <div
              className={styles.coursecard}
              key={course._id}
              onClick={() => handleClickData(course._id)}
            >
              <div className={styles.imagecontainer}>
                <img
                  src={course.photo}
                  alt={course.title}
                  className={styles.courseimage}
                  onClick={() => handleClickData(course._id)}
                  />
              </div>
              <div className={styles.cardbody}>
                <h5 className={styles.coursename}>{course.courseName}</h5>
                <p className={styles.coursedescription}>{course.description}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Courses;
