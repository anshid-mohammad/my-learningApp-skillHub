import React, { useState, useEffect } from "react";
import styles from "./CourseDetailsPage.module.css";
import { checkAuthStatus } from "../../../redux/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

function CourseDetailsPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [courseData, setCourseData] = useState(null); // Updated to handle a single object
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { loggedIn, user, loading ,userId} = useSelector((state) => state.auth);

  // Check authentication status
  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && (!loggedIn || !user)) {
      navigate("/login");
    }
  }, [loggedIn, user, loading, navigate]);

  // Fetch course data by ID
  useEffect(() => {
    const fetchCourseDataById = async () => {
      try {
        const response = await axios.get(`/api/auth/get-courseid/${id}`);
        setCourseData(response.data); // Single course object
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourseDataById();
  }, [id]);

 const  handleEnroll=async (courseId,teacherId)=>{
  try {
    const response = await axios.post('/api/auth/enroll-course', {
      courseId,
      userId:userId,
    });
    if (response.data.success) {
      // Optionally, update the UI or navigate to a different page
    } else {
      alert('Enrollment failed. Please try again.');
    }
  } catch (error) {
    console.error('Error enrolling in course:', error);
    alert('An error occurred while enrolling. Please try again.');
  }

  navigate(`/student-form/?courseId=${courseId}&teacherId=${teacherId}`);
}
  // Function to render dynamic tab content
  const renderContent = () => {
    
    switch (activeTab) {
      case "overview":
        return (
          <div className={styles.tabContent}>
            <h2>{courseData?.courseName || "Course Name"}</h2>
            <p>By {courseData?.
teacherName || "Instructor Name"}</p>
            <div className={styles.rating}>
              <span>{courseData?.rating || "⭐⭐⭐⭐☆"}</span>
            </div>
            <p className={styles.price}> Price :{courseData?.price || "$95"}</p>
            <p className={styles.description}>Description: {courseData?.description}</p>
            <p className={styles.category}>Category :{courseData?.category}</p>
            <p className={styles.category}>  📞 :{courseData?.teacherContact}</p>


            <Link className={styles.readMore}>Teacher Details</Link>
          </div>
        );
        case "lessons":
            return (
              <div className={styles.tabContent}>
                <h2 className={styles.lessonHeading}>Lessons</h2>
                {courseData?.lessons?.length > 0 ? (
                  <ul className={styles.lessonList}>
                    {courseData.lessons.map((lesson, index) => (
                      <li key={index} className={styles.lessonItem}>
                        <div className={styles.lessonDetails}>
                          <h3 className={styles.lessonTitle}>{lesson.title}</h3>
                          <p className={styles.lessonDescription}>{lesson.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className={styles.noLessonsText}>No lessons available.</p>
                )}
              </div>
            );
          
      case "reviews":
        return (
          <div className={styles.tabContent}>
            <h2>Reviews</h2>
            {courseData?.reviews?.length > 0 ? (
              courseData.reviews.map((review, index) => (
                <p key={index}>
                  {review.rating} - "{review.comment}" - {review.user}
                </p>
              ))
            ) : (
              <p>No reviews available.</p>
            )}
          </div>
        );
      default:
        return <div>Content not found</div>;
    }
  };

  if (!courseData) {
    return <p>Loading course details...</p>;
  }

  return (
    <div className={styles.courseDetailsContainer}>
      {/* Left Section */}
      {loggedIn ? (
        <div className={styles.leftSection}>
          <div className={styles.videoContainer}>
            {courseData.status === "approved" ? (
              <img
                src={courseData.photo || "/default-image.jpg"}
                alt={courseData.institutionName || "Course Image"}
                className={styles.videoImage}
              />
            ) : (
              <p>Course is not approved or unavailable.</p>
            )}
          </div>

          <div className={styles.tagContainer}>
            <h3>{courseData.institutionName || "Institution Name"}</h3>

            <h5>Address :{courseData.institutionAddress || "Institution Name"}</h5>

            <div className={styles.tags}>
            <span className={styles.tag} >
                    {courseData.schedule}
                  </span>  

              {courseData.tags?.length > 0 ? (
                courseData.tags.map((tag, index) => (
                  <span className={styles.tag} key={index}>
                    {courseData.category}
                  </span>
                  
                  
                ))
              ) : (
                <span className={styles.tag}>{courseData.category}</span>
                
              )}
              
            </div>
          </div>

          <button className={styles.enrollButton}  onClick={()=>handleEnroll(courseData._id,courseData.teacherId)}>GET ENROLL</button>
        </div>
      ) : (
        <h1>Please log in</h1>
      )}

      {/* Right Section */}
      <div className={styles.rightSection}>
        <div className={styles.courseInfo}>
          {/* Tabs */}
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${
                activeTab === "overview" ? styles.activeTab : ""
              }`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`${styles.tab} ${
                activeTab === "lessons" ? styles.activeTab : ""
              }`}
              onClick={() => setActiveTab("lessons")}
            >
              Lessons
            </button>
            <button
              className={`${styles.tab} ${
                activeTab === "reviews" ? styles.activeTab : ""
              }`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews
            </button>
          </div>

          {/* Dynamic Content */}
          {renderContent()}
        </div>

        <div className={styles.courseHighlights}>
          <ul>
            <li>100+ Lessons</li>
            <li>{courseData.frequency}</li>
            <li>{courseData.discount}% Off</li>
            <li>Certificate</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CourseDetailsPage; 