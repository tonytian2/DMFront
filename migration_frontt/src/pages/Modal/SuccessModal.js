import React from 'react';
import '../CSS/SuccessModal.css';
import tick from '../CSS/pictures/verified.png'; // Path to your '!' icon SVG file

const SuccessModal = ({ closeModal }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="tick-header">
          <img src={tick} alt="tick" className="tick-icon"/> {/* '!' icon */}
          <h4>UPDATED!!</h4>
        </div>
        <div className="tick-body">
        <p><br/>
            Sit back and relax~</p>
        </div>
        <div className="tick-footer">
          <button className="tick_close-button" onClick={closeModal}>CLOSE</button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
