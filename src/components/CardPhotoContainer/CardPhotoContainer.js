import React from "react";
import "./CardPhotoContainer.scss";

export const CardPhotoContainer = ({ children, house = "gryffindor" }) => (
  <div className={`card-photo-container ${house} df center-x center-y`}>
    {children}
  </div>
);
