// src/pages/JobTailorPage.jsx
import React, { useState } from "react";
import "./tailor.css"

const API_URL = import.meta.env.VITE_BACKEND_URL || "/api";

export default function Tailor() {
  const [resumeName, setResumeName] = useState("Enter a Resume pdf");
  const [resumeFile, setResumeFile] = useState(null);
  const [workExperience, setWorkExperience] = useState("");
  const [jobLink, setJobLink] = useState("");

  const [status, setStatus] = useState("idle"); // "idle" | "loading" | "done" | "error"
  const [result, setResult] = useState(null);   // whatever backend returns
  const [error, setError] = useState(null);

  const handleFile = (file) => {
    if (!file) return;
    setResumeFile(file);
    setResumeName(file.name);
  };

  const onDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    handleFile(f);
  };

  // Helper: File -> base64 (without "data:...;base64," prefix)
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result; // "data:<mime>;base64,XXXX"
        const base64 = String(result).split(",")[1] ?? "";
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    // setStatus("loading");
    // setError(null);
    // setResult(null);

    // try {
    //   let resumePayload = null;

    //   if (resumeFile) {
    //     const base64 = await toBase64(resumeFile);
    //     resumePayload = {
    //       name: resumeFile.name,
    //       type: resumeFile.type || "application/pdf",
    //       base64,
    //     };
    //   }

    //   const payload = {
    //     topic: jobLink || "No topic provided",
    //     workExperience,
    //     jobLink,
    //     resume: resumePayload,
    //     submittedAt: new Date().toISOString(),
    //   };

    //   const res = await fetch(`${API_URL}/tailor`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     // Add credentials: "include" if auth cookie is needed
    //     body: JSON.stringify(payload),
    //   });

    //   if (!res.ok) {
    //     throw new Error(`Request failed with status ${res.status}`);
    //   }

    //   const data = await res.json();
    //   setResult(data); // expect your backend to return something like { tailoredResume, notes, ... }
    //   setStatus("done");
    // } catch (err) {
    //   console.error("Error submitting Tailor request:", err);
    //   setError("Something went wrong. Please try again.");
    //   setStatus("error");
    // }
  };

  const canSubmit = jobLink.trim().length > 0 && status !== "loading";

  return (
    <main className="jt-root">
      <div className="jt-center-wrapper">

        <div className="jt-form-wrapper">
          <form onSubmit={onSubmit} className="jt-form">
            <div className="jt-columns">
              {/* Resume upload */}
              <div className="jt-column jt-column-resume">
                <div className="jt-chip">Upload your resume</div>

                <div className="jt-resume-card">
                  <input
                    id="resume"
                    name="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="jt-sr-only"
                    onChange={(e) =>
                      handleFile(e.target.files?.[0] || undefined)
                    }
                  />

                  <label
                    htmlFor="resume"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={onDrop}
                    className="jt-resume-dropzone"
                  >
                    <div className="jt-resume-inner">
                      <div className="jt-icon-circle" />
                      <p className="jt-resume-name">{resumeName}</p>
                      <p className="jt-resume-helper">
                        Click to choose or drag &amp; drop
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Work experience text */}
              <div className="jt-column jt-column-work">
                <div className="jt-chip">Provide any other work experience</div>

                <div className="jt-work-card">
                  <textarea
                    name="workExperience"
                    value={workExperience}
                    onChange={(e) => setWorkExperience(e.target.value)}
                    placeholder="Work Experience"
                    className="jt-work-textarea"
                    aria-label="Work experience"
                  />
                </div>
              </div>
            </div>

            {/* Job link input */}
            <div className="jt-joblink-wrapper">
              <label htmlFor="jobLink" className="jt-sr-only">
                Job posting link
              </label>
              <input
                id="jobLink"
                type="url"
                value={jobLink}
                onChange={(e) => setJobLink(e.target.value)}
                placeholder="Add a job posting link"
                className="jt-joblink-input"
                required
              />
            </div>

            {/* Submit */}
            <div className="jt-submit-wrapper">
              <button type="submit" className="jt-submit-btn" disabled={!canSubmit}>
                {status === "loading" ? "Tailoring..." : "Submit"}
              </button>
            </div>
          </form>

          {/* Status + result area */}
          <div className="jt-status-section">
            {status === "loading" && (
              <div className="jt-status-card jt-status-loading">
                <div className="jt-spinner" />
                <p className="jt-status-text">
                  Tailoring your resume for this job. This might take up to a couple of minutes...
                </p>
              </div>
            )}

            {status === "error" && (
              <div className="jt-status-card jt-status-error">
                <p className="jt-status-text">{error}</p>
              </div>
            )}

            {status === "done" && result && (
              <div className="jt-status-card jt-status-success">
                <h2 className="jt-result-title">Tailored Output</h2>
                {/* Render whatever your backend returns. 
                    Example assumes { tailoredResume: string, notes?: string } */}
                {result.tailoredResume && (
                  <pre className="jt-result-block">{result.tailoredResume}</pre>
                )}
                {result.notes && (
                  <p className="jt-result-notes">{result.notes}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
