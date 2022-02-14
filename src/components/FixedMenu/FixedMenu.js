import React, { useState } from "react";
import "./FixedMenu.scss";
import { FixedButton } from "../FixedButton/FixedButton";
import { Icon } from "../Icon/Icon";
import { FavoriteItem } from "../FavoriteItem/FavoriteItem";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../providers/store";

const FixedMenu = ({ onClickAdd }) => {
  const [openFavorites, setOpenFavorites] = useState(false);
  const toggleFavorites = () => setOpenFavorites(!openFavorites);
  const favorites = useSelector((state) => state.root.favorites);
  const dispatch = useDispatch();
  const deleteFavorite = (id) => dispatch(toggleFavorite({ id }));

  return (
    <div className="fixed-menu">
      <div className="df center-x center-y">
        <FixedButton className="favorite-fixed-btn" onClick={toggleFavorites}>
          <span>Favoritos</span>{" "}
          <Icon src="assets/favorite-icon.png" alt="Favoritos" />
        </FixedButton>
        <FixedButton className="add-fixed-btn" onClick={onClickAdd}>
          <span>Agregar</span>{" "}
          <Icon src="assets/User_fill_add.png" alt="Agregar" />
        </FixedButton>
      </div>
      <div className={`favorite-list ${openFavorites ? "open" : ""}`}>
        {favorites.map((fv, index) => (
          <FavoriteItem
            key={fv.id}
            image={fv.image}
            onDelete={() => deleteFavorite(fv.id)}
            name={fv.name}
          />
        ))}
      </div>
    </div>
  );
};

export default FixedMenu;
