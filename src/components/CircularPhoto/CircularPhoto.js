import React from "react";
import "./CircularPhoto.scss";

export const CircularPhoto = ({ src = "" }) => {
  return (
    <figure
      style={{ backgroundImage: `url(${src})` }}
      className="circular-photo"
    ></figure>
  );
};
