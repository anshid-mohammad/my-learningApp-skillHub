import React, { useState } from 'react';
import axios from 'axios';
import styles from './TeachersForm.module.css';
import { useNavigate } from 'react-router-dom';

function TeachersForm() {
  const navigate=useNavigate()
  const [form, setForm] = useState({
    courseName: '',
    description: '',
    category: '',
    level: '',
    teacherName: '',
    teacherContact: '',
    institutionName: '',
    institutionAddress: '',
    duration: '',
    schedule: '',
    startDate: '',
    endDate: '',
    frequency: '',
    price: '',
    discount: '',
  });

  const [photoFile, setPhotoFile] = useState(null); // State for the photo file
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleFileChange = (e) => {
    setPhotoFile(e.target.files[0]); // Update the photo file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
  
    // Append form fields to FormData
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });
  
    // Append the photo file
    if (photoFile) {
      formData.append('photo', photoFile);
    }
  
    // Debug: log FormData before sending to ensure all fields are included
    console.log([...formData]);
  
    try {
      setIsSubmitting(true);
  
      const response = await axios.post('/api/auth/add-course', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      console.log('Course created:', response.data);
      navigate("/teachers");
      alert('Course created successfully!');
    } catch (error) {
      // Handle error in a more detailed way
      console.error('Error creating course:', error.response?.data || error.message);
      alert('Failed to create course. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className={styles.formContainer}>
      <form className={styles.courseForm} onSubmit={handleSubmit}>
        <h2 className={styles.maintext}>Add Course Details</h2>
        
        <div className={styles.formGroup}>
          <label>Course Name</label>
          <input
            type="text"
            name="courseName"
            value={form.courseName}
            onChange={handleInputChange}
            placeholder="Enter course name"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Course Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleInputChange}
            placeholder="Enter course description"
            required
          ></textarea>
        </div>

        <div className={styles.formGroup}>
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleInputChange}
            placeholder="Enter category"
            required
          />
        </div>

        <div className={styles.formGroup}>
  <label>Level</label>
  <select
    name="level"
    value={form.level}
    onChange={handleInputChange}
    required
  > 
    <option value="" disabled>
      Select Level
    </option>
    <option value="Beginner">Beginner</option>
    <option value="Intermediate">Intermediate</option>
    <option value="Advanced">Advanced</option>
  </select>
</div>

        <div className={styles.formGroup}>
          <label>Teacher's Name</label>
          <input
            type="text"
            name="teacherName"
            value={form.teacherName}
            onChange={handleInputChange}
            placeholder="Enter teacher's name"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Teacher's Contact</label>
          <input
            type="text"
            name="teacherContact"
            value={form.teacherContact}
            onChange={handleInputChange}
            placeholder="Enter contact number"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Institution Name</label>
          <input
            type="text"
            name="institutionName"
            value={form.institutionName}
            onChange={handleInputChange}
            placeholder="Enter institution name"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Institution Address</label>
          <input
            type="text"
            name="institutionAddress"
            value={form.institutionAddress}
            onChange={handleInputChange}
            placeholder="Enter institution address"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>institution image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Course Duration</label>
          <input
            type="text"
            name="duration"
            value={form.duration}
            onChange={handleInputChange}
            placeholder="Enter course duration"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Schedule</label>
          <input
            type="text"
            name="schedule"
            value={form.schedule}
            onChange={handleInputChange}
            placeholder="Enter schedule"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Start Date</label>
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>End Date</label>
          <input
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Frequency</label>
          <input
            type="text"
            name="frequency"
            value={form.frequency}
            onChange={handleInputChange}
            placeholder="Enter frequency"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleInputChange}
            placeholder="Enter price"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Discount/Offers</label>
          <input
            type="text"
            name="discount"
            value={form.discount}
            onChange={handleInputChange}
            placeholder="Enter discount details"
          />
        </div>

        <button type="submit" className={styles.addButton} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Add Course'}
        </button>
      </form>
    </div>
  );
}

export default TeachersForm;
