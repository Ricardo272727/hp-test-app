const express = require("express");
const jsonServer = require("json-server");
const db = require("./db");
const port = process.env.PORT;
const app = express();
app.use("/api", jsonServer.defaults(), jsonServer.router(db));
app.use("/", express.static("./build"));

app.listen(port, () => console.log(`Server listen on port ${port}`));
