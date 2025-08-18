import { createContext, useEffect, useState } from "react";
import { getUser } from "../api/api";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  getUser()
    .then((res) => setUser(res.data.user))
    .catch(() => setUser(null))
    .finally(() => setLoading(false));
}, []);


  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
