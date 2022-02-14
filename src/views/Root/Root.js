import React, { useState } from "react";
import "./Root.scss";
import items from "../../data/hp-students.json";
import { Card } from "components/Card/Card";
import { Button } from "components/Button/Button";
import FixedMenu from "../../components/FixedMenu/FixedMenu";
import { AddCharacterModal } from "../../components/AddCharacterModal";

export const Root = (props) => {
  const [openAddModal, setOpenAddModal] = useState(true);
  const onClickFavorite = () => {};
  const onClickAdd = () => {};
  const toggleClose = () => setOpenAddModal(!openAddModal);

  return (
    <main className="root-app">
      <div className="df center-x center-y">
        <img
          src="assets/Harry_Potter_wordmark.png"
          alt="Harry Potter"
          className="hp-title-img"
        />
      </div>
      <div className="df center-x">
        <h1 className="select-filter-label">Selecciona tu filtro</h1>
      </div>
      <div className="df center-x pt-2 filters-container">
        <Button className="filter-btn">Estudiantes</Button>
        <Button className="filter-btn">Staff</Button>
      </div>
      <div className="items-container">
        {items.map((item, index) => (
          <Card
            key={index}
            name={item.name}
            alive={item.alive}
            house={item.house}
            image={item.image}
            gender={item.gender}
            eyeColour={item.eyeColour}
            hairColour={item.hairColour}
            dateOfBirth={item.dateOfBirth}
            hogwartsStaff={item.hogwartsStaff}
            hogwartsStudent={item.hogwartsStudent}
          />
        ))}
      </div>
      <FixedMenu onClickAdd={toggleClose} onClickFavorite={onClickFavorite} />
      <AddCharacterModal open={openAddModal} onClose={toggleClose} />
    </main>
  );
};
