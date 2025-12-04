import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

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
        background: "linear-gradient(to bottom right, #0f172a, #1e293b)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "white",
          color: "#1e293b",
          padding: "40px 30px",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "420px",
          textAlign: "center",
          boxShadow: "0 6px 24px rgba(0, 0, 0, 0.15)",
        }}
      >
        <h1
          style={{
            fontSize: "36px",
            fontWeight: "800",
            marginBottom: "10px",
            color: "#0f172a",
            letterSpacing: "0.5px",
          }}
        >
          TailorMake
        </h1>

        <p
          style={{
            fontSize: "15px",
            marginBottom: "28px",
            color: "#4b5563",
            lineHeight: "1.5",
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
