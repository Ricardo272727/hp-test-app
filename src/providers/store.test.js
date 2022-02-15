import {
  rootSlice,
  initialState,
  addCharacter,
  setCharacters,
  toggleFavorite,
  toggleDisplayFilter,
} from "./store";
import { filterTypes } from "./filterTypes";
import students from "../data/hp-students.json";
import staff from "../data/hp-staff.json";
import { initialValues } from "hooks/useCharacterForm";

const characters = [...students, ...staff].map((ch, index) => ({
  ...ch,
  id: index,
}));
let result = rootSlice.reducer(initialState, setCharacters(characters));

test("Returns initial state", () => {
  expect(rootSlice.reducer(undefined, {})).toEqual(initialState);
});

test("Set the characters", () => {
  expect(result.characters).toHaveLength(characters.length);
});

test("Check splited students and staff arrays", () => {
  expect(result.staff).toHaveLength(staff.length);
  expect(result.students).toHaveLength(students.length);
});

test("Check toggle favorite", () => {
  result = rootSlice.reducer(result, toggleFavorite({ id: 0 }));
  expect(result.favorites).toHaveLength(1);
});

test("Check toggle favorite again", () => {
  result = rootSlice.reducer(result, toggleFavorite({ id: 0 }));
  expect(result.favorites).toHaveLength(0);
});

test("Check favorite items are five", () => {
  result = rootSlice.reducer(result, toggleFavorite({ id: 0 }));
  result = rootSlice.reducer(result, toggleFavorite({ id: 1 }));
  result = rootSlice.reducer(result, toggleFavorite({ id: 2 }));
  result = rootSlice.reducer(result, toggleFavorite({ id: 3 }));
  result = rootSlice.reducer(result, toggleFavorite({ id: 4 }));
  result = rootSlice.reducer(result, toggleFavorite({ id: 5 }));
  expect(result.favorites).toHaveLength(5);
});

test("Check onChange filter change displayElements", () => {
  result = rootSlice.reducer(result, toggleDisplayFilter(filterTypes.staff));
  expect(result.displayedElements).toHaveLength(staff.length);
});

test("Add new character", () => {
  const character = staff[0];
  character.id = 100;
  result = rootSlice.reducer(result, addCharacter(character));
  expect(result.staff).toHaveLength(staff.length + 1);
  expect(result.characters).toHaveLength(staff.length + students.length + 1);
});
