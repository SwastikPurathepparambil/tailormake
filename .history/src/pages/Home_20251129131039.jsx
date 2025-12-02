import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaUserCircle } from "react-icons/fa";

// Sample resumes for preview
const sampleResumes = [
  { id: 1, jobTitle: "Software Engineer at Google", previewUrl: "" },
  { id: 2, jobTitle: "UX Designer at Apple", previewUrl: "" },
  { id: 3, jobTitle: "Data Scientist at Amazon", previewUrl: "" },
  { id: 4, jobTitle: "Product Manager at Meta", previewUrl: "" },
];


export default function Home() {
  const navigate = useNavigate();

  const handle
  const handleCreateResume = () => {
    navigate("/tailor"); // change to your actual route
  };

  const handleProfile = () => {
    navigate("/profile"); // change to your actual route
  };

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
              onClick={() => navigate(`/resume/${resume.id}`)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.06)";
              }}
            >
              {/* Optional thumbnail */}
              {resume.previewUrl ? (
                <img
                  src={resume.previewUrl}
                  alt={`${resume.jobTitle} preview`}
                  style={{
                    height: "120px",
                    borderRadius: "12px",
                    marginBottom: "15px",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div
                  style={{
                    height: "120px",
                    borderRadius: "12px",
                    background: "#e2e8f0",
                    marginBottom: "15px",
                  }}
                ></div>
              )}

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
              <p style={{ fontSize: "14px", color: "#64748b" }}>
                {resume.resumeName}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
