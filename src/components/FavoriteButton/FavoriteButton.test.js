import React from 'react';
import renderer from "react-test-renderer";
import { FavoriteButton } from "./FavoriteButton";

test('toggle selected class for favorite button', () => {
  const fn = jest.fn((e) => {});
  const component = renderer.create(<FavoriteButton onClick={fn} selected />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  tree.selected = false;
  expect(tree).toMatchSnapshot();
});
