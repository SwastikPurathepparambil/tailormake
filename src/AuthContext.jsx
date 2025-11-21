import { createContext, useContext, useState } from "react";

// Used help of LLM to write this code, specifically the <AuthContext.Provider> + {children} 
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}