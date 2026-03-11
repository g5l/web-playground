import React from "react";

type Props = {
  name: string;
  message: string;
};

export default function HelloCard({ name, message }: Props) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "16px",
        borderRadius: "8px",
        marginTop: "10px",
      }}
    >
      <h2>Hello {name}</h2>
      <p>{message}</p>
    </div>
  );
}
