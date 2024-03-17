import { useState, useEffect } from "react";
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
  const [cloudURL, setCloudURL] = useState("");
  const [cloudUsername, setCloudUsername] = useState("");
  const [cloudPassword, setCloudPassword] = useState("");
  const [showModalA, setShowModalA] = useState(false);
  const [showModalB, setShowModalB] = useState(false);
  const [showModalC, setShowModalC] = useState(false);
  const [progress, setProgress] = useState(50);
  const [errorMessage, setErrorMessage] = useState("This is an error message");
  const [connectErrorMessage, setConnectErrorMessage] = useState("");

  // Function to handle login by sending credentials and authenticating
  const login = async () => {
    const url = "http://localhost:4999/v1/credentials";

    const formData = new FormData();
    formData.append("local_username", sqlUsername);
    formData.append("local_password", sqlPassword);
    formData.append("local_url", sqlHost);
    formData.append("cloud_username", cloudUsername);
    formData.append("cloud_password", cloudPassword);
    formData.append("cloud_url", cloudURL);

    try {
      const response = await fetch(url, {
        method: "POST",
        credentials: "include", // To include the cookies in the request
        body: formData,
      });

      if (response.ok) {
        // Login successful
        localStorage.isAuthenticated = true;
        navigate("/migration");
      } else {
        // Login failed
        if (
          !sqlHost ||
          !sqlUsername ||
          !sqlPassword ||
          !cloudURL ||
          !cloudUsername ||
          !cloudPassword
        ) {
          setConnectErrorMessage("Please fill in all required fields.");
          return;
        }

        const errorMessage = await response.text();
        setConnectErrorMessage(errorMessage);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    // Set localStorage.isAuthenticated to false when navigating back to the home page
    localStorage.setItem("isAuthenticated", "false");
  }, []);

  const handleConnect = (event) => {
    event.preventDefault();
    login();
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
        <form onSubmit={handleConnect} className="form">
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
                id="cloudURL"
                type="text"
                placeholder="URL"
                value={cloudURL}
                onChange={(e) => setCloudURL(e.target.value)}
                className="form-control"
              />
              <input
                id="cloudUsername"
                type="text"
                placeholder="username"
                value={cloudUsername}
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
          {connectErrorMessage && (
            <p className="error-message" style={{ color: "red" }}>
              {connectErrorMessage}
            </p>
          )}
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
