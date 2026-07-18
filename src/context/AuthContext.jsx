import { createContext } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useState, useEffect, useMemo } from "react";
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed", error);
      throw error;
    }
  }
 const isAuthenticated = !!user;
  const value = useMemo(() => ({
  user,
  setUser,
  logout,
  loading,
  isAuthenticated,
  }), [user, loading, isAuthenticated]);


  return (
    <AuthContext.Provider value={ value }>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
