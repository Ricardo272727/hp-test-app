import axios from "axios";
import env from "../../env";

export const instance = axios.create({
  baseURL: env.api,
});

export const createCharacter = (data) => instance.post("/character", data);
export const findAllCharacters = () => instance.get("/character");
