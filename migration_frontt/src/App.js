import "./App.css";
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Redirect,
} from "react-router-dom";
import Home from "./pages/Home";
import Migration from "./pages/Migration";
import Result from "./pages/Result";
import NoPage from "./pages/NoPage";
// import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={<Home setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path="/migration"
            element={
              <PrivateRoute>
                <Migration />
              </PrivateRoute>
            }
          />
          <Route
            path="/result"
            element={
              <PrivateRoute>
                <Result />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
