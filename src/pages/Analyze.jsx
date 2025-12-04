import React, { useState } from "react";
import "../styles/tailor.css";
import Navbar from "../components/Navbar";

import { useNavigate } from "react-router-dom";
import WorkshopResult from "./workshop_comps/WorkshopResult";
import WorkshopLoading from "./workshop_comps/WorkshopLoading";
import WorkshopForm from "./workshop_comps/WorkshopForm";

const API_URL = import.meta.env.VITE_BACKEND_URL || "/api";

export default function ResumeWorkshop() {
  const [resumeName, setResumeName] = useState("Upload a resume PDF");
  const [resumeFile, setResumeFile] = useState(null);
  const [workExperience, setWorkExperience] = useState("");
  const [workshopFocus, setWorkshopFocus] = useState("");
  const [jobLink, setJobLink] = useState("");

  const [screen, setScreen] = useState("form");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const goHome = () => navigate("/home");

  const handleFile = (file) => {
    if (!file) return;
    setResumeFile(file);
    setResumeName(file.name);
  };

  const onDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    handleFile(file);
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = String(reader.result).split(",")[1] ?? "";
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    setScreen("loading");

    try {
      let resumePayload = null;

      if (resumeFile) {
        const base64 = await toBase64(resumeFile);
        resumePayload = {
          name: resumeFile.name,
          type: resumeFile.type || "application/pdf",
          base64,
        };
      }

      const payload = {
        workshopFocus,
        jobLink,
        workExperience,
        resume: resumePayload,
        submittedAt: new Date().toISOString(),
      };

      const res = await fetch(`${API_URL}/workshop`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = await res.json();
      // backend: { ok: true, result: { questions, context } }
      setResult(data.result);
      setScreen("result");
    } catch (err) {
      console.error("Workshop error:", err);
      setError("Something went wrong. Please try again.");
      setScreen("form");
    }

    // If you ever want to keep mocks for local testing, you can keep them here commented out:
    /*
    const mockQuestions = [...];
    setResult({
      questions: mockQuestions,
      context: {
        resumeName,
        workshopFocus,
        jobLink,
        hasExtraNotes: workExperience.trim().length > 0,
      },
    });
    setScreen("result");
    */
  };

  // allow submit if EITHER a focus or a link is provided
  const canSubmit =
    workshopFocus.trim().length > 0 || jobLink.trim().length > 0;

  return (
    <div className="page-container">
      <Navbar />

      <main className="tailor-container">
        {screen === "form" && (
          <WorkshopForm
            resumeName={resumeName}
            handleFile={handleFile}
            onDrop={onDrop}
            workExperience={workExperience}
            setWorkExperience={setWorkExperience}
            workshopFocus={workshopFocus}
            setWorkshopFocus={setWorkshopFocus}
            jobLink={jobLink}
            setJobLink={setJobLink}
            canSubmit={canSubmit}
            onSubmit={onSubmit}
            error={error}
            goHome={goHome}
          />
        )}

        {screen === "loading" && <WorkshopLoading />}

        {screen === "result" && (
          <WorkshopResult result={result} goHome={goHome} />
        )}
      </main>
    </div>
  );
}
