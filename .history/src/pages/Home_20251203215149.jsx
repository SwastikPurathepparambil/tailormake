import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/pages.css";
import { useAuth } from "../AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const API_URL = import.meta.env.VITE_BACKEND_URL || "/api";

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading, setUser } = useAuth();

  const [tailoredResumes, setTailoredResumes] = useState([]);
  const [listLoading, setListLoading] = useState(false);
  const [listError, setListError] = useState(null);

  //detect preview mode for no-auth tsting
  const isPreview = location.pathname === "/preview-home";

  const handleOpenPdf = (id) => {
    window.open(
      `${API_URL}/tailored-resumes/${id}/pdf`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  useEffect(() => {
    
    if (isPreview) return;

    if (!user) return;

    const fetchTailoredResumes = async () => {
      setListLoading(true);
      setListError(null);
      try {
        const res = await fetch(`${API_URL}/tailored-resumes`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          if (res.status === 401) setUser(null);
          throw new Error(`Failed to fetch tailored resumes (${res.status})`);
        }

        const data = await res.json();
        setTailoredResumes(data);
      } catch (err) {
        console.error(err);
        setListError(err.message || "Failed to load tailored resumes");
      } finally {
        setListLoading(false);
      }
    };

    fetchTailoredResumes();
  }, [user, setUser, isPreview]);

  // ⭐ In preview mode: always render page content
  if (isPreview) {
    return (
      <div className="page-container">
        <Navbar />
        <main className="page-main">
          <h2 className="main-title">Preview: Your Tailors</h2>

          <p className="empty-msg">
            (Preview mode -- no auth for testing.)
          </p>

          <div className="card-grid">
            <div className="resume-card">
              <div className="resume-thumbnail"></div>
              <h3 className="resume-title">Example Resume</h3>
              <p className="resume-filename">software-engineer.pdf</p>
              <p className="resume-created">Created: Just now</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Normal logic for logged-in users
  if (loading) return <p>Loading...</p>;
  if (!user) return <p>No user logged in</p>;

  return (
    <div className="page-container">
      <Navbar />
      <main className="page-main">
        <h2 className="main-title">Your Tailors</h2>

        {listLoading && <p>Loading your tailored resumes...</p>}
        {listError && <p className="error-msg">{listError}</p>}
        {!listLoading && tailoredResumes.length === 0 && (
          <p className="empty-msg">
            You don’t have any tailored resumes yet. Click{" "}
            <span className="link-text" onClick={() => navigate("/tailor")}>
              “Create New Resume”
            </span>{" "}
            to generate your first one.
          </p>
        )}

        <div className="card-grid">
          {tailoredResumes.map((resume) => {
            const title =
              resume.jobLink || resume.filename || "Tailored Resume";
            const created =
              resume.createdAt &&
              new Date(resume.createdAt).toLocaleString();

            return (
              <div
                key={resume.id}
                className="resume-card"
                onClick={() => handleOpenPdf(resume.id)}
              >
                <div className="resume-thumbnail"></div>
                <h3 className="resume-title" title={title}>
                  {title}
                </h3>
                {resume.filename && (
                  <p className="resume-filename">{resume.filename}</p>
                )}
                {created && (
                  <p className="resume-created">Created: {created}</p>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
