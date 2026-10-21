import React from "react";

export function PageCard({ children }) {
  return <main className="glass-card">{children}</main>;
}

export function Field({ label, htmlFor, children }) {
  return (
    <div className="field">
      <label htmlFor={htmlFor}>{label}</label>
      {children}
    </div>
  );
}

export function StatusMessage({ children }) {
  return (
    <p className="message" role="status" aria-live="polite">
      {children}
    </p>
  );
}
