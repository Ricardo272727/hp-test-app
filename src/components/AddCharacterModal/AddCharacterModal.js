import React, { useRef } from "react";
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
import { useDispatch } from "react-redux";
import { addCharacter } from "providers/store";
import { Button } from "../Button";
import "./AddCharacterModal.scss";
import moment from "moment";
import { createCharacter } from "requests";

export const messages = {
  required: "Este campo es requerido",
};

export const validExtensions = ["png", "jpeg", "jpg"];

export const validationSchema = Yup.object().shape({
  name: Yup.string().required(messages.required),
  birthday: Yup.date().required(messages.required),
  eyeColour: Yup.string().required(messages.required),
  hairColour: Yup.string().required(messages.required),
  gender: Yup.string().required(messages.required),
  position: Yup.string().required(messages.required),
  photo: Yup.object().shape({
    name: Yup.string().test({
      test: (value = "") => {
        let ext = value.split(".")[1];
        let valid = validExtensions.find((ex) => ext === ex);
        return Boolean(valid);
      },
      message: `El tipo de archivo seleccionado no es válido, extensiones válidas: ${validExtensions.join(
        ", "
      )}`,
    }),
    size: Yup.number().test({
      test: (value) => {
        let maxSize = 5000000;
        return value < maxSize;
      },
      message: "El archivo seleccionado es muy grande",
    }),
  }),
});

export const AddCharacterModal = ({ open = false, onClose }) => {
  const fileRef = useRef(null);
  const imageRef = useRef(null);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      birthday: "",
      eyeColour: "",
      hairColour: "",
      gender: "",
      position: "",
      photo: {
        name: "",
        size: 0,
        file: null,
      },
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log({ values });
      try {
        const character = {
          name: values.name,
          species: "human",
          gender: values.gender,
          house: "Gryffindor",
          dateOfBirth: moment(values.dateOfBirth).format("DD-MM-YYYY"),
          yearOfBirth: moment(values.dateOfBirth).format("YYYY"),
          ancestry: "muggleborn",
          eyeColour: values.eyeColour,
          hairColour: values.hairColour,
          wand: { wood: "vine", core: "dragon heartstring", length: "" },
          patronus: "otter",
          hogwartsStudent: values.position === "student",
          hogwartsStaff: values.position === "staff",
          actor: "Emma Watson",
          alive: true,
          image: "http://hp-api.herokuapp.com/images/hermione.jpeg",
        };
        const response = await createCharacter(character);
        const created = response.data;
        console.log({ response, created })
        if (created && created.id) {
          dispatch(addCharacter(created));
          formik.resetForm();
          onClose();
        }
      } catch (error) {
        console.log({ error });
      }
    },
  });

  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    formik.setFieldValue("photo", {
      name: file.name,
      size: file.size,
      file: file,
    });
  };

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
        <Button className="save-btn" onClick={formik.handleSubmit}>
          GUARDAR
        </Button>
      </div>
    </Modal>
  );
};
