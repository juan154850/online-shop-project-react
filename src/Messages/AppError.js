import React from "react";
import "./AppError.css";

function AppError({ message }) {
  return (
    <div className="error-container">
      <div className="error-icon">!</div>
      <p className="error-message">{message}</p>
    </div>
  );
}

export { AppError };
