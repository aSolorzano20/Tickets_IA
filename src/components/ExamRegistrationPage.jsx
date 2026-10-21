import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Field, PageCard, StatusMessage } from "./Shared.jsx";

export function ExamRegistrationPage({ onSignOut }) {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    setMessage("Datos validados. Este sitio de demostración no envía ni guarda el registro.");
  }

  function returnToLogin() {
    try {
      onSignOut();
      navigate("/login", { replace: true });
    } catch {
      setMessage("No se pudo cerrar la sesión. Inténtalo de nuevo.");
    }
  }

  return (
    <PageCard>
      <h1>Registro al examen</h1>
      <p className="intro">Completa tus datos para inscribirte.</p>
      <form onSubmit={handleSubmit}>
        <Field label="Nombre" htmlFor="nombre">
          <input id="nombre" name="nombre" autoComplete="name" required />
        </Field>
        <Field label="Correo" htmlFor="correo">
          <input id="correo" name="correo" type="email" autoComplete="email" required />
        </Field>
        <Field label="Teléfono" htmlFor="telefono">
          <input id="telefono" name="telefono" type="tel" autoComplete="tel" required />
        </Field>
        <Field label="Dirección (opcional)" htmlFor="direccion">
          <textarea id="direccion" name="direccion" autoComplete="street-address" />
        </Field>
        <Field label="Edad" htmlFor="edad">
          <input id="edad" name="edad" type="number" min="0" required />
        </Field>
        <StatusMessage>{message}</StatusMessage>
        <button type="submit">Registrarme</button>
      </form>
      <button className="secondary-button" type="button" onClick={returnToLogin}>
        Volver a iniciar sesión
      </button>
    </PageCard>
  );
}
