const express = require("express");
const jsonServer = require("json-server");
const env = require("./env");
const db = require('./db');

const app = express();
app.use('/api', jsonServer.defaults(), jsonServer.router(db));
app.use("/", express.static("./build"));

app.listen(env.port, () => console.log(`Server listen on port ${env.port}`));
