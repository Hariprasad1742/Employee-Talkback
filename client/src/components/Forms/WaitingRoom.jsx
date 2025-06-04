import React, { useState, useRef } from 'react';
import './FormStyle.css';

function WaitingRoom() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    problem: '',
    difficultyType: '',
    imageBase64: '', // store base64 string here
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  // Convert file to base64 string
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleChange = async (e) => {
    const { name, files, value } = e.target;

    if (files) {
      if (files.length > 0) {
        try {
          const base64 = await fileToBase64(files[0]);
          setFormData((prev) => ({
            ...prev,
            imageBase64: base64,
          }));
        } catch (err) {
          console.error('Error converting file to base64', err);
        }
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const response = await fetch('http://localhost:5000/api/waitingroom', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // rename imageBase64 to image here
      body: JSON.stringify({
        name: formData.name,
        phone: formData.phone,
        difficultyType: formData.difficultyType,
        problem: formData.problem,
        image: formData.imageBase64,
      }),
    });

    if (response.ok) {
      alert('Feedback submitted successfully!');
      setFormData({
        name: '',
        phone: '',
        problem: '',
        difficultyType: '',
        imageBase64: '',
      });
    } else {
      alert('Failed to submit feedback');
    }
  } catch (error) {
    console.error('Submit error:', error);
    alert('Error submitting feedback');
  } finally {
    setIsSubmitting(false);
  }
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
            onClick={() => cameraInputRef.current.click()}
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
            onClick={() => fileInputRef.current.click()}
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

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>
    </div>
  );
}

export default WaitingRoom;
