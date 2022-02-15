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
import { CardHeaderStatus } from "./CardHeaderStatus";
import renderer from 'react-test-renderer';

test("check card header status display FINADO / ESTUDIANTE", () => {
  const fn = jest.fn((e) => {});
  let component = renderer.create(<CardHeaderStatus alive={false} hogwartsStudent={true} />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("check card header status display VIVO / STAFF ", () => {
  const fn = jest.fn((e) => {});
  let component = renderer.create(<CardHeaderStatus alive={true} hogwartsStudent={false} />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});


