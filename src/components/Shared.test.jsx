import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Field, PageCard, StatusMessage } from "./Shared.jsx";

describe("Shared components", () => {
  it("renders page content inside the main landmark", () => {
    render(
      <PageCard>
        <h1>Contenido de prueba</h1>
      </PageCard>
    );

    expect(screen.getByRole("main")).toContainElement(
      screen.getByRole("heading", { name: "Contenido de prueba" })
    );
  });

  it("associates a field label with its control", () => {
    render(
      <Field label="Correo electrónico" htmlFor="email">
        <input id="email" type="email" />
      </Field>
    );

    expect(screen.getByRole("textbox", { name: "Correo electrónico" })).toHaveAttribute(
      "type",
      "email"
    );
  });

  it("announces status updates politely", () => {
    render(<StatusMessage>Datos guardados</StatusMessage>);

    expect(screen.getByRole("status")).toHaveAttribute("aria-live", "polite");
    expect(screen.getByRole("status")).toHaveTextContent("Datos guardados");
  });
});
