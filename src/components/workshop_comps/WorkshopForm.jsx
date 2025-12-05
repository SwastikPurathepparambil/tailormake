import React from "react";

export default function WorkshopForm({
  resumeName,
  handleFile,
  onDrop,
  workExperience,
  setWorkExperience,
  workshopFocus,
  setWorkshopFocus,
  jobLink,
  setJobLink,
  canSubmit,
  onSubmit,
  error,
  goHome,
}) {
  return (
    <div className="jt-screen jt-screen--form">
      <header className="jt-topbar">
        <button type="button" className="jt-link-btn" onClick={goHome}>
          ← Back to Home
        </button>
        <h1 className="jt-title">Resume Workshop</h1>
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

          {/* Extra context */}
          <div className="jt-column jt-column-work">
            <div className="jt-chip">Add any extra context</div>

            <div className="jt-work-card">
              <textarea
                name="workExperience"
                value={workExperience}
                onChange={(e) => setWorkExperience(e.target.value)}
                placeholder="Add details about your goals, concerns, or anything you want feedback on..."
                className="jt-work-textarea"
                aria-label="Extra context for the workshop"
              />
            </div>
          </div>
        </div>

        {/* Workshop focus */}
        <div className="jt-joblink-wrapper">
          <label htmlFor="workshopFocus" className="jt-joblink-label">
            Workshop focus
          </label>
          <input
            id="workshopFocus"
            type="text"
            value={workshopFocus}
            onChange={(e) => setWorkshopFocus(e.target.value)}
            placeholder='e.g. "Software engineering internships" or "Data analyst roles in fintech"'
            className="jt-joblink-input"
          />
        </div>

        {/* Job / role link */}
        <div className="jt-joblink-wrapper">
          <label htmlFor="jobLink" className="jt-joblink-label">
            Job / role link (optional)
          </label>
          <input
            id="jobLink"
            type="url"
            value={jobLink}
            onChange={(e) => setJobLink(e.target.value)}
            placeholder="Paste a job posting or example role URL"
            className="jt-joblink-input"
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
            Start Workshop
          </button>
        </div>
      </form>
    </div>
  );
}
