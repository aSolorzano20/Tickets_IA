import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ExamRegistrationPage } from "./components/ExamRegistrationPage.jsx";
import { CredentialErrorPage, LoginPage } from "./components/LoginPage.jsx";
import { SignupPage } from "./components/SignupPage.jsx";

const SESSION_KEY = "exam-demo-authenticated";

function readSession() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "true";
  } catch {
    return false;
  }
}

function App() {
  const [authenticated, setAuthenticated] = useState(readSession);

  function signIn() {
    sessionStorage.setItem(SESSION_KEY, "true");
    setAuthenticated(true);
  }

  function signOut() {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthenticated(false);
  }

  return (
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
  );
}

export default App;
