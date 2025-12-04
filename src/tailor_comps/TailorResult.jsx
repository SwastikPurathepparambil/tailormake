import React from "react";

export default function TailorResultScreen({ result, goHome }) {
  const hasPdf = result && result.pdfBase64;

  const handleDownload = () => {
    if (!hasPdf) return;
    const link = document.createElement("a");
    link.href = `data:application/pdf;base64,${result.pdfBase64}`;
    link.download = result.filename || "tailored_resume.pdf";
    link.click();
  };

  return (
    <div className="jt-screen jt-screen--result">
      <header className="jt-topbar">
        <button type="button" className="jt-link-btn" onClick={goHome}>
          ← Back to Home
        </button>
        <h1 className="jt-title">Your Tailored Resume</h1>
        <div className="jt-topbar-spacer" />
      </header>

      <div className="jt-result-body">
        {hasPdf ? (
          <>
            <div className="jt-result-actions">
              <button className="jt-primary-btn" onClick={handleDownload}>
                Download PDF
              </button>
              <button className="jt-secondary-btn" onClick={goHome}>
                Go to Home
              </button>
            </div>

            <div className="jt-pdf-frame-wrapper">
              <iframe
                title="Tailored Resume"
                src={`data:application/pdf;base64,${result.pdfBase64}`}
                className="jt-pdf-frame"
              />
            </div>
          </>
        ) : (
          <>
            <p className="jt-result-fallback">
              Backend is not yet returning a PDF. Here’s the raw result:
            </p>
            <pre className="jt-result-block">
              {JSON.stringify(result, null, 2)}
            </pre>
            <button className="jt-secondary-btn" onClick={goHome}>
              Go to Home
            </button>
          </>
        )}
      </div>
    </div>
  );
}