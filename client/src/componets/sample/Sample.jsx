import React ,{useState} from 'react'
import styles from "./sample.module.css"

function Sample() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    assetFor: '',
    email: '',
    password: '',
    verifyPassword: '',
    secretQuestion: "What is your mother's middle name?",
    secretAnswer: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };
  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.label}>First Name</label>
            <input
              type="text"
              className={styles.input}
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Last Name</label>
            <input
              type="text"
              className={styles.input}
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              required
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Address</label>
          <input
            type="text"
            className={styles.input}
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
            required
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.label}>City</label>
            <input
              type="text"
              className={styles.input}
              value={formData.city}
              onChange={(e) => setFormData({...formData, city: e.target.value})}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>State</label>
            <select
              className={styles.select}
              value={formData.state}
              onChange={(e) => setFormData({...formData, state: e.target.value})}
              required
            >
              <option value="">-Select-</option>
              {/* Add state options here */}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Zip Code</label>
            <input
              type="text"
              className={styles.input}
              value={formData.zipCode}
              onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
              required
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Phone</label>
          <input
            type="tel"
            className={styles.input}
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>You do an asset for?</label>
          <input
            type="text"
            className={styles.input}
            value={formData.assetFor}
            onChange={(e) => setFormData({...formData, assetFor: e.target.value})}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <h3 className={styles.sectionTitle}>Account Setup</h3>
          <label className={styles.label}>Email (This is your username)</label>
          <input
            type="email"
            className={styles.input}
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Create Your Password</label>
            <input
              type="password"
              className={styles.input}
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Verify Your Password</label>
            <input
              type="password"
              className={styles.input}
              value={formData.verifyPassword}
              onChange={(e) => setFormData({...formData, verifyPassword: e.target.value})}
              required
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Choose a Secret Question</label>
          <select
            className={styles.select}
            value={formData.secretQuestion}
            onChange={(e) => setFormData({...formData, secretQuestion: e.target.value})}
            required
          >
            <option>What is your mother's middle name?</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Answer the Question</label>
          <input
            type="text"
            className={styles.input}
            value={formData.secretAnswer}
            onChange={(e) => setFormData({...formData, secretAnswer: e.target.value})}
            required
          />
        </div>

        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  )
}

export default Sample
 