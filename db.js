const characters = require("./src/data/hp-characters.json");

const dataBuilder = () => ({
  character: characters.map((s, index) => ({ id: index, ...s })),
});

module.exports = dataBuilder;
