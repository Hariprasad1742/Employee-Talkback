import React, { useState, useRef } from 'react';
import './FormStyle.css';

function PatientRooms() {
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
    console.log('Submitted Waiting Room Feedback:', formData);
  };

  return (
    <div className="form-container">
      <h2>Patient Room Feedback</h2>
      <form onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Phone Number</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

        <label>Issue Faced</label>
            <select name="difficultyType" value={formData.difficultyType} onChange={handleChange} required>
            <option value="">Select issue</option>
            <option value="Unclean room">Unclean room</option>
            <option value="Broken equipment">Broken equipment</option>
            <option value="Poor lighting">Poor lighting</option>
            <option value="Noisy environment">Noisy environment</option>
            </select>


        <label>Describe the problem</label>
        <textarea name="problem" rows="4" value={formData.problem} onChange={handleChange} required />

        <label>Upload Image (Optional)</label>
        <div className="upload-buttons">
          <button type="button" onClick={() => cameraInputRef.current.click()}>Take Photo</button>
          <button type="button" onClick={() => fileInputRef.current.click()}>Choose Existing</button>
        </div>
        <input type="file" name="image" accept="image/*" capture="environment" style={{ display: 'none' }} ref={cameraInputRef} onChange={handleChange} />
        <input type="file" name="image" accept="image/*" style={{ display: 'none' }} ref={fileInputRef} onChange={handleChange} />

        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
}

export default PatientRooms;
