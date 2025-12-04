import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFont, FaPlus, FaUserCircle } from "react-icons/fa";

// Sample resumes for preview
const sampleResumes = [
  { id: 1, jobTitle: "Software Engineer at Google", fileUrl: "/resumes/google.pdf" },
  { id: 2, jobTitle: "UX Designer at Apple", fileUrl: "/resumes/apple.pdf" },
  { id: 3, jobTitle: "Data Scientist at Amazon", fileUrl: "/resumes/amazon.pdf" },
  { id: 4, jobTitle: "Product Manager at Meta", fileUrl: "/resumes/meta.pdf" },
];

export default function Home() {
  const navigate = useNavigate();

  const [selectedResume, setSelectedResume] = useState(null);

  const handleAnalyze = () => navigate("/analyze");
  const handleCreateResume = () => navigate("/tailor");
  const handleProfile = () => navigate("/profile");

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        minHeight: "100vh",
        background: "#f5f7fa",
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 40px",
          background: "white",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#1e293b" }}>
          TailorMake
        </h1>

        <div
          style={{
            display: "flex",
            gap: "20px",
            fontSize: "22px",
            cursor: "pointer",
            color: "#1e293b",
          }}
        >
          
          <FaPlus onClick={handleCreateResume} title="Create New Resume" />
          <FaUserCircle onClick={handleProfile} title="Profile" />
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ padding: "40px" }}>
        <h2
          style={{
            fontSize: "28px",
            fontWeight: "600",
            color: "#1e293b",
            marginBottom: "30px",
          }}
        >
          Your Tailors
        </h2>

        {/* Resume Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
          }}
        >
          {sampleResumes.map((resume) => (
            <div
              key={resume.id}
              style={{
                background: "white",
                borderRadius: "16px",
                padding: "20px",
                boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
                textAlign: "center",
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onClick={() => setSelectedResume(resume)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.06)";
              }}
            >
              <div
                style={{
                  height: "120px",
                  borderRadius: "12px",
                  background: "#e2e8f0",
                  marginBottom: "15px",
                }}
              ></div>

              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#1e293b",
                  marginBottom: "5px",
                }}
              >
                {resume.jobTitle}
              </h3>
            </div>
          ))}
        </div>
      </main>

      {/* === MODAL POPUP === */}
      {selectedResume && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 200,
          }}
        >
          <div
            style={{
              background: "white",
              width: "400px",
              padding: "30px",
              borderRadius: "16px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
              position: "relative",
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedResume(null)}
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                fontSize: "22px",
                fontWeight: "700",
                border: "none",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              ×
            </button>

            <h3
              style={{
                fontSize: "20px",
                fontWeight: "700",
                marginBottom: "20px",
                color: "#1e293b",
              }}
            >
              {selectedResume.jobTitle}
            </h3>

            <a
              href={selectedResume.fileUrl}
              download
              style={{
                display: "inline-block",
                padding: "12px 18px",
                background: "#1e293b",
                color: "white",
                borderRadius: "10px",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Download Resume
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
