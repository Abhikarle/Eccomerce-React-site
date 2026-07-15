import { createContext } from "react";

const AuthContext = createContext();
function AuthProvider({ children}) {
  return (
    <AuthProvider value={{}}>
      {children}
    </AuthProvider>
  )
}

export { AuthContext, AuthProvider }
