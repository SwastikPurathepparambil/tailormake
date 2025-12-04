import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaUserCircle, FaFont } from "react-icons/fa";
import "../styles/navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  

  const handleAnalyze = () => navigate("/analyze");
  const handleCreateResume = () => navigate("/tailor");
  const handleProfile = () => navigate("/profile");

  return (
    <nav className="navbar">
      <h1 className="navbar-title">TailorMake</h1>
      <div className="navbar-icons">
        <FaFont onClick={handleAnalyze} title="Analyze Resume" />
        <FaPlus onClick={handleCreateResume} title="Create New Resume" />
        <FaUserCircle onClick={handleProfile} title="Profile" />
      </div>
    </nav>
  );
}
