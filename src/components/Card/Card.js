import React from "react";
import { CardHeaderStatus } from "../CardHeaderStatus/CardHeaderStatus";
import { CardInfoItem } from "../CardInfoItem/CardInfoItem";
import { CardPhotoContainer } from "../CardPhotoContainer/CardPhotoContainer";
import { CardTitle } from "../CardTitle/CardTitle";
import { CircularPhoto } from "../CircularPhoto/CircularPhoto";
import { FavoriteButton } from "../FavoriteButton/FavoriteButton";
import "./Card.scss";

export const getHouseClass = (house = "Gryffindor") => house.toLowerCase();

export const Card = ({
  id = 0,
  name = "",
  dateOfBirth = "",
  gender = "",
  eyeColour = "",
  hairColour = "",
  image = "",
  alive = false,
  hogwartsStaff = false,
  hogwartsStudent = false,
  house = "Gryffindor",
  onClickFavorite = () => {},
  isFavorite = false
}) => {
  return (
    <div className="card-container">
      <div className="card">
        <CardPhotoContainer house={getHouseClass(house)}>
          <CircularPhoto src={image} />
        </CardPhotoContainer>
        <div className="info-container">
          <div className="header-info">
            <CardHeaderStatus alive={alive} hogwartsStudent={hogwartsStudent} />
            <FavoriteButton selected={isFavorite} onClick={() => onClickFavorite(id)} />
          </div>
          <div className="name-container">
            <CardTitle>{name}</CardTitle>
          </div>
          <div className="info-row">
            <CardInfoItem label="Cumpleaños" data={dateOfBirth} />
            <CardInfoItem label="Género" data={gender} />
            <CardInfoItem label="Color de ojos" data={eyeColour} />
            <CardInfoItem label="Color de pelo" data={hairColour} />
          </div>
        </div>
      </div>
    </div>
  );
};
