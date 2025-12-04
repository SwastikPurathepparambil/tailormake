import React, { useState } from "react";
import Navbar from "../components/Navbar"; // import reusable navbar
import "../styles/pages.css";

export default function Tailor() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [tailoredResume, setTailoredResume] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTailoredResume({
      fileName: resumeFile ? resumeFile.name : "YourResume.pdf",
      message: "Tailored resume ready! (placeholder)",
    });
  };

  return (
    <div>
      {/* Reusable navbar */}
      <Navbar />

      <main style={{ padding: "40px" }}>
        <h2 className="main-title">Tailor Your Resume</h2>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxWidth: "600px",
          }}
        >
          {/* Resume Upload */}
          <div className="form-card">
            <label htmlFor="resumeUpload" className="form-label">
              Upload Your Resume
            </label>
            <input
              id="resumeUpload"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) =>
                setResumeFile(e.target.files ? e.target.files[0] : null)
              }
              style={{ cursor: "pointer" }}
            />
            {resumeFile && <p style={{ marginTop: "10px" }}>{resumeFile.name}</p>}
          </div>

          {/* Job Description Input */}
          <div className="form-card">
            <label htmlFor="jobDescription" className="form-label">
              Paste Job Description
            </label>
            <textarea
              id="jobDescription"
              rows={6}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="form-textarea"
              placeholder="Paste the job description here..."
            />
          </div>

          <button type="submit" className="submit-btn">
            Generate Tailored Resume
          </button>
        </form>

        {/* Placeholder for tailored resume */}
        {tailoredResume && (
          <div className="form-card" style={{ marginTop: "40px", textAlign: "center" }}>
            <h3 className="tailored-message">{tailoredResume.message}</h3>
            <a
              href="#"
              download={tailoredResume.fileName}
              className="submit-btn"
              style={{ textDecoration: "none" }}
            >
              Download Tailored Resume
            </a>
          </div>
        )}
      </main>
    </div>
  );
}
