import React from "react";

export default function WorkshopResult({ result, goHome }) {
  const questions = result?.questions || [];

  return (
    <div className="jt-screen jt-screen--result">
      <header className="jt-topbar">
        <button type="button" className="jt-link-btn" onClick={goHome}>
          ← Back to Home
        </button>
        <h1 className="jt-title">Your Resume Workshop Questions</h1>
        <div className="jt-topbar-spacer" />
      </header>

      <div className="jt-result-body">
        {questions.length > 0 ? (
          <>
            <h2 className="jt-result-title">
              Use these prompts to refine your resume:
            </h2>
            <ol className="jt-result-list">
              {questions.map((q, idx) => (
                <li key={idx} className="jt-result-question">
                  <span className="jt-result-question-index">
                    {idx + 1}.
                  </span>
                  <span>{q}</span>
                </li>
              ))}
            </ol>

            {result?.context && (
              <div className="jt-result-notes">
                <strong>Workshop context:</strong>{" "}
                {result.context.resumeName && (
                  <>Resume: {result.context.resumeName}. </>
                )}
                {result.context.workshopFocus && (
                  <>Focus: {result.context.workshopFocus}. </>
                )}
                {result.context.jobLink && (
                  <>
                    Link:{" "}
                    <a
                      href={result.context.jobLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {result.context.jobLink}
                    </a>.{" "}
                  </>
                )}
                {result.context.hasExtraNotes && (
                  <>You also provided extra notes for this session.</>
                )}
              </div>
            )}

            <button className="jt-secondary-btn" onClick={goHome}>
              Done for now
            </button>
          </>
        ) : (
          <>
            <p className="jt-result-fallback">
              No questions were generated. Once the workshop agent is wired
              correctly, your personalized questions will appear here.
            </p>
            <button className="jt-secondary-btn" onClick={goHome}>
              Back to Home
            </button>
          </>
        )}
      </div>
    </div>
  );
}
