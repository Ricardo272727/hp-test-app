import React from "react";
import { Modal } from "../Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
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

export const messages = {
  required: "Este campo es requerido",
};

export const validExtensions = ["png", "jpeg", "jpg"];

export const validationSchema = Yup.object().shape({
  name: Yup.string().required(messages.required),
  birthday: Yup.date().required(messages.required),
  eyeColor: Yup.string().required(messages.required),
  hairColor: Yup.string().required(messages.required),
  genre: Yup.string().required(messages.required),
  position: Yup.string().required(messages.required),
  photo_name: Yup.string().test({
    test: (value = "") => {
      console.log({ value });
      let ext = value.split(".")[1];
      let valid = validExtensions.find((ex) => ext === ex);
      console.log({ ext, valid })
      return Boolean(valid);
    },
    message: `El tipo de archivo seleccionado no es válido, extensiones válidas: ${validExtensions.join(
      ", "
    )}`,
  }),
  photo_size: Yup.number().test({
    test: (value) => {
      console.log({ value });
      let maxSize = 5000000;
      return value < maxSize;
    },
    message: "El archivo seleccionado es muy grande",
  }),
});

export const AddCharacterModal = ({ open = false, onClose }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      birthday: "",
      eyeColor: "",
      hairColor: "",
      genre: "",
      position: "",
      photo_name: "",
      photo_size: 0,
      photo_file: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log({ values });
    },
  });

  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    console.log({ file })
    if(!file) return;
    const name = file.name;
    const size = file.size;
    formik.setFieldValue("photo_name", name);
    formik.setFieldValue("photo_size", size);
    formik.setFieldValue("photo_file", file);
  };

  console.log(formik);

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
          name="eyeColor"
          variant="filled"
          onChange={formik.handleChange}
          value={formik.values.eyeColor}
          error={formik.errors.eyeColor && formik.touched.eyeColor}
          helperText={formik.errors.eyeColor}
        />
      </FormControl>

      <FormControl className="form-control-modal">
        <FormLabel>Color de pelo</FormLabel>
        <TextField
          className="text-field-modal"
          name="hairColor"
          variant="filled"
          onChange={formik.handleChange}
          value={formik.values.hairColor}
          error={formik.errors.hairColor && formik.touched.hairColor}
          helperText={formik.errors.hairColor}
        />
      </FormControl>

      <FormControl className="form-control-modal">
        <FormLabel id="demo-form-control-label-placement">GÉNERO</FormLabel>
        <RadioGroup
          row
          name="genre"
          value={formik.values.genre}
          onChange={formik.handleChange}
          className="radio-row"
        >
          <FormControlLabel
            control={<Radio />}
            label="Mujer"
            labelPlacement="end"
            value="M"
          />
          <FormControlLabel
            control={<Radio />}
            label="Hombre"
            labelPlacement="end"
            value="H"
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
          id="photo_file"
          name="photo_file"
          className="photo-input"
          onChange={handleChangeFile}
        />
        <label htmlFor="photo_file" className="form-file-error">
          {formik.errors.photo_name}
        </label>
        <label htmlFor="photo_file" className="form-file-error">
          {formik.errors.photo_size}
        </label>
      </FormControl>

      <div className="df center-x center-y">
        <Button className="save-btn" onClick={formik.handleSubmit}>
          GUARDAR
        </Button>
      </div>
    </Modal>
  );
};
