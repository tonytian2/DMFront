import React from 'react';
import '../CSS/LoadingModal.css';
import cloudicon from '../CSS/pictures/data.png'; 
import validateicon from '../CSS/pictures/approval.png'; 


const LoadingModal = ({ progress, closeModal , msg}) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          {msg === "Validating" ? (
          <img src={validateicon} alt="Validation Icon" className="modal-icon" />
          ) : (
          <img src={cloudicon} alt="Cloud Icon" className="modal-icon" />
          )}
          <h2>{msg}</h2>
          <button className="close-buttonn" onClick={closeModal}>&times;</button> {/* Close button */}
        </div>
        <div className="modal-body">
          <div class="spinner-grow text-success" style={{width: "1rem", height: "1rem"}} role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <div class="spinner-grow text-warning" style={{width: "1rem", height: "1rem"}} role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <div class="spinner-grow text-danger" style={{width: "1rem", height: "1rem"}} role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default LoadingModal;
