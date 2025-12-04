import React from "react";
import { FaPen, FaPlus, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "../styles/navbar.css";
import { googleLogout } from "@react-oauth/google";

const API_URL = import.meta.env.VITE_BACKEND_URL || "/api";

export default function Navbar() {
  const navigate = useNavigate();
  const {  setUser } = useAuth();

  const handleAnalyze = () => navigate("/analyze");
  const handleCreateResume = () => navigate("/tailor");

  const handleProfile = async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (e) {
      console.error("logout error", e);
    } finally {
      googleLogout();
      setUser(null);
      navigate("/", { replace: true });
    }
  };

  return (
    <nav className="navbar-container">
      <h1 className="navbar-logo">TailorMake</h1>

      <div className="navbar-icons">
        <FaPen onClick={handleAnalyze} title="Analyze Resume" />
        <FaPlus onClick={handleCreateResume} title="Create New Resume" />
        <FaUserCircle onClick={handleProfile} title="Profile / Logout" />
      </div>
    </nav>
  );
}
