import React from "react";
import "./CircularPhoto.scss";

export const CircularPhoto = ({ src = "", className = "" }) => {
  return (
    <figure
      style={{ backgroundImage: `url(${src})` }}
      className={`circular-photo ${className}`}
    ></figure>
  );
};
