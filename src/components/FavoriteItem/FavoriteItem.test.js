/**
 * @jest-environment jsdom
 */
import React from "react";
import {
  cleanup,
  fireEvent,
  getByTestId,
  render,
  screen,
} from "@testing-library/react";
import { FavoriteItem } from "./FavoriteItem";

test("check delete favorite button", () => {
  const fn = jest.fn((e) => {});
  render(<FavoriteItem onDelete={fn} name="Rick" image="url" />);
  const btn = screen.getByTitle("delete-favorite-item");
  fireEvent.click(btn);

  expect(fn).toHaveBeenCalledWith(expect.anything());
});
