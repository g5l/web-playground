import React from "react";

export default function SlideLayout({ title, description, code, children }) {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
        boxSizing: "border-box",
        textAlign: "center"
      }}
    >
      <h1>{title}</h1>
      <p>{description}</p>
      {code && (
        <pre>
          <code>{code}</code>
        </pre>
      )}
      <div style={{ marginTop: "40px" }}>{children}</div>
    </div>
  );
}
