import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Migration from "./pages/Migration";
import NoPage from "./pages/NoPage";

function App() {
  return (
    // <div className="App">
    //   <Migration />
    // </div>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="migration" element={<Migration />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
