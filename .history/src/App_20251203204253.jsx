// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Tailor from "./pages/Tailor";
// import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        {/* Normal app routes */}
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tailor" element={<Tailor />} />

        {/* ⭐ PREVIEW ROUTE — NO AUTH REQUIRED */}
        <Route path="/preview-home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
