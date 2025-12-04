import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaUserCircle, FaFont } from "react-icons/fa";

export default function Tailor() {
  const navigate = useNavigate();
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [tailoredResume, setTailoredResume] = useState(null);

  const handleAnalyze = () => navigate("/analyze");
  const handleCreateResume = () => navigate("/tailor");
  const handleProfile = () => navigate("/profile");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder: simulate generating tailored resume
    setTailoredResume({
      fileName: resumeFile ? resumeFile.name : "YourResume.pdf",
      message: "Tailored resume ready! (placeholder)",
    });
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
          {/* <FaFont onClick={handleAnalyze} title="Analyze Resume" /> */}
          <FaPlus onClick={handleCreateResume} title="Create New Resume" />
          <FaUserCircle onClick={handleProfile} title="Profile" />
        </div>
      </nav>

      <main style={{ padding: "40px" }}>
        <h2
          style={{
            fontSize: "28px",
            fontWeight: "600",
            color: "#1e293b",
            marginBottom: "30px",
          }}
        >
          Tailor Your Resume
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxWidth: "600px",
          }}
        >
          {/* Upload Resume */}
          <div
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "20px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
              textAlign: "center",
            }}
          >
            <label
              htmlFor="resumeUpload"
              style={{
                display: "block",
                fontWeight: "600",
                marginBottom: "10px",
                color: "#1e293b",
              }}
            >
              Upload Your Resume
            </label>
            <input
              id="resumeUpload"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setResumeFile(e.target.files[0])}
              style={{ cursor: "pointer" }}
            />
            {resumeFile && <p style={{ marginTop: "10px" }}>{resumeFile.name}</p>}
          </div>

          {/* Job Description */}
          <div
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "20px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
            }}
          >
            <label
              htmlFor="jobDescription"
              style={{
                display: "block",
                fontWeight: "600",
                marginBottom: "10px",
                color: "#1e293b",
              }}
            >
              Paste Job Description
            </label>
            <textarea
              id="jobDescription"
              rows={6}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "12px",
                border: "1px solid #cbd5e1",
                fontFamily: "'Inter', sans-serif",
                resize: "vertical",
              }}
              placeholder="Paste the job description here..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              padding: "12px 18px",
              background: "#1e293b",
              color: "white",
              borderRadius: "10px",
              border: "none",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Generate Tailored Resume
          </button>
        </form>

        {/* Tailored Resume Placeholder */}
        {tailoredResume && (
          <div
            style={{
              marginTop: "40px",
              background: "white",
              borderRadius: "16px",
              padding: "20px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#1e293b",
                marginBottom: "10px",
              }}
            >
              {tailoredResume.message}
            </h3>
            <a
              href="#"
              download={tailoredResume.fileName}
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
              Download Tailored Resume
            </a>
          </div>
        )}
      </main>
    </div>
  );
}
