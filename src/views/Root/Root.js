import React, { useState } from "react";
import { Provider } from "react-redux";
import { store } from "providers/store";
import { Home } from "../Home";

export const Root = (props) => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};
