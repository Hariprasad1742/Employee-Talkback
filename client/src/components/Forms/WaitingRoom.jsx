import React, { useState, useRef } from 'react';
import './FormStyle.css';

function WaitingRoom() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    problem: '',
    difficultyType: '',
    image: null,
  });

  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, files, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted data:', formData);
  };

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  const openCameraDialog = () => {
    cameraInputRef.current.click();
  };

  return (
    <div className="form-container">
      <h2>Waiting Room Feedback</h2>
      <form onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Phone Number</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

        <label>Issue Faced</label>
        <select name="difficultyType" value={formData.difficultyType} onChange={handleChange} required>
          <option value="">Select issue</option>
          <option value="Long wait time">Long wait time</option>
          <option value="Overcrowded area">Overcrowded area</option>
          <option value="Unclean environment">Unclean environment</option>
          <option value="Noise or disturbance">Noise or disturbance</option>
        </select>

        <label>Describe the problem you faced</label>
        <textarea name="problem" rows="4" value={formData.problem} onChange={handleChange} required />

        <label>Upload Image (Optional)</label>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <button
            type="button"
            onClick={openCameraDialog}
            style={{
              backgroundColor: '#27ae60',
              color: 'white',
              border: 'none',
              padding: '6px 12px',
              fontSize: '13px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Take Photo
          </button>
          <button
            type="button"
            onClick={openFileDialog}
            style={{
              backgroundColor: '#8e44ad',
              color: 'white',
              border: 'none',
              padding: '6px 12px',
              fontSize: '13px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
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

        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
}

export default WaitingRoom;
