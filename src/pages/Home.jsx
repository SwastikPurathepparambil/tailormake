import { useAuth } from "../AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <div>
      {user ? (
        // Add in User Functionality at the Home Page
        <>
          <p>Welcome, {user.name}</p>
        </>
      ) : (
        // Create a React Component for No User Logged In
        <p>No user logged in.</p>
      )}
    </div>
  );
}