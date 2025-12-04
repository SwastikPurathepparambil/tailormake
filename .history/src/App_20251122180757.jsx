import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Landing from './pages/Landing';
import Tailor from './pages/Tailor';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tailor" element={<Tailor />} />
        
        <Route path="/preview-home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
