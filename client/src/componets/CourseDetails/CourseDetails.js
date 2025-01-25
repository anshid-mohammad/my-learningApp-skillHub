import React, { useState, useEffect } from 'react';
import styles from './CourseDetails.module.css';



function CourseDetails() {
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const courses = [
    {
      title: 'Website Design',
      description: 'Learn to create visually appealing websites.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      link: '/enroll/website-design',
    },
    {
      title: 'UI/UX',
      description: 'Master user experience and interface design.',
      videoUrl: 'https://www.youtube.com/embed/tgbNymZ7vqY',
      link: '/enroll/ui-ux',
    },
    {
      title: 'Frontend Development',
      description: 'Build dynamic and responsive web applications.',
      videoUrl: 'https://www.youtube.com/embed/kTuKcuF01nY',
      link: '/enroll/frontend-development',
    },
    {
      title: 'Backend Development',
      description: 'Learn server-side programming and database management.',
      videoUrl: 'https://www.youtube.com/embed/Kn6oB7RpROI',
      link: '/enroll/backend-development',
    },
    {
      title: 'Data Science',
      description: 'Analyze data and extract meaningful insights.',
      videoUrl: 'https://www.youtube.com/embed/2Fp1N6dof0Y',
      link: '/enroll/data-science',
    },
    {
      title: 'Data Science',
      description: 'Analyze data and extract meaningful insights.',
      videoUrl: 'https://www.youtube.com/embed/2Fp1N6dof0Y',
      link: '/enroll/data-science',
    },
    {
      title: 'Data Science',
      description: 'Analyze data and extract meaningful insights.',
      videoUrl: 'https://www.youtube.com/embed/2Fp1N6dof0Y',
      link: '/enroll/data-science',
    },
    {
      title: 'Data Science',
      description: 'Analyze data and extract meaningful insights.',
      videoUrl: 'https://www.youtube.com/embed/2Fp1N6dof0Y',
      link: '/enroll/data-science',
    },
    {
      title: 'Machine Learning',
      description: 'Create intelligent systems with machine learning.',
      videoUrl: 'https://www.youtube.com/embed/5QgX8R5X2z8',
      link: '/enroll/machine-learning',
    },
  ];

  // Determine the number of cards to  display 
  const displayedCourses = showAll
    ? courses
    : isMobile
    ? courses.slice(0, 3) // Show 3 cards on mobile screens
    : courses.slice(0, 4); // Show 5 cards on computer screens

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
            <div className={styles.videocontainer}>
              <iframe
                src={course.videoUrl}
                title={course.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen></iframe>
            </div>
            <div className={styles.cardbody}>
              <h5>{course.title}</h5>
              <p>{course.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.buttoncontainer}>
      {!showAll ? (
          <button className={styles.actionbutton} onClick={() => setShowAll(true)}>
            See More
          </button>
        ) : (
          <button className={styles.actionbutton} onClick={() => setShowAll(false)}>
            Hide Courses
          </button>
        )}
      </div>
    </div>
  );
}

export default CourseDetails;
