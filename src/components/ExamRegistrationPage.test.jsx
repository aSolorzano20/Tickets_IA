import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import App from "../App.jsx";

function renderRegistration() {
  sessionStorage.setItem("exam-demo-authenticated", "true");
  return render(
    <MemoryRouter initialEntries={["/registro-examen"]}>
      <App />
    </MemoryRouter>
  );
}

async function fillRegistrationForm(user, { includeAddress = true } = {}) {
  await user.type(screen.getByRole("textbox", { name: "Nombre" }), "Ada Lovelace");
  await user.type(screen.getByRole("textbox", { name: "Correo" }), "ada@example.com");
  await user.type(screen.getByRole("textbox", { name: "Teléfono" }), "5551234567");
  if (includeAddress) {
    await user.type(screen.getByRole("textbox", { name: "Dirección (opcional)" }), "Calle 1");
  }
  await user.type(screen.getByRole("spinbutton", { name: "Edad" }), "36");
}

describe("ExamRegistrationPage", () => {
  it("requires contact information and rejects ages below zero", async () => {
    const user = userEvent.setup();
    renderRegistration();

    expect(screen.getByRole("textbox", { name: "Nombre" }).validity.valueMissing).toBe(true);
    await user.type(screen.getByRole("spinbutton", { name: "Edad" }), "-1");
    expect(screen.getByRole("spinbutton", { name: "Edad" }).validity.rangeUnderflow).toBe(true);
  });

  it("validates and displays the demo registration message", async () => {
    const user = userEvent.setup();
    renderRegistration();

    await fillRegistrationForm(user);
    await user.click(screen.getByRole("button", { name: "Registrarme" }));

    expect(await screen.findByRole("status")).toHaveTextContent(
      "Datos validados. Este sitio de demostración no envía ni guarda el registro."
    );
    expect(screen.getByRole("spinbutton", { name: "Edad" })).toHaveAttribute("min", "0");
  });

  it("accepts age zero and an empty optional address", async () => {
    const user = userEvent.setup();
    renderRegistration();
    await fillRegistrationForm(user, { includeAddress: false });
    await user.clear(screen.getByRole("spinbutton", { name: "Edad" }));
    await user.type(screen.getByRole("spinbutton", { name: "Edad" }), "0");

    await user.click(screen.getByRole("button", { name: "Registrarme" }));

    expect(await screen.findByRole("status")).toHaveTextContent("Datos validados.");
  });

  it("signs out and returns to login", async () => {
    const user = userEvent.setup();
    renderRegistration();

    await user.click(screen.getByRole("button", { name: "Volver a iniciar sesión" }));

    expect(await screen.findByRole("heading", { name: "Iniciar sesión" })).toBeVisible();
    expect(sessionStorage.getItem("exam-demo-authenticated")).toBeNull();
  });

  it("shows an error and stays on the registration page when sign-out fails", async () => {
    const user = userEvent.setup();
    vi.stubGlobal("sessionStorage", {
      getItem: vi.fn(() => "true"),
      removeItem: vi.fn(() => {
        throw new Error("Storage unavailable");
      })
    });
    render(
      <MemoryRouter initialEntries={["/registro-examen"]}>
        <App />
      </MemoryRouter>
    );

    await user.click(screen.getByRole("button", { name: "Volver a iniciar sesión" }));

    expect(await screen.findByRole("status")).toHaveTextContent(
      "No se pudo cerrar la sesión. Inténtalo de nuevo."
    );
    expect(screen.getByRole("heading", { name: "Registro al examen" })).toBeVisible();
  });
});
