import { useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addCharacter } from "providers/store";
import moment from "moment";
import { createCharacter } from "requests";

export const messages = {
  required: "Este campo es requerido",
};

export const initialValues = {
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

export const useCharacterForm = ({ onClose }) => {
  const fileRef = useRef(null);
  const imageRef = useRef(null);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues,
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

  return { formik, handleChangeFile, fileRef, imageRef };
};
