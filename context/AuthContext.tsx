"use client";

import { auth } from "@/firebase";
import { User, onAuthStateChanged } from "firebase/auth";
import { useContext, createContext, useState, useEffect } from "react";
const AuthContext = createContext<{ user: any } | null>(null);

function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const hehe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser!);
    });
    return () => hehe();
  }, [user]);
  // async function

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
export { AuthProvider };
