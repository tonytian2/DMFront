import React, { useState } from 'react';
import '../CSS/ValidationModal.css';
import checkicon from '../CSS/pictures/check.png'; // Make sure the path is correct

const ValidationModal = ({ closeModal, onValidate }) => {
  const [inputValidationPercentage, setInputValidationPercentage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (event) => {
    setInputValidationPercentage(event.target.value);
    setErrorMessage('');
  };

  const handleValidateClick = () => {
    if (inputValidationPercentage !== '' && Number(inputValidationPercentage) >= 0 && Number(inputValidationPercentage) <= 100) {
      onValidate(inputValidationPercentage);
    } else {
      setErrorMessage('Invalid input. Please enter a value between 0 and 100.');
    }
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
            type="number"
            placeholder="Validation %"
            value={inputValidationPercentage}
            onChange={handleInputChange}
            className="validation-input"
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="modal-footer">
            <button className="yes-button" onClick={handleValidateClick}>YES</button>
            <button className="close-button" onClick={closeModal}>NO</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidationModal;