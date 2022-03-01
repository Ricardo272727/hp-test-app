import { configureStore, createSlice } from "@reduxjs/toolkit";
import { filterTypes } from "providers/filterTypes";

export const initialState = {
  characters: [],
  students: [],
  staff: [],
  favorites: [],
  filter: filterTypes.students,
  displayedElements: [],
};

export const parseCharacterFromApi = (character) => ({
  ...character,
  isFavorite: false,
});

export const rootSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    setCharacters: (state, action) => {
      state.characters = action.payload.map(parseCharacterFromApi);
      rootSlice.caseReducers.updateStudentsList(state, action);
      rootSlice.caseReducers.updateStaffList(state, action);
    },
    toggleFavorite: (state, action) => {
      const id = action.payload.id;
      const index = state.characters.findIndex((ch) => ch.id === id);
      if (index === -1) throw new Error(`Character not found ${id}`);
      if (state.characters[index].isFavorite) {
        state.characters[index] = {
          ...state.characters[index],
          isFavorite: false,
        };
      } else if (state.favorites.length < 5) {
        state.characters[index] = {
          ...state.characters[index],
          isFavorite: true,
        };
      }
      rootSlice.caseReducers.updateSelectedList(state, action);
      rootSlice.caseReducers.updateFavoriteList(state, action);
    },
    addCharacter: (state, action) => {
      const character = action.payload;
      if (!character) return;
      state.characters.push(parseCharacterFromApi(character));
      rootSlice.caseReducers.updateSelectedList(state, action);
    },
    toggleDisplayFilter: (state, action) => {
      const filter = action.payload;
      state.filter = filter;
      if (filter === filterTypes.students) {
        rootSlice.caseReducers.updateStudentsList(state, action);
        state.displayedElements = state.students.slice();
      } else {
        rootSlice.caseReducers.updateStaffList(state, action);
        state.displayedElements = state.staff.slice();
      }
    },
    updateSelectedList: (state, action) => {
      if (state.filter === filterTypes.students) {
        rootSlice.caseReducers.updateStudentsList(state, action);
        state.displayedElements = state.students.slice();
      } else if (state.filter === filterTypes.staff) {
        rootSlice.caseReducers.updateStaffList(state, action);
        state.displayedElements = state.staff.slice();
      }
    },
    updateStudentsList: (state, action) => {
      state.students = state.characters.filter((ch) => ch.hogwartsStudent);
    },
    updateStaffList: (state, action) => {
      state.staff = state.characters.filter((ch) => ch.hogwartsStaff);
    },
    updateFavoriteList: (state, action) => {
      state.favorites = state.characters.filter((ch) => ch.isFavorite);
    },
    selectAliveCharacters: (state, action) => {
      state.displayedElements = state.characters.filter(
        (character) => character.alive
      );
    },
  },
});

export const {
  setCharacters,
  toggleFavorite,
  addCharacter,
  toggleDisplayFilter,
  selectAliveCharacters,
} = rootSlice.actions;

export const store = configureStore({
  reducer: {
    root: rootSlice.reducer,
  },
});
