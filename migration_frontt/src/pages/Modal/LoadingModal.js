import React from 'react';
import '../CSS/LoadingModal.css';
import cloudicon from '../CSS/pictures/data.png'; // Import the icon

const LoadingModal = ({ progress, closeModal }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <img src={cloudicon} alt="Cloud Icon" className="modal-icon" />
          <h2>Migration Progress</h2>
          <button className="close-buttonn" onClick={closeModal}>&times;</button> {/* Close button */}
        </div>
        <div className="modal-body">
          <div className="progress-bar-background">
            <div className="progress-bar-foreground" style={{ width: `${progress}%` }}>
              {/* Progress bar foreground fills as progress state updates */}
            </div>
          </div>
          <p className="progress-text">{progress}%</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingModal;
