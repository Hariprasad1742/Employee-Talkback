import React, { useState, useRef } from 'react';
import './FormStyle.css';

function Appointment() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    problem: '',
    difficultyType: '',
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  // Convert file to base64
  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleChange = async (e) => {
    const { name, files, value } = e.target;
    if (files) {
      if (files[0]) {
        const base64 = await fileToBase64(files[0]);
        setFormData((prev) => ({ ...prev, [name]: base64 }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert('Feedback submitted successfully!');
        setFormData({
          name: '',
          phone: '',
          problem: '',
          difficultyType: '',
          image: null,
        });
      } else {
        alert('Failed to submit feedback');
      }
    } catch (error) {
      alert('Error submitting feedback');
      console.error(error);
    }
    setLoading(false);
  };

  const openFileDialog = () => fileInputRef.current.click();
  const openCameraDialog = () => cameraInputRef.current.click();

  return (
    <div className="form-container">
      <h2>Appointment Feedback</h2>
      <form onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Phone Number</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

        <label>Type of Appointment Issue</label>
        <select name="difficultyType" value={formData.difficultyType} onChange={handleChange} required>
          <option value="">Select issue</option>
          <option value="Delay in appointment">Delay in appointment</option>
          <option value="No proper communication">No proper communication</option>
          <option value="Doctor unavailable">Doctor unavailable</option>
          <option value="Rescheduling issues">Rescheduling issues</option>
          <option value="Others">Others</option>
        </select>

        <label>Describe the problem you faced</label>
        <textarea name="problem" rows="4" value={formData.problem} onChange={handleChange} required />

        <label>Upload Image (Optional)</label>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <button type="button" onClick={openCameraDialog} style={buttonStyleGreen}>
            Take Photo
          </button>
          <button type="button" onClick={openFileDialog} style={buttonStylePurple}>
            Choose Existing
          </button>
        </div>

        <input
          type="file"
          name="image"
          accept="image/*"
          capture="environment"
          style={{ display: 'none' }}
          ref={cameraInputRef}
          onChange={handleChange}
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>
    </div>
  );
}

const buttonStyleGreen = {
  backgroundColor: '#27ae60',
  color: 'white',
  border: 'none',
  padding: '6px 12px',
  fontSize: '13px',
  borderRadius: '4px',
  cursor: 'pointer',
};

const buttonStylePurple = {
  backgroundColor: '#8e44ad',
  color: 'white',
  border: 'none',
  padding: '6px 12px',
  fontSize: '13px',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default Appointment;
