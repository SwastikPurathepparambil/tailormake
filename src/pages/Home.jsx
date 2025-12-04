import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFont, FaPlus, FaUserCircle } from "react-icons/fa";
import { TbHexagonLetterA } from "react-icons/tb";
import { useAuth } from "../AuthContext";
import { googleLogout } from "@react-oauth/google";

const API_URL = import.meta.env.VITE_BACKEND_URL || "/api";

// Sample resumes for preview
const sampleResumes = [
  { id: 1, jobTitle: "Software Engineer at Google", previewUrl: "" },
  { id: 2, jobTitle: "UX Designer at Apple", previewUrl: "" },
  { id: 3, jobTitle: "Data Scientist at Amazon", previewUrl: "" },
  { id: 4, jobTitle: "Product Manager at Meta", previewUrl: "" },
];


export default function Home() {

    const { user, loading, setUser } = useAuth();
    const navigate = useNavigate();

    const [tailoredResumes, setTailoredResumes] = useState([]);
    const [listLoading, setListLoading] = useState(false);
    const [listError, setListError] = useState(null);

    const handleAnalyze = () => {
        navigate("/analyze"); // change to your actual route
    };
    const handleCreateResume = () => {
        navigate("/tailor"); // change to your actual route
    };

    const handleProfile = async () => {
        // navigate("/profile"); // change to your actual route
        // here we want to handle a logout
        // should probably change the icon too
        try {
            await fetch(`${API_URL}/auth/logout`, {
                method: "POST",
                credentials: "include", // send the cookie so backend can delete it
            });
        } catch (e) {
            console.error("Error calling /auth/logout", e);
        } finally {
            // Clear frontend state no matter what
            setUser(null);
            googleLogout();           // clear Google session
            navigate("/", { replace: true });
        }
    };

    const handleOpenPdf = (id) => {
        // Opens the PDF endpoint in a new tab
        window.open(
        `${API_URL}/tailored-resumes/${id}/pdf`,
        "_blank",
        "noopener,noreferrer"
        );
    };

    useEffect(() => {
        if (!user) return;

        const fetchTailoredResumes = async () => {
        setListLoading(true);
        setListError(null);
        try {
            const res = await fetch(`${API_URL}/tailored-resumes`, {
            method: "GET",
            credentials: "include", // send cookie for auth
            });

            if (!res.ok) {
            if (res.status === 401) {
                // auth expired → kick back to login
                setUser(null);
            }
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


    // Need to add in some UI for no user logged in here
    if (!user) return <p>No user logged in</p>;

    return (
        <div
        style={{
            fontFamily: "'Inter', sans-serif",
            minHeight: "100vh",
            background: "#f5f7fa",
        }}
        >
        {/* Navbar */}
        <nav
            style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 40px",
            background: "white",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            position: "sticky",
            top: 0,
            zIndex: 100,
            }}
        >
            <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#1e293b" }}>
            TailorMake
            </h1>
            <div
            style={{
                display: "flex",
                gap: "20px",
                fontSize: "22px",
                cursor: "pointer",
                color: "#1e293b",
            }}
            >
            

            <FaFont onClick={handleAnalyze} title="Analyze Resume" />
            <FaPlus onClick={handleCreateResume} title="Create New Resume" />
            <FaUserCircle onClick={handleProfile} title="Profile" />
            </div>
        </nav>

        {/* Main Content */}
        <main style={{ padding: "40px" }}>
            <h2
            style={{
                fontSize: "28px",
                fontWeight: "600",
                color: "#1e293b",
                marginBottom: "20px",
            }}
            >
            Your Tailors
            </h2>

            {listLoading && <p>Loading your tailored resumes...</p>}
            {listError && (
                <p style={{ color: "red", marginBottom: "10px" }}>{listError}</p>
            )}

            {!listLoading && tailoredResumes.length === 0 && (
                <p style={{ color: "#64748b" }}>
                    You don’t have any tailored resumes yet. Click{" "}
                    <span
                    onClick={handleCreateResume}
                    style={{ color: "#2563eb", cursor: "pointer", fontWeight: 500 }}
                    >
                    “Create New Resume”
                    </span>{" "}
                    to generate your first one.
                </p>
            )}

            {/* Resume Cards Grid */}
            <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "20px",
                marginTop: "20px",
            }}
            >
            {tailoredResumes.map((resume) => {
                const title =
                resume.jobLink || resume.filename || "Tailored Resume";

                const created =
                resume.createdAt &&
                new Date(resume.createdAt).toLocaleString();

                return (
                <div
                    key={resume.id}
                    style={{
                    background: "white",
                    borderRadius: "16px",
                    padding: "20px",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    }}
                    onClick={() => handleOpenPdf(resume.id)}
                    onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow =
                        "0 12px 30px rgba(0,0,0,0.1)";
                    }}
                    onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                        "0 6px 20px rgba(0,0,0,0.06)";
                    }}
                >
                    {/* Placeholder thumbnail */}
                    <div
                    style={{
                        height: "120px",
                        borderRadius: "12px",
                        background:
                        "repeating-linear-gradient(45deg,#e2e8f0,#e2e8f0 10px,#cbd5f5 10px,#cbd5f5 20px)",
                        marginBottom: "15px",
                    }}
                    ></div>

                    <h3
                    style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#1e293b",
                        marginBottom: "6px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                    }}
                    title={title}
                    >
                    {title}
                    </h3>

                    {resume.filename && (
                    <p
                        style={{
                        fontSize: "13px",
                        color: "#64748b",
                        marginBottom: "4px",
                        }}
                    >
                        {resume.filename}
                    </p>
                    )}

                    {created && (
                    <p
                        style={{
                        fontSize: "12px",
                        color: "#94a3b8",
                        }}
                    >
                        Created: {created}
                    </p>
                    )}
                </div>
                );
            })}
            </div>
        </main>        
      </div>
        
  );
}
