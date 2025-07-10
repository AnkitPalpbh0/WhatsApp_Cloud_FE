import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import {
  AuthContext,
  type AuthContextType,
  type UserType,
} from "./AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );
  const [user, setUser] = useState<UserType | null>(() => {
    const savedToken = localStorage.getItem("token");
    const savedUserId = localStorage.getItem("userId");
    if (savedToken && savedUserId) {
      try {
        const decoded = jwtDecode<{ email: string }>(savedToken);
        return {
          email: decoded.email,
          userId: savedUserId,
        };
      } catch {
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode<{ email: string }>(token);
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId) {
          setUser({ email: decoded.email, userId: storedUserId });
        } else {
          logout();
        }
      } catch {
        logout();
      }
    }
  }, [token]);

  const login = (newToken: string, userId: string) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("userId", userId);
    const decoded = jwtDecode<{ email: string }>(newToken);
    setToken(newToken);
    setUser({
      email: decoded.email,
      userId,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setToken(null);
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
