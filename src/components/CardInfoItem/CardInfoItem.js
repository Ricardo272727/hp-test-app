import React from "react";
import "./CardInfoItem.scss"


export const CardInfoItem = ({ label = '', data = '' }) => {
  return (
    <div className="card-info-item">
      <p>
        <strong>{label}: </strong>
        <span>{data}</span>
      </p>
    </div>
  );
};
