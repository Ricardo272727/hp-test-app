import React from "react";
import "./Button.scss";

export const Button = ({ id, title, className, onClick, children }) => {
  return (
    <button
      id={id}
      className={`btn ${className}`}
      title={title}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
