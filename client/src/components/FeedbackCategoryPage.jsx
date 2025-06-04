import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FeedbackCategoryPage.css';

const categories = [
  { name: 'Appointments', image: '/assets/hill.png', route: 'appointment' },
  { name: 'Waiting Room', image: '/assets/hill.png', route: 'waiting-room' },
  { name: 'Doctors', image: '/assets/hill.png', route: 'doctors' },
  { name: 'Nurses', image: '/assets/hill.png', route: 'nurses' },
  { name: 'Patient Rooms', image: '/assets/hill.png', route: 'patient-rooms' },
  { name: 'Lab Reports', image: '/assets/hill.png', route: 'lab-reports' },
  { name: 'Others', image: '/assets/hill.png', route: 'others' },
];

function FeedbackCategoryPage() {
  const navigate = useNavigate();

  return (
    <div className="category-container">
      <h2>Select Feedback Type</h2>
      <div className="category-grid">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="category-card"
            onClick={() => navigate(`/feedback/${cat.route}`)}
          >
            <img src={cat.image} alt={cat.name} className="category-image" />
            <p>{cat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeedbackCategoryPage;
