import React from "react";
import "./CardHeaderStatus.scss";

export const CardHeaderStatus = ({
  alive = false,
  hogwartsStudent = false,
}) => (
  <span className="card-header-status">
    {alive ? "VIVO" : "FINADO"} / {hogwartsStudent ? "ESTUDIANTE" : "STAFF"}
  </span>
);
