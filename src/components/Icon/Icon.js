import React from "react";
import "./Icon.scss";

export const Icon = ({ src, alt = "" }) => {
  return <img className="icon-img" src={src} alt={alt} />;
};
