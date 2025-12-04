import React from "react";
import Navbar from "../../components/Navbar.jsx";
import "../../styles/tailor.css";

export default function TailorFormScreen({
  resumeName,
  handleFile,
  onDrop,
  workExperience,
  setWorkExperience,
  jobLink,
  setJobLink,
  canSubmit,
  onSubmit,
  error,
  goHome,
}) {
  return (
    <div className="page-container">
      <Navbar />

      <div className="page-content">
        <div className="jt-screen jt-screen--form">
          <header className="jt-topbar">
            <button type="button" className="jt-link-btn" onClick={goHome}>
              ← Back
            </button>
            <h1 className="jt-title">Tailor Your Resume</h1>
            <div className="jt-topbar-spacer" />
          </header>

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

              {/* Work experience */}
              <div className="jt-column jt-column-work">
                <div className="jt-chip">Additional Work Experience</div>

                <div className="jt-work-card">
                  <textarea
                    value={workExperience}
                    onChange={(e) => setWorkExperience(e.target.value)}
                    placeholder="Add extra details you want the model to know..."
                    className="jt-work-textarea"
                  />
                </div>
              </div>
            </div>

            {/* Job link */}
            <div className="jt-joblink-wrapper">
              <label className="jt-joblink-label">Job posting link</label>
              <input
                id="jobLink"
                type="url"
                value={jobLink}
                onChange={(e) => setJobLink(e.target.value)}
                placeholder="Paste job posting URL"
                className="jt-joblink-input"
                required
              />
            </div>

            {error && <p className="jt-error-text">{error}</p>}

            {/* Submit */}
            <div className="jt-submit-wrapper">
              <button
                type="submit"
                className="jt-submit-btn"
                disabled={!canSubmit}
              >
                Tailor Resume
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
