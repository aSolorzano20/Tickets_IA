import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import App from "../App.jsx";

function renderApp(initialPath = "/crear-cuenta") {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <App />
    </MemoryRouter>
  );
}

async function fillSignupForm(user, { password = "secure-pass", confirmation = password } = {}) {
  await user.type(screen.getByRole("textbox", { name: "Nombre completo" }), "Ada Lovelace");
  await user.type(screen.getByRole("textbox", { name: "Correo electrónico" }), "ada@example.com");
  await user.type(screen.getByRole("textbox", { name: "Usuario" }), "ada");
  await user.type(screen.getByLabelText("Contraseña (mínimo 8 caracteres)"), password);
  await user.type(screen.getByLabelText("Confirmar contraseña"), confirmation);
}

describe("SignupPage", () => {
  it("rejects malformed email and exposes username and password minimum lengths", async () => {
    const user = userEvent.setup();
    renderApp();
    const emailInput = screen.getByRole("textbox", { name: "Correo electrónico" });
    const usernameInput = screen.getByRole("textbox", { name: "Usuario" });
    const passwordInput = screen.getByLabelText("Contraseña (mínimo 8 caracteres)");

    await user.type(emailInput, "not-an-email");
    await user.type(usernameInput, "ab");
    await user.type(passwordInput, "short");

    expect(emailInput.validity.typeMismatch).toBe(true);
    expect(usernameInput).toHaveAttribute("minlength", "3");
    expect(usernameInput).toHaveValue("ab");
    expect(passwordInput).toHaveAttribute("minlength", "8");
    expect(passwordInput).toHaveValue("short");
  });

  it("validates matching passwords and explains that the demo does not create accounts", async () => {
    const user = userEvent.setup();
    renderApp();

    await fillSignupForm(user);
    await user.click(screen.getByRole("button", { name: "Crear cuenta" }));

    expect(await screen.findByRole("status")).toHaveTextContent(
      "Los datos son válidos, pero esta demostración no guarda ni registra cuentas."
    );
  });

  it("keeps the confirmation validity synchronized when either password changes", async () => {
    const user = userEvent.setup();
    renderApp();
    const passwordInput = screen.getByLabelText("Contraseña (mínimo 8 caracteres)");
    const confirmationInput = screen.getByLabelText("Confirmar contraseña");

    await user.type(passwordInput, "secure-pass");
    expect(confirmationInput.validity.customError).toBe(false);

    await user.type(confirmationInput, "different-pass");
    expect(confirmationInput).toBeInvalid();
    expect(confirmationInput).toHaveAttribute("minLength", "8");

    await user.clear(passwordInput);
    await user.type(passwordInput, "different-pass");
    expect(confirmationInput).toBeValid();

    await user.clear(passwordInput);
    await user.type(passwordInput, "another-pass");
    expect(confirmationInput).toBeInvalid();

    await user.clear(confirmationInput);
    expect(confirmationInput.validity.customError).toBe(false);
  });

  it("does not accept mismatched passwords", async () => {
    const user = userEvent.setup();
    renderApp();
    await fillSignupForm(user, { password: "secure-pass", confirmation: "different-pass" });
    const form = screen.getByRole("button", { name: "Crear cuenta" }).closest("form");

    fireEvent.submit(form);

    expect(screen.getByLabelText("Confirmar contraseña")).toBeInvalid();
    expect(screen.getByRole("status")).toBeEmptyDOMElement();
  });

  it("returns to the login page", async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByRole("button", { name: "Volver al inicio de sesión" }));

    expect(await screen.findByRole("heading", { name: "Iniciar sesión" })).toBeVisible();
  });
});
