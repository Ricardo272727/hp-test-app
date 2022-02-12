import React from "react";
import "./FavoriteButton.scss";

export const FavoriteButton = ({ onClick }) => {
  return <button className="favorite-button" onClick={onClick}></button>;
};
