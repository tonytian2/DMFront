import { useState } from "react";
import "./CSS/Home.css"; // Make sure the path to your CSS file is correct
import ErrorModal from "./Modal/ErrorModal";
import ProgressModal from "./Modal/LoadingModal";
import ValidationModal from "./Modal/ValidationModal";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [sqlHost, setSqlHost] = useState("");
  const [sqlUsername, setSqlUsername] = useState("");
  const [sqlPassword, setSqlPassword] = useState("");
  const [CloudURL, setCloudURL] = useState("");
  const [CloudUsername, setCloudUsername] = useState("");
  const [cloudPassword, setCloudPassword] = useState("");
  const [showModalA, setShowModalA] = useState(false);
  const [showModalB, setShowModalB] = useState(false);
  const [showModalC, setShowModalC] = useState(false);
  const [progress, setProgress] = useState(50); // Initialize progress state
  const [errorMessage, setErrorMessage] = useState("This is an error message");

  const handleSubmit = (event) => {
    event.preventDefault();
    // check connection logic
    navigate("/migration");
  };

  const handleCloseModalA = () => {
    setShowModalA(false);
  };
  const handleCloseModalB = () => {
    setShowModalB(false);
  };
  const handleCloseModalC = () => {
    setShowModalC(false);
  };
  const handleValidation = (inputPercentage) => {
    // Validation logic goes here
    console.log(`Validation started with percentage: ${inputPercentage}`);
    // Potentially close modal after validation
    handleCloseModalC();
  };

  return (
    <div className="home">
      {showModalA && (
        <ErrorModal message={errorMessage} closeModal={handleCloseModalA} />
      )}

      {showModalB && (
        <ProgressModal progress={progress} closeModal={handleCloseModalB} />
      )}

      {showModalC && (
        <ValidationModal
          closeModal={handleCloseModalC}
          onValidate={handleValidation}
        />
      )}

      <button onClick={() => setShowModalA(true)}>Error Modal</button>
      {/* <button onClick={() => setShowModalB(true)}>Open ModalB</button>
      <button onClick={() => setShowModalC(true)}>Open ModalC</button> */}

      <h1 className="company-title">CloudBridge</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form">
          <div className="form-content">
            <div className="form-section box">
              <h2>Local Database</h2>
              <input
                id="sqlHost"
                type="text"
                placeholder="host"
                value={sqlHost}
                onChange={(e) => setSqlHost(e.target.value)}
                className="form-control"
              />
              <input
                id="sqlUsername"
                type="text"
                placeholder="username"
                value={sqlUsername}
                onChange={(e) => setSqlUsername(e.target.value)}
                className="form-control"
              />
              <input
                id="sqlPassword"
                type="password"
                placeholder="password"
                value={sqlPassword}
                onChange={(e) => setSqlPassword(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-section box">
              <h2>Destination Cloud</h2>
              <input
                id="CloudURL"
                type="text"
                placeholder="URL"
                value={CloudURL}
                onChange={(e) => setCloudURL(e.target.value)}
                className="form-control"
              />
              <input
                id="CloudUsername"
                type="text"
                placeholder="username"
                value={CloudUsername}
                onChange={(e) => setCloudUsername(e.target.value)}
                className="form-control"
              />
              <input
                id="cloudPassword"
                type="password"
                placeholder="password"
                value={cloudPassword}
                onChange={(e) => setCloudPassword(e.target.value)}
                className="form-control"
              />
            </div>
          </div>
          <div className="button-container">
            <button type="submit" className="button">
              Connect
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
