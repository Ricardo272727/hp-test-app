import React from "react";
import "./FavoriteButton.scss";

export const FavoriteButton = ({ selected, onClick }) => {
  return (
    <button
      className={`favorite-button ${selected ? "selected" : ""}`}
      onClick={onClick}
    ></button>
  );
};
