import React, { useState } from 'react';
import '../CSS/ValidationModal.css';
import checkicon from '../CSS/pictures/check.png'; // Make sure the path is correct

const ValidationModal = ({ closeModal, onValidate }) => {
  // Manage the input state if it's not coming from the parent component
  const [inputValidationPercentage, setInputValidationPercentage] = useState('');

  // Update the state when the input changes
  const handleInputChange = (event) => {
    setInputValidationPercentage(event.target.value);
  };

  // When the user clicks 'YES', pass the input value to the onValidate function
  const handleValidateClick = () => {
    onValidate(inputValidationPercentage);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <img src={checkicon} alt="Check Icon" className="modal-icon" />
          <h2>Migration Completed</h2>
        </div>
        <div className="modal-body">
          <p>Do you want to validate the data?</p>
          <input
            type="number" // Use "number" if you want to restrict input to numbers
            placeholder="Validation %"
            value={inputValidationPercentage}
            onChange={handleInputChange}
            className="validation-input"
          />
          <div className="modal-footer">
            <button className="yes-button" onClick={handleValidateClick}>YES</button>
            <button className="close-button" onClick={closeModal}>CLOSE</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidationModal;
