import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleFavorite,
  setCharacters,
  toggleDisplayFilter,
} from "providers/store";
import { filterTypes } from "providers/filterTypes";
import { findStaff, findAllCharacters } from "requests";
import _ from "lodash";

export const useHome = (props) => {
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

  return {
    openAddModal,
    toggleClose,
    displayedElements,
    showStudents,
    showStaff,
    onClickFavorite,
  };
};
