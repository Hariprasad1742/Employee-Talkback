import React, { useState, useRef } from 'react';
import './FormStyle.css';

function LabReports() {
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
      const res = await fetch('http://localhost:5000/api/labreports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert('Lab report feedback submitted successfully!');
        setFormData({
          name: '',
          phone: '',
          problem: '',
          difficultyType: '',
          image: null,
        });
      } else {
        alert('Failed to submit lab report feedback');
      }
    } catch (error) {
      alert('Error submitting lab report feedback');
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="form-container">
      <h2>Lab Reports Feedback</h2>
      <form onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Phone Number</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

        <label>Issue Faced</label>
        <select name="difficultyType" value={formData.difficultyType} onChange={handleChange} required>
          <option value="">Select issue</option>
          <option value="Delay in results">Delay in results</option>
          <option value="Incorrect report">Incorrect report</option>
          <option value="Not explained properly">Not explained properly</option>
          <option value="Missing information">Missing information</option>
        </select>

        <label>Describe the problem</label>
        <textarea name="problem" rows="4" value={formData.problem} onChange={handleChange} required />

        <label>Upload Image (Optional)</label>
        <div className="upload-buttons">
          <button type="button" onClick={() => cameraInputRef.current.click()} style={buttonStyleGreen}>
            Take Photo
          </button>
          <button type="button" onClick={() => fileInputRef.current.click()} style={buttonStylePurple}>
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

export default LabReports;
