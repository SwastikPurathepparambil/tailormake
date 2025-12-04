import React from "react";

export default function TailorLoadingScreen() {
  return (
    <div className="jt-screen jt-screen--loading">
      <div className="jt-loading-inner">
        <div className="jt-spinner" />
        <h2>Tailoring your resume…</h2>
        <p>
          We’re analyzing the job posting and your experience to generate a
          tailored resume.
        </p>
      </div>
    </div>
  );
}