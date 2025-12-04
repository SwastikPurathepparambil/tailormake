import React from "react";
import "../styles/resumecard.css";

export default function ResumeCard({ jobTitle, onClick }) {
  return (
    <div
      className="resume-card"
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.06)";
      }}
    >
      <div className="resume-thumbnail"></div>
      <h3 className="resume-title">{jobTitle}</h3>
    </div>
  );
}
