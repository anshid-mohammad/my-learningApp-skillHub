import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './StudentList.module.css';
import axios from 'axios';

function StudentList() {
  const [studentDetails, setStudentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/auth/student-details/${id}`);
        setStudentDetails(response.data);
      } catch (err) {
        setError('Failed to fetch student details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudentDetails();
  }, [id]);

  const handleApprove = async () => {
    if (!window.confirm('Are you sure you want to approve this student?')) return;

    try {
      const response = await axios.put(`/api/auth/update-student/${id}`, { status: 'approved' });
      setStudentDetails((prev) => ({ ...prev, status: 'approved' }));
      alert(response.data.message || 'Student approved successfully!');
      navigate('/teachers');
    } catch (err) {
      alert('Failed to approve student. Please try again later.');
    }
  };

  const handleDecline = async () => {
    if (!window.confirm('Are you sure you want to decline this student?')) return;

    try {
      const response = await axios.delete(`/api/auth/delete-student/${id}`);
      alert(response.data.message || 'Student declined successfully!');
      navigate('/teachers');
    } catch (err) {
      alert('Failed to decline student. Please try again later.');
    }
  };

  const handleImageClick = (imageUrl) => setSelectedImage(imageUrl);
  const closeModal = () => setSelectedImage(null);
  const handleBack = () => navigate('/student-details');

  if (loading) return <p>Loading student details...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.container}>
      <button onClick={handleBack} className={styles.backButton}>&times;</button>
      <h1 className={styles.headerOne}>Student Details</h1>

      {studentDetails ? (
        <div className={styles.detailsCard}>
          <img
            src={studentDetails.photo || '/images/default-avatar.png'}
            alt="Student"
            className={styles.photo}
            onClick={() => handleImageClick(studentDetails.photo || '/images/default-avatar.png')}
          />
          <p><strong>Full Name:</strong> {studentDetails.name}</p>
          <p><strong>Date of Birth:</strong> {new Date(studentDetails.dob).toLocaleDateString()}</p>
          <p><strong>Gender:</strong> {studentDetails.gender}</p>
          <p><strong>Phone:</strong> {studentDetails.phone}</p>
          <p><strong>Email:</strong> {studentDetails.email}</p>
          <p><strong>Address:</strong> {studentDetails.address}</p>
          <p><strong>Qualification:</strong> {studentDetails.qualification}</p>
          <p><strong>Father's Name:</strong> {studentDetails.fatherName}</p>
          <p><strong>Parent's Phone:</strong> {studentDetails.parentPhone}</p>
          <p><strong>Status:</strong> {studentDetails.status}</p>
          <p><strong>Identity Proof:</strong></p>
          {studentDetails.identityProof ? (
            <a className={styles.link} href={studentDetails.identityProof} target="_blank" rel="noopener noreferrer">
              View Identity Proof
            </a>
          ) : (
            <p>No Identity Proof Uploaded</p>
          )}
        </div>
      ) : (
        <p>No details available for this student.</p>
      )}

      {selectedImage && (
        <div className={styles.modal} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Selected" className={styles.modalImage} />
            <button className={styles.closeButton} onClick={closeModal}>&times;</button>
          </div>
        </div>
      )}

      <div className={styles.actionButtons}>
        <button onClick={handleApprove} className={styles.approveButton}>Approve</button>
        <button onClick={handleDecline} className={styles.declineButton}>Decline</button>
      </div>
    </div>
  );
}

export default StudentList;
