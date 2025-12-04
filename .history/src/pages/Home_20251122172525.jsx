import React from 'react';
import { useAuth } from "../AuthContext";
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar"

export default function Home() {
  const { user } = useAuth();

  return (
    <div>
      {user ? (
        // Add in User Functionality at the Home Page
        <>
          <div>
            <Navbar>
            </Navbar>
            

          </div>
        </>
      ) : (
        // Create a React Component for No User Logged In
        <>
            <p>No user logged in.</p>
        </>
      )}
    </div>
  );
}