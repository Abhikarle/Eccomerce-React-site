import { createContext } from "react";
import { useState, useEffect } from "react";
const AuthContext = createContext();
function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("currentUser")) || null;
  });
  useEffect(() => {
  localStorage.setItem("currentUser", JSON.stringify(user));
  }, [user]);
  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  }
  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
