import React, { useState } from "react";
import "./FixedMenu.scss";
import { FixedButton } from "../FixedButton/FixedButton";
import { Icon } from "../Icon/Icon";
import { FavoriteItem } from "../FavoriteItem/FavoriteItem";

const FixedMenu = ({
  onClickAdd,
  favorites = [],
  onDeleteFavorite,
}) => {
  const [openFavorites, setOpenFavorites] = useState(false);
  const toggleFavorites = () => setOpenFavorites(!openFavorites);

  return (
    <div className="fixed-menu">
      <div className="df center-x center-y">
        <FixedButton className="favorite-fixed-btn" onClick={toggleFavorites}>
          <span>Favoritos</span>{" "}
          <Icon src="assets/favorite-icon.png" alt="Favoritos" />
        </FixedButton>
        <FixedButton className="add-fixed-btn" onClickAdd={onClickAdd}>
          <span>Agregar</span>{" "}
          <Icon src="assets/User_fill_add.png" alt="Agregar" />
        </FixedButton>
      </div>
      <div className={`favorite-list ${openFavorites ? "open" : ""}`}>
        {favorites.map((fv, index) => (
          <FavoriteItem
            image={fv.image}
            onDelete={() => onDeleteFavorite(index)}
            name={fv.name}
          />
        ))}
      </div>
    </div>
  );
};

export default FixedMenu;
