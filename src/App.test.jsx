import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import App from "./App.jsx";

function renderApp(initialPath) {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <App />
    </MemoryRouter>
  );
}

describe("App routing and session", () => {
  it.each(["/registro-examen", "/unknown-route"])(
    "redirects unauthenticated visits to %s to login",
    async (path) => {
      renderApp(path);

      expect(await screen.findByRole("heading", { name: "Iniciar sesión" })).toBeVisible();
    }
  );

  it("renders login at the root path", () => {
    renderApp("/");

    expect(screen.getByRole("heading", { name: "Iniciar sesión" })).toBeVisible();
  });

  it("toggles the theme and saves the preference", async () => {
    const user = userEvent.setup();
    renderApp("/login");

    const themeButton = screen.getByRole("button", { name: "Cambiar a modo oscuro" });
    expect(themeButton).toHaveAttribute("aria-pressed", "false");
    expect(themeButton.querySelector("svg")).toHaveAttribute("data-icon", "moon");

    await user.click(themeButton);

    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    expect(sessionStorage.getItem("exam-demo-theme")).toBe("dark");
    const lightModeButton = screen.getByRole("button", { name: "Cambiar a modo claro" });
    expect(lightModeButton).toHaveAttribute("aria-pressed", "true");
    expect(lightModeButton.querySelector("svg")).toHaveAttribute("data-icon", "sun");

    await user.click(screen.getByRole("button", { name: "Cambiar a modo claro" }));
    expect(document.documentElement).toHaveAttribute("data-theme", "light");
    expect(sessionStorage.getItem("exam-demo-theme")).toBe("light");
  });

  it("restores the saved theme preference", () => {
    sessionStorage.setItem("exam-demo-theme", "dark");
    renderApp("/crear-cuenta");

    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    expect(screen.getByRole("button", { name: "Cambiar a modo claro" })).toBeVisible();
  });

  it("restores an existing authenticated session", () => {
    sessionStorage.setItem("exam-demo-authenticated", "true");
    renderApp("/registro-examen");

    expect(screen.getByRole("heading", { name: "Registro al examen" })).toBeVisible();
  });

  it("fails closed when session storage cannot be read", () => {
    vi.stubGlobal("sessionStorage", {
      getItem: vi.fn(() => {
        throw new Error("Storage unavailable");
      })
    });
    renderApp("/registro-examen");

    expect(screen.getByRole("heading", { name: "Iniciar sesión" })).toBeVisible();
  });
});
