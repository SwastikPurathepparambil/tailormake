import { createContext, useContext, useState, useEffect } from "react";

// hi
// env redeploy
// Used help of LLM to write this code, specifically the <AuthContext.Provider> + {children} 

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // On first load / refresh, ask backend "who am I?"
    useEffect(() => {
        async function fetchMe() {
            try {
                const res = await fetch(`${API_URL}/auth/me`, {
                    credentials: "include", // 👈 send cookies
                });

                if (res.ok) {
                    const data = await res.json();
                    setUser(data);
                } else {
                    setUser(null);
                }
            } catch (err) {
                console.error("Error checking auth:", err);
                setUser(null);
            } finally {
                setLoading(false);
            }
        }

        fetchMe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}