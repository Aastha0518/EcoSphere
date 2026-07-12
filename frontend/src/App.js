import './App.css';
import { LoginScreen, FontImport } from './pages/LoginScreen';
import { Dashboard } from './pages/Dashboard';
import React, { useState } from "react";

const USERNAME_KEY = "username";
const TOKEN_KEY = "token";
const ROLE_KEY = "role";
const LOGIN_FLAG_KEY = "isLoggedInFlag";
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function App() {
  const [user, setUser] = useState(() => {
    const isLoggedIn = localStorage.getItem(LOGIN_FLAG_KEY) === "true";
    return isLoggedIn ? localStorage.getItem(USERNAME_KEY) : null;
  });
  const [role, setRole] = useState(() => {
    const isLoggedIn = localStorage.getItem(LOGIN_FLAG_KEY) === "true";
    return isLoggedIn ? localStorage.getItem(ROLE_KEY) : null;
  });

  const handleLogin = ({ username, token, role }) => {
    localStorage.setItem(USERNAME_KEY, username);
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(ROLE_KEY, role);
    localStorage.setItem(LOGIN_FLAG_KEY, "true");
    setUser(username);
    setRole(role);
  };

  const clearSession = () => {
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem(LOGIN_FLAG_KEY);
    setUser(null);
    setRole(null);
  };

  const handleLogout = async () => {
    const token = localStorage.getItem(TOKEN_KEY);

    try {
      if (token) {
        await fetch(`${API_BASE_URL}/api/auth/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (err) {
      console.warn("Logout API failed:", err);
    } finally {
      clearSession();
    }
  };

  if (!user) {
    return (
      <>
        <FontImport />
        <LoginScreen onLogin={handleLogin} />
      </>
    );
  }

  return <Dashboard user={user} role={role} onLogout={handleLogout} />;
}

