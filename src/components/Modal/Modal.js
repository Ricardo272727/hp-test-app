import React from "react";
import { Typography, Modal as MuiModal, Box, TextField } from "@mui/material";
import { Button } from "../Button";
import "./Modal.scss";

export const Modal = ({
  title = "",
  description = "",
  open = false,
  onClose,
  children = null,
}) => {
  return (
    <MuiModal
      open={open}
      onClose={onClose}
      aria-labelledby={title}
      aria-describedby={description}
    >
      <Box className="modal-content">
        <div className="modal-header">
          <Typography id={title} variant="h6" component="h2">
            {title}
          </Typography>
          <button className="modal-close-btn" onClick={onClose}></button>
        </div>
        <div>{children}</div>
      </Box>
    </MuiModal>
  );
};
