import React from "react";
import { useNavigate } from "react-router-dom";
import { FaFont, FaPlus, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../AuthContext";
import { googleLogout } from "@react-oauth/google";

const API_URL = import.meta.env.VITE_BACKEND_URL || "/api";

export default function Navbar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleAnalyze = () => navigate("/analyze");
  const handleCreateResume = () => navigate("/tailor");

  const handleProfile = async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (e) {
      console.error("Error calling /auth/logout", e);
    } finally {
      setUser(null);
      googleLogout();
      navigate("/", { replace: true });
    }
  };

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
