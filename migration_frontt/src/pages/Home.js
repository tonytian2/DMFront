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
  const [showErrorModal, setErrorModal] = useState(false);
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

        const msg = await response.text();
        setConnectErrorMessage(msg)
        setErrorMessage(msg)
        setErrorMessage(errorMessage);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    // Clear localStorage when navigating back to the home page
    localStorage.clear();
  }, []);

  const handleConnect = (event) => {
    event.preventDefault();
    login();
  };

  const handleCloseModalA = () => {
    setErrorModal(false);
  };



  return (
    <div className="home">
      {showErrorModal && (
        <ErrorModal message={errorMessage} closeModal={handleCloseModalA} />
      )}



      {/* <button onClick={() => setShowModalA(true)}>Error Modal</button> */}


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
                placeholder="host"
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
