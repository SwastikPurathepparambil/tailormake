import React from 'react';
import { useAuth } from "../AuthContext";
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar"

export default function Home() {
    const { user, loading } = useAuth();

    if (loading) return <p>Loading...</p>;

    if (!user) return <p>No user logged in</p>;

    return (
    
        <div>
            <Navbar />
        </div>
  );
}