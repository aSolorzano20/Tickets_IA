import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ExamRegistrationPage } from "./components/ExamRegistrationPage.jsx";
import { CredentialErrorPage, LoginPage } from "./components/LoginPage.jsx";
import { SignupPage } from "./components/SignupPage.jsx";

const SESSION_KEY = "exam-demo-authenticated";
const THEME_KEY = "exam-demo-theme";

function readTheme() {
  try {
    return window.sessionStorage.getItem(THEME_KEY) === "dark" ? "dark" : "light";
  } catch (error) {
    console.error("No se pudo leer la preferencia de tema.", error);
    return "light";
  }
}

function readSession() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "true";
  } catch {
    return false;
  }
}

function App() {
  const [authenticated, setAuthenticated] = useState(readSession);
  const [theme, setTheme] = useState(readTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  function toggleTheme() {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);

    try {
      window.sessionStorage.setItem(THEME_KEY, nextTheme);
    } catch (error) {
      console.error("No se pudo guardar la preferencia de tema.", error);
    }
  }

  function signIn() {
    sessionStorage.setItem(SESSION_KEY, "true");
    setAuthenticated(true);
  }

  function signOut() {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthenticated(false);
  }

  return (
    <>
      <button
        className="theme-toggle"
        type="button"
        aria-label={`Cambiar a modo ${theme === "light" ? "oscuro" : "claro"}`}
        aria-pressed={theme === "dark"}
        onClick={toggleTheme}
      >
        <svg
          aria-hidden="true"
          data-icon={theme === "light" ? "moon" : "sun"}
          focusable="false"
          viewBox="0 0 24 24"
        >
          {theme === "light" ? (
            <path d="M20.4 15.2A8.5 8.5 0 0 1 8.8 3.6 8.5 8.5 0 1 0 20.4 15.2Z" />
          ) : (
            <>
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
            </>
          )}
        </svg>
      </button>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage onLogin={signIn} />}
        />
        <Route path="/error-credenciales" element={<CredentialErrorPage />} />
        <Route path="/crear-cuenta" element={<SignupPage />} />
        <Route
          path="/registro-examen"
          element={
            authenticated ? (
              <ExamRegistrationPage onSignOut={signOut} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/"
          element={<LoginPage onLogin={signIn} />}
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;
