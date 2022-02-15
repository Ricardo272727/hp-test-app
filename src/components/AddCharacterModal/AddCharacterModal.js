import React, { useRef } from "react";
import { Modal } from "../Modal";
import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { Button } from "../Button";
import "./AddCharacterModal.scss";
import { useCharacterForm } from "../../hooks/useCharacterForm";

export const AddCharacterModal = ({ open = false, onClose }) => {
  const { formik, fileRef, imageRef, handleChangeFile } = useCharacterForm({
    onClose,
  });

  return (
    <Modal open={open} onClose={onClose} title="Agregar un personaje">
      <FormControl className="form-control-modal">
        <FormLabel>Nombre</FormLabel>
        <TextField
          className="text-field-modal"
          name="name"
          label="Nombre"
          variant="filled"
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.errors.name && formik.touched.name}
          helperText={formik.errors.name}
        />
      </FormControl>
      <FormControl className="form-control-modal">
        <FormLabel>Cumpleaños</FormLabel>
        <TextField
          className="text-field-modal"
          name="birthday"
          type="date"
          variant="filled"
          onChange={formik.handleChange}
          value={formik.values.birthday}
          error={formik.errors.birthday && formik.touched.birthday}
          helperText={formik.errors.birthday}
        />
      </FormControl>

      <FormControl className="form-control-modal">
        <FormLabel>Color de ojos</FormLabel>
        <TextField
          className="text-field-modal"
          name="eyeColour"
          variant="filled"
          onChange={formik.handleChange}
          value={formik.values.eyeColour}
          error={formik.errors.eyeColour && formik.touched.eyeColour}
          helperText={formik.errors.eyeColour}
        />
      </FormControl>

      <FormControl className="form-control-modal">
        <FormLabel>Color de pelo</FormLabel>
        <TextField
          className="text-field-modal"
          name="hairColour"
          variant="filled"
          onChange={formik.handleChange}
          value={formik.values.hairColour}
          error={formik.errors.hairColour && formik.touched.hairColour}
          helperText={formik.errors.hairColour}
        />
      </FormControl>

      <FormControl className="form-control-modal">
        <FormLabel id="demo-form-control-label-placement">GÉNERO</FormLabel>
        <RadioGroup
          row
          name="gender"
          value={formik.values.gender}
          onChange={formik.handleChange}
          className="radio-row"
        >
          <FormControlLabel
            control={<Radio />}
            label="Mujer"
            labelPlacement="end"
            value="female"
          />
          <FormControlLabel
            control={<Radio />}
            label="Hombre"
            labelPlacement="end"
            value="male"
          />
        </RadioGroup>
      </FormControl>

      <FormControl className="form-control-modal">
        <FormLabel id="demo-form-control-label-placement">POSICIÓN</FormLabel>
        <RadioGroup
          row
          name="position"
          value={formik.values.position}
          onChange={formik.handleChange}
          className="radio-row"
        >
          <FormControlLabel
            control={<Radio />}
            label="Estudiante"
            labelPlacement="end"
            value="student"
          />
          <FormControlLabel
            control={<Radio />}
            label="Staff"
            labelPlacement="end"
            value="staff"
          />
        </RadioGroup>
      </FormControl>

      <FormControl className="form-control-modal">
        <FormLabel>Fotografía</FormLabel>
        <input
          type="file"
          accept="image/*"
          id="photo"
          name="photo"
          className="photo-input"
          ref={fileRef}
          onChange={handleChangeFile}
        />
        <img ref={imageRef} alt="Character photo" className="character-photo" />
        <label htmlFor="photo_file" className="form-file-error">
          {formik.errors.photo ? formik.errors.photo.name : ""}
        </label>
        <label htmlFor="photo_file" className="form-file-error">
          {formik.errors.photo ? formik.errors.photo.size : ""}
        </label>
      </FormControl>

      <div className="df center-x center-y">
        <Button
          className="save-btn"
          role="submit"
          onClick={formik.handleSubmit}
        >
          GUARDAR
        </Button>
      </div>
    </Modal>
  );
};
