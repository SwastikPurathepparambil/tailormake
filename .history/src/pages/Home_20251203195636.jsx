import React, { useState } from "react";
import Navbar from "../components/Navbar";
import ResumeCard from "../components/ResumeCard";
import "../styles/pages.css";

const sampleResumes = [
  { id: 1, jobTitle: "Software Engineer at Google", fileUrl: "/resumes/google.pdf" },
  { id: 2, jobTitle: "UX Designer at Apple", fileUrl: "/resumes/apple.pdf" },
  { id: 3, jobTitle: "Data Scientist at Amazon", fileUrl: "/resumes/amazon.pdf" },
  { id: 4, jobTitle: "Product Manager at Meta", fileUrl: "/resumes/meta.pdf" },
];

export default function Home() {
  const [selectedResume, setSelectedResume] = useState(null);

  return (
    <div>
      <Navbar />
      <main style={{ padding: "40px" }}>
        <h2 className="main-title">Your Tailors</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
          }}
        >
          {sampleResumes.map((resume) => (
            <ResumeCard
              key={resume.id}
              jobTitle={resume.jobTitle}
              onClick={() => setSelectedResume(resume)}
            />
          ))}
        </div>
      </main>

      {selectedResume && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={() => setSelectedResume(null)} className="close-btn">
              ×
            </button>
            <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "20px", color: "#1e293b" }}>
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
