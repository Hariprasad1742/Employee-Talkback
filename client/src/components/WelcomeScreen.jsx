import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomeScreen.css';  // For styling

const WelcomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <img 
        src="/logo.png"  // Put your logo in public folder or adjust path
        alt="Custom Logo" 
        className="welcome-logo"
      />

      <div className="welcome-text">
        <h3>Sprint</h3>
        
        
        <h2>Naveen Hospital</h2>
        <p>
          Naveen Hospital is a 482-bed academic medical center located in coimbatore, 
          providing medical care for infants, children, teens and adults.
        </p>
      </div>

      <button className="continue-button" onClick={() => navigate('/feedback-category')}>
        Continue
      </button>
    </div>
  );
};

export default WelcomeScreen;
