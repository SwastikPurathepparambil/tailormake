import React from "react";

export default function WorkshopLoading() {
  return (
    <div className="jt-screen jt-screen--loading">
      <div className="jt-loading-inner">
        <div className="jt-spinner" />
        <h2>Setting up your resume workshop…</h2>
        <p>
          We’re reviewing your inputs so we can guide you with targeted
          reflection questions.
        </p>
      </div>
    </div>
  );
}
