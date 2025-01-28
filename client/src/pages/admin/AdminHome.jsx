import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './AdminHome.module.css';
import { useNavigate } from 'react-router-dom';

function AdminHome() {
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get('/api/auth/get-course', {
          params: { status: 'pending' }, // Add query parameter
        });
        setFormData(response.data); // Set only the filtered data
        console.log(response.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch course data.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchFormData();
  }, []);
  
  //  useEffect(() => {
  //   const fetchFormData = async () => {
  //     try {
  //       const response = await axios.get('/api/auth/get-course',{status:"pending"});
  //       setFormData(response.data);
  //       console.log(response.data)
  //     } catch (err) {
  //       console.error('Error fetching data:', err);
  //       setError('Failed to fetch course data.');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchFormData();
  // },[]);

  const handleViewClick = async(id) => {
    try {
        await axios.put(`/api/auth/update-status/${id}`, { status: "under-review" });
  
        setFormData((prevApplications) =>
          prevApplications.map((application) =>
            application._id === id ? { ...application, status: "under-review" } : application
          )
        );
  
        navigate(`/admin-courselist/${id}`);
      } catch (error) {
        console.error("Error updating status:", error);
      }
    };

  // Section content mapping
  const sectionContent = {
    courses: (
      <div className={styles.applicantContainer}>
      <h2>New Applicant List</h2>
      {loading ? (
        <p>Loading courses...</p>
      ) : error ? (
        <p>{error}</p>
      ) : formData.length > 0 ? (
        <table className={styles.applicantTable}>
          <thead>
            <tr>
              <th>S.no</th>
              <th>Course Name</th>
              <th>Teacher Name</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {formData
              .filter((form) => form.status === "pending") // Filter only "pending" courses
              .map((form, index) => (
                <tr key={form._id}>
                  <td>{index + 1}</td>
                  <td>{form.courseName}</td>
                  <td>{form.teacherName}</td>
                  <td>
                    <button
                      onClick={() => handleViewClick(form._id)}
                      className={styles.openBtn}
                    >
                      View
                    </button>
                  </td>
                  <td>{form.status}</td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <p>No courses available.</p>
      )}
    </div>
    
    ),
    pendingCourses: (
      <div>
       
      </div>
    ),
    addmissionProgress: (
      <div>
        <h2>Admission Progress</h2>
        <p>Here are your approved courses...</p>
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
        <h2>Teachers</h2>
        <p>Manage teachers here...</p>
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
        <h2>Your Courses</h2>
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
      <div className={styles.applicantContainer}>
        <h2>New Applicant List</h2>
        {loading ? (
          <p>Loading courses...</p>
        ) : error ? (
          <p>{error}</p>
        ) : formData.length > 0 ? (
          <table className={styles.applicantTable}>
            <thead>
              <tr>
                <th>S.no</th>
                <th>Course Name</th>
                <th>Teacher Name</th>
                <th>Action</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {formData.map((form, index) => (
                <tr key={form._id}>
                  <td>{index + 1}</td>
                  <td>{form.courseName}</td>
                  <td>{form.teacherName}</td>
                  <td>
                    <button
                      onClick={() => handleViewClick(form._id)}
                      className={styles.openBtn}
                    >
                      View
                    </button>
                  </td>
                  <td>{form.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No courses available.</p>
        )}
      </div>
    ),
  };

  const sidebarLinks = [
    { key: 'courses', label: 'New Course List' },
    { key: 'addmissionProgress', label: 'Admission Progress' },
    { key: 'myAccount', label: 'Learners', disabled: true },
    { key: 'teachers', label: 'Teachers' },
    { key: 'myProfile', label: 'My Profile' },
    { key: 'yourCourses', label: 'Your Courses' },
    { key: 'chat', label: 'Chat' },
  ];

  return (
    <div className={styles.learnerHomePage}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <h3 className={styles.logo}>
          Skill Hub <br />
          Admin
        </h3>
        <ul className={styles.navLinks}>
          {sidebarLinks.map(({ key, label, disabled }) => (
            <li key={key} className={disabled ? styles.disabled : ''}>
              <button
                onClick={() => setActiveSection(key)}
                disabled={disabled}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className={styles.content}>{sectionContent[activeSection]}</div>
    </div>
  );
}

export default AdminHome;
