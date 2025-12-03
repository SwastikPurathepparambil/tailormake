import { useState } from "react";
import "./tailor.css";
import TailorFormScreen from "./tailor_comps/TailorForm";
import TailorLoadingScreen from "./tailor_comps/TailorLoading";
import TailorResultScreen from "./tailor_comps/TailorResult";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_BACKEND_URL || "/api";

export default function JobTailorPage() {
  const [resumeName, setResumeName] = useState("Upload a resume PDF");
  const [resumeFile, setResumeFile] = useState(null);
  const [workExperience, setWorkExperience] = useState("");
  const [jobLink, setJobLink] = useState("");

  const [screen, setScreen] = useState("form"); // "form" | "loading" | "result"
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/home");
  };

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

  // File -> base64 (strip "data:...;base64," prefix)
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
        topic: jobLink || "No topic provided",
        workExperience,
        jobLink,
        resume: resumePayload,
        submittedAt: new Date().toISOString(),
      };

      const res = await fetch(`${API_URL}/tailor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);

      const data = await res.json();
      // expecting { ok: true, result: {...} }
      setResult(data.result);
      setScreen("result");
    } catch (err) {
      console.error("Error submitting Tailor request:", err);
      setError("Something went wrong. Please try again.");
      setScreen("form");
    }
  };

  const canSubmit = jobLink.trim().length > 0;

  return (
    <main className="jt-root">
      {screen === "form" && (
        <TailorFormScreen
          resumeName={resumeName}
          handleFile={handleFile}
          onDrop={onDrop}
          workExperience={workExperience}
          setWorkExperience={setWorkExperience}
          jobLink={jobLink}
          setJobLink={setJobLink}
          canSubmit={canSubmit}
          onSubmit={onSubmit}
          error={error}
          goHome={goHome}
        />
      )}

      {screen === "loading" && <TailorLoadingScreen />}

      {screen === "result" && (
        <TailorResultScreen result={result} goHome={goHome} />
      )}
    </main>
  );
}
