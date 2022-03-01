import React, { useState, useEffect } from "react";
import "./Home.scss";
import { Card } from "components/Card/Card";
import { Button } from "components/Button/Button";
import FixedMenu from "components/FixedMenu/FixedMenu";
import { AddCharacterModal } from "components/AddCharacterModal";
import { useHome } from "hooks/useHome";

export const Home = (props) => {
  const {
    openAddModal,
    toggleClose,
    displayedElements,
    showStudents,
    showStaff,
    onClickFavorite,
    showAliveCharacters,
  } = useHome();

  return (
    <main className="home-app">
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
      <div className="df pt-2 filters-container">
        <Button className="filter-btn" onClick={showStudents}>
          Estudiantes
        </Button>
        <Button className="filter-btn" onClick={showStaff}>
          Staff
        </Button>
        <Button className="filter-btn" onClick={showAliveCharacters}>
          Vivos
        </Button>
      </div>
      <div className="items-container">
        {displayedElements.map((item, index) => (
          <Card
            key={index}
            id={item.id}
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
            onClickFavorite={onClickFavorite}
            isFavorite={item.isFavorite}
          />
        ))}
      </div>
      <FixedMenu onClickAdd={toggleClose} />
      <AddCharacterModal open={openAddModal} onClose={toggleClose} />
    </main>
  );
};
