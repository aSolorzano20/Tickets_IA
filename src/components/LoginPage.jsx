import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { demoCredentials } from "../demoCredentials.js";
import { Field, PageCard, StatusMessage } from "./Shared.jsx";

export function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    if (username !== demoCredentials.username || password !== demoCredentials.password) {
      navigate("/error-credenciales");
      return;
    }

    try {
      onLogin();
      navigate("/registro-examen", { replace: true });
    } catch {
      setMessage("No se pudo guardar la sesión. Habilita el almacenamiento del navegador e inténtalo de nuevo.");
    }
  }

  return (
    <PageCard>
      <h1>Iniciar sesión</h1>
      <p className="intro">Accede para continuar al registro del examen.</p>
      <form onSubmit={handleSubmit}>
        <Field label="Usuario" htmlFor="username">
          <input id="username" name="username" autoComplete="username" required />
        </Field>
        <Field label="Contraseña" htmlFor="password">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </Field>
        <StatusMessage>{message}</StatusMessage>
        <button type="submit">Entrar</button>
      </form>
      <p className="demo-note">
        Acceso de demostración: usuario <code>admin</code>, contraseña <code>admin</code>.
      </p>
    </PageCard>
  );
}

export function CredentialErrorPage() {
  return (
    <PageCard>
      <h1>Error al iniciar sesión</h1>
      <p className="intro" role="alert">
        El usuario o la contraseña son incorrectos. Verifica tus credenciales e inténtalo de nuevo.
      </p>
      <Link className="button-link" to="/crear-cuenta">
        Crear cuenta
      </Link>
    </PageCard>
  );
}
