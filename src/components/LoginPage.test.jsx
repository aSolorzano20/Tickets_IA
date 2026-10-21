import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { demoCredentials } from "../demoCredentials.js";
import App from "../App.jsx";

function renderApp(initialPath = "/login") {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <App />
    </MemoryRouter>
  );
}

describe("LoginPage", () => {
  it("requires a username and password before submitting", async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByRole("button", { name: "Entrar" }));

    expect(screen.getByRole("textbox", { name: "Usuario" }).validity.valueMissing).toBe(true);
    expect(screen.getByLabelText("Contraseña").validity.valueMissing).toBe(true);
    expect(screen.getByRole("heading", { name: "Iniciar sesión" })).toBeVisible();
  });

  it("authenticates with the demo credentials and opens exam registration", async () => {
    const user = userEvent.setup();
    renderApp();

    await user.type(screen.getByRole("textbox", { name: "Usuario" }), "admin");
    await user.type(screen.getByLabelText("Contraseña"), "admin");
    await user.click(screen.getByRole("button", { name: "Entrar" }));

    expect(await screen.findByRole("heading", { name: "Registro al examen" })).toBeVisible();
    expect(sessionStorage.getItem("exam-demo-authenticated")).toBe("true");
  });

  it.each([
    ["usuario incorrecto", "wrong", "admin"],
    ["contraseña incorrecta", "admin", "wrong"]
  ])("navigates to the credential error for %s", async (_caseName, username, password) => {
    const user = userEvent.setup();
    renderApp();

    await user.type(screen.getByRole("textbox", { name: "Usuario" }), username);
    await user.type(screen.getByLabelText("Contraseña"), password);
    await user.click(screen.getByRole("button", { name: "Entrar" }));

    expect(
      await screen.findByRole("heading", { name: "Error al iniciar sesión" })
    ).toBeVisible();
  });

  it("shows a storage error if signing in cannot persist the session", async () => {
    const user = userEvent.setup();
    vi.stubGlobal("sessionStorage", {
      getItem: vi.fn(() => null),
      setItem: vi.fn(() => {
        throw new Error("Storage unavailable");
      })
    });
    renderApp();

    await user.type(screen.getByRole("textbox", { name: "Usuario" }), "admin");
    await user.type(screen.getByLabelText("Contraseña"), "admin");
    await user.click(screen.getByRole("button", { name: "Entrar" }));

    expect(await screen.findByRole("status")).toHaveTextContent(
      "No se pudo guardar la sesión. Habilita el almacenamiento del navegador e inténtalo de nuevo."
    );
    expect(screen.getByRole("heading", { name: "Iniciar sesión" })).toBeVisible();
  });

  it("marks the demo credential object as immutable", () => {
    expect(demoCredentials).toEqual({ username: "admin", password: "admin" });
    expect(Object.isFrozen(demoCredentials)).toBe(true);
  });
});

describe("CredentialErrorPage", () => {
  it("offers navigation to account creation", async () => {
    const user = userEvent.setup();
    renderApp("/error-credenciales");

    expect(screen.getByRole("alert")).toHaveTextContent("El usuario o la contraseña son incorrectos.");
    await user.click(screen.getByRole("link", { name: "Crear cuenta" }));
    expect(await screen.findByRole("heading", { name: "Crear cuenta" })).toBeVisible();
  });
});
