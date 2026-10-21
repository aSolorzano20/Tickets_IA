import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Field, PageCard, StatusMessage } from "./Shared.jsx";

export function SignupPage() {
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const confirmInput = form.elements.confirmPassword;

    if (password !== confirmation) {
      confirmInput.setCustomValidity("Las contraseñas no coinciden.");
      form.reportValidity();
      return;
    }

    confirmInput.setCustomValidity("");
    setMessage("Los datos son válidos, pero esta demostración no guarda ni registra cuentas.");
  }

  function updatePassword(event) {
    const nextPassword = event.target.value;
    setPassword(nextPassword);
    event.currentTarget.form.elements.confirmPassword.setCustomValidity(
      confirmation && confirmation !== nextPassword ? "Las contraseñas no coinciden." : ""
    );
  }

  function updateConfirmation(event) {
    const nextConfirmation = event.target.value;
    setConfirmation(nextConfirmation);
    event.target.setCustomValidity(
      nextConfirmation && nextConfirmation !== password ? "Las contraseñas no coinciden." : ""
    );
  }

  return (
    <PageCard>
      <h1>Crear cuenta</h1>
      <p className="intro">Completa tus datos para solicitar una cuenta.</p>
      <form onSubmit={handleSubmit}>
        <Field label="Nombre completo" htmlFor="full-name">
          <input id="full-name" name="fullName" autoComplete="name" required />
        </Field>
        <Field label="Correo electrónico" htmlFor="email">
          <input id="email" name="email" type="email" autoComplete="email" required />
        </Field>
        <Field label="Usuario" htmlFor="signup-username">
          <input
            id="signup-username"
            name="username"
            autoComplete="username"
            minLength={3}
            required
          />
        </Field>
        <Field label="Contraseña (mínimo 8 caracteres)" htmlFor="signup-password">
          <input
            id="signup-password"
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={8}
            onChange={updatePassword}
            required
          />
        </Field>
        <Field label="Confirmar contraseña" htmlFor="confirm-password">
          <input
            id="confirm-password"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            minLength={8}
            onChange={updateConfirmation}
            required
          />
        </Field>
        <StatusMessage>{message}</StatusMessage>
        <button type="submit">Crear cuenta</button>
      </form>
      <p className="demo-note">Este formulario es una demostración: no guarda ni registra cuentas.</p>
      <button className="secondary-button" type="button" onClick={() => navigate("/login")}>
        Volver al inicio de sesión
      </button>
    </PageCard>
  );
}
