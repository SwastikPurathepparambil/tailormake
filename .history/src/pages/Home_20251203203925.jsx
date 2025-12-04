import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/pages.css"; // reuse general page styling
import { useAuth } from "../AuthContext";


const API_URL = import.meta.env.VITE_BACKEND_URL || "/api";

export default function Home() {
  
  const { user, loading, setUser } = useAuth();
  const [tailoredResumes, setTailoredResumes] = useState([]);
  const [listLoading, setListLoading] = useState(false);
  const [listError, setListError] = useState(null);

  const handleOpenPdf = (id) => {
    window.open(`${API_URL}/tailored-resumes/${id}/pdf`, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
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
  }, [user, setUser]);

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
            const title = resume.jobLink || resume.filename || "Tailored Resume";
            const created = resume.createdAt && new Date(resume.createdAt).toLocaleString();

            return (
              <div
                key={resume.id}
                className="resume-card"
                onClick={() => handleOpenPdf(resume.id)}
              >
                <div className="resume-thumbnail"></div>
                <h3 className="resume-title" title={title}>{title}</h3>
                {resume.filename && <p className="resume-filename">{resume.filename}</p>}
                {created && <p className="resume-created">Created: {created}</p>}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
