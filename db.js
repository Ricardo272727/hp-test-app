const characters = require("./src/data/hp-characters.json");

module.exports = () => {
  const data = {
    character: characters.map((s, index) => ({ id: index, ...s })),
  };
  return data;
};
