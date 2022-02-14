import React, { useState, useEffect } from "react";
import "./Home.scss";
import { Card } from "components/Card/Card";
import { Button } from "components/Button/Button";
import FixedMenu from "../../components/FixedMenu/FixedMenu";
import { AddCharacterModal } from "../../components/AddCharacterModal";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleFavorite,
  setCharacters,
  toggleDisplayFilter,
} from "../../providers/store";
import { filterTypes } from "../../providers/filterTypes";
import { findStaff, findAllCharacters } from "../../requests";
import _ from "lodash";

export const Home = (props) => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const toggleClose = () => setOpenAddModal(!openAddModal);
  const students = useSelector((state) => state.root.students);
  const staff = useSelector((state) => state.root.staff);
  const displayedElements = useSelector(
    (state) => state.root.displayedElements
  );
  const dispatch = useDispatch();
  const showStudents = () =>
    dispatch(toggleDisplayFilter(filterTypes.students));
  const showStaff = () => dispatch(toggleDisplayFilter(filterTypes.staff));
  const onClickFavorite = (id) => dispatch(toggleFavorite({ id }));

  useEffect(() => {
    findAllCharacters()
      .then((response) => {
        const data = _.get(response, "data", []);
        dispatch(setCharacters(data));
        showStudents();
      })
      .catch((error) => console.log({ error }));
  }, []);

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
      <div className="df center-x pt-2 filters-container">
        <Button className="filter-btn" onClick={showStudents}>
          Estudiantes
        </Button>
        <Button className="filter-btn" onClick={showStaff}>
          Staff
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
