import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

export default function Landing() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleGoogleSuccess = (credentials) => {
    const userInfo = jwtDecode(credentials.credential);
    setUser(userInfo);
    navigate("/home");
  };

  const handleGoogleError = () => {
    console.log("Log in Error");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "50px 40px",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "450px",
          textAlign: "center",
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.06)",
        }}
      >
        <h1
          style={{
            fontSize: "34px",
            fontWeight: "700",
            marginBottom: "12px",
            color: "#1e293b",
          }}
        >
          TailorMake
        </h1>

        <p
          style={{
            fontSize: "15px",
            marginBottom: "30px",
            color: "#475569",
            lineHeight: "1.6",
          }}
        >
          Welcome to TailorMake! Your perfect job is just a button away.
          <br />
          Sign in or sign up to continue.
        </p>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
          />
        </div>
      </div>
    </div>
  );
}
