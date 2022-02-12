import React from "react";
import "./FixedButton.scss";

export const FixedButton = ({ onClick, children }) => {
  return (
    <button className="fixed-button" onClick={onClick}>
      {children}
    </button>
  );
};
