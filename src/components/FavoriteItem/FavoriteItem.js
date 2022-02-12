import React from "react";
import "./FavoriteItem.scss";
import { Button } from "../Button";
import { CircularPhoto } from "../CircularPhoto";

export const FavoriteItem = ({ onDelete, name, image }) => {
  return (
    <li className="favorite-item">
      <CircularPhoto src={image} />
      <span className="name">{name}</span>
      <Button onClick={onDelete}></Button>
    </li>
  );
};
