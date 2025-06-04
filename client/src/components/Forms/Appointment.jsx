import React, { useState } from 'react';
import './FormStyle.css';

function Appointment() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    problem: '',
    difficultyType: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted data:', formData);
    // TODO: send to backend
  };

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
        <input type="file" name="image" accept="image/*" onChange={handleChange} />

        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
}

export default Appointment;
