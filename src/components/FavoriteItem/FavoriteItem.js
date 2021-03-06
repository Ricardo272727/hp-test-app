import React from "react";
import "./FavoriteItem.scss";
import { Button } from "../Button";
import { CircularPhoto } from "../CircularPhoto";

export const FavoriteItem = ({ onDelete, name, image }) => {
  return (
    <li className="favorite-item">
      <CircularPhoto src={image} className="small" />
      <span className="name">{name}</span>
      <Button
        id={`delete-btn-${name}`}
        title="delete-favorite-item"
        onClick={onDelete}
        className="delete-btn"
      ></Button>
    </li>
  );
};
