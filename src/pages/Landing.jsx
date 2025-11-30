import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

export default function Landing() {

    const navigate = useNavigate();
    const { setUser } = useAuth();
    
    return (
        <>
            <GoogleLogin
                onSuccess={async (credentials) => {
                    try {
                        const res = await fetch(`${API_URL}/auth/google`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            credentials: "include",
                            body: JSON.stringify({ token: credentials.credential }),
                        });

                        if (!res.ok) {
                            console.error("Backend /auth/google failed");
                            return;
                        }

                        const data = await res.json();
                        setUser(data.user);

                        navigate("/home");
                    } catch (err) {
                        console.error("Login error:", err);
                    }
                }}
                onError={() => console.log("Login error")}
                auto_select={true}
            />
        </>   
    )
}