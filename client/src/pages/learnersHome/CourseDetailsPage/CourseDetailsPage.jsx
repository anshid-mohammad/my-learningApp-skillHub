import React, { useState, useEffect } from "react";
import styles from "./CourseDetailsPage.module.css";
import { checkAuthStatus } from "../../../redux/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

function CourseDetailsPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [courseData, setCourseData] = useState(null); // Updated to handle a single object
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { loggedIn, user, loading } = useSelector((state) => state.auth);

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

  // Function to render dynamic tab content
  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className={styles.tabContent}>
            <h2>{courseData?.courseName || "Course Name"}</h2>
            <p>By {courseData?.instructor || "Instructor Name"}</p>
            <div className={styles.rating}>
              <span>{courseData?.rating || "⭐⭐⭐⭐☆"}</span>
            </div>
            <p className={styles.price}>{courseData?.price || "$95"}</p>
            <p className={styles.description}>{courseData?.description}</p>
            <p className={styles.readMore}>Read more</p>
          </div>
        );
      case "lessons":
        return (
          <div className={styles.tabContent}>
            <h2>Lessons</h2>
            <ul>
              {courseData?.lessons?.map((lesson, index) => (
                <li key={index}>{lesson}</li>
              )) || <li>No lessons available.</li>}
            </ul>
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
            <div className={styles.tags}>
              {courseData.tags?.length > 0 ? (
                courseData.tags.map((tag, index) => (
                  <span className={styles.tag} key={index}>
                    {tag}
                  </span>
                ))
              ) : (
                <span className={styles.tag}>No Tags Available</span>
              )}
            </div>
          </div>

          <button className={styles.enrollButton}>GET ENROLL</button>
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
            <li>7 Weeks</li>
            <li>30% Off</li>
            <li>Certificate</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CourseDetailsPage; 