// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Tailor from "./pages/Tailor";
import Landing from "./pages/Landing";
import ResumeWorkshop from "./pages/Analyze";

function App() {
  return (
    <Router>
      <Routes>
        {/* Normal app routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tailor" element={<Tailor />} />
        <Route path="/analyze" element={<ResumeWorkshop />} />

        {/* ⭐ PREVIEW ROUTE — NO AUTH REQUIRED */}
        <Route path="/preview-home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
