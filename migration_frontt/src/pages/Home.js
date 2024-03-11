import { useState } from 'react';
import './CSS/Home.css'; // Make sure the path to your CSS file is correct

const Home = () => {
  const [sqlHost, setSqlHost] = useState('');
  const [sqlUsername, setSqlUsername] = useState('');
  const [sqlPassword, setSqlPassword] = useState('');
  const [CloudURL, setCloudURL] = useState('');
  const [CloudUsername, setCloudUsername] = useState('');
  const [cloudPassword, setCloudPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Your form submission logic here
  };

  return (
    <div className="home">
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form">
          <div className="form-content">
            <div className="form-section box">
              <h2>Local</h2>
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
              <h2>Destination</h2>
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
            <button type="submit" className="button">Connect</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
