import "./App.css";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Migration from "./pages/Migration";
import Result from "./pages/Result";
import NoPage from "./pages/NoPage";

function App() {
  const navigate = useNavigate();

  // Function to handle logout by deleting the session
  const logout = async () => {
    try {
      const response = await fetch("http://localhost:4999/v1/session", {
        method: "DELETE",
        credentials: "include",
      });
      if (response.ok) {
        localStorage.isAuthenticated = false;
        navigate("/");
      } else {
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // PrivateRoute component to render children only if authenticated
  const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
  };

  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route
          path="/migration"
          element={
            <PrivateRoute>
              <Migration logout={logout} />
            </PrivateRoute>
          }
        />
        <Route
          path="/result"
          element={
            <PrivateRoute>
              <Result logout={logout} />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  );
}

export default App;
