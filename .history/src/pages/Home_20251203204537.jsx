import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const isPreview = location.pathname === "/preview-home";

  // (Example user check – replace with your real logic)
  const user = localStorage.getItem("user");

  // Normal auth restriction EXCEPT in preview mode
  if (!isPreview && !user) {
    return <p>No user logged in</p>;
  }

  return (
    <div>
      <h1>Welcome to Home</h1>
      <p>This is the Home page content.</p>
    </div>
  );
}

export default Home;
