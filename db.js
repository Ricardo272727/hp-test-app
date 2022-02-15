const characters = require("./src/data/hp-characters.json");
const data = {
  character: characters.map((s, index) => ({ id: index, ...s })),
};
module.exports = data;
