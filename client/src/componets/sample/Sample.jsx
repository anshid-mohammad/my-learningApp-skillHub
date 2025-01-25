// import React, { useState } from 'react';
// import axios from 'axios';

// function FileUpload() {
//   const [file, setFile] = useState(null);
//   const [uploadStatus, setUploadStatus] = useState('');
//   const [fileUrl, setFileUrl] = useState('');

//   // Handle file selection
//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//     setUploadStatus('');
//     setFileUrl('');
//   };

//   // Handle file upload
//   const handleUpload = async () => {
//     if (!file) {
//       setUploadStatus('Please select a file to upload.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('photo', file); // The key 'photo' matches the key in multer's `upload.single('photo')`

//     try {
//       const response = await axios.post('/api/auth/posts', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       setUploadStatus('File uploaded successfully!');
//       setFileUrl(response.data.fileUrl); // Server returns the file URL
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       setUploadStatus('File upload failed. Please try again.');
//     }
//   };

//   return (
//     <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', textAlign: 'center' }}>
//       <h2>File Upload</h2>
//       <input type="file" onChange={handleFileChange} />
//       <button
//         onClick={handleUpload}
//         style={{
//           marginTop: '10px',
//           padding: '10px 20px',
//           backgroundColor: '#007bff',
//           color: 'white',
//           border: 'none',
//           borderRadius: '5px',
//           cursor: 'pointer',
//         }}
//       >
//         Upload
//       </button>
//       {uploadStatus && <p style={{ marginTop: '10px' }}>{uploadStatus}</p>}
//       {fileUrl && (
//         <div>
//           <p>Uploaded File URL:</p>
//           <a href={fileUrl} target="_blank" rel="noopener noreferrer">
//             {fileUrl}
//           </a>
//         </div>
//       )}
//     </div>
//   );
// }

// export default FileUpload;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './sample.module.css';
import { useNavigate } from 'react-router-dom';

function Sample() {
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get('/api/auth/get-course');
        setFormData(response.data);
        console.log(response.data)
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch course data.');
      } finally {
        setLoading(false);
      }
    };
    fetchFormData();
  },[]);

  const handleViewClick = async(id) => {
    try {
        await axios.put(`/api/auth/update-status/${id}`, { status: "Under-Review" });
  
        setFormData((prevApplications) =>
          prevApplications.map((application) =>
            application._id === id ? { ...application, status: "Under-Review" } : application
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
                <th>Photo</th>
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
                    {form.photo ? (
                      <img
                        src={form.photo} // Use the photo URL directly
                        alt={form.courseName}
                        className={styles.courseImage} // Add a class for styling
                      />
                    ) : (
                      <p>No image available</p>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleViewClick(form._id)}
                      className={styles.openBtn}
                    >
                      View
                    </button>
                  </td>
                  <td>
                    <button className={styles.pendingBtn}>Pending</button>
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
                <th>Photo</th>
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
                    {form.photo ? (
                      <img
                        src={form.photo} // Use the photo URL directly
                        alt={form.courseName}
                        className={styles.courseImage} // Add a class for styling
                      />
                    ) : (
                      <p>No image available</p>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleViewClick(form._id)}
                      className={styles.openBtn}
                    >
                      View
                    </button>
                  </td>
                  <td>
                    <button className={styles.pendingBtn}>Pending</button>
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

export default Sample;
