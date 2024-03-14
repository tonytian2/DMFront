import React from 'react';
import '../CSS/ErrorModal.css';
import ExclamationIcon from '../CSS/pictures/mark.png'; // Path to your '!' icon SVG file

const ErrorModal = ({ message, closeModal }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="error-header">
          <img src={ExclamationIcon} alt="Error" className="error-icon"/> {/* '!' icon */}
        </div>
        <div className="error-body">
          <p>{message}</p>
        </div>
        <div className="error-footer">
          <button className="close-button" onClick={closeModal}>CLOSE</button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
