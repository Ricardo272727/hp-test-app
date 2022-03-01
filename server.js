const express = require("express");
const jsonServer = require("json-server");
const dataBuilder = require("./db");
const port = process.env.PORT;
const app = express();
app.use("/api", jsonServer.defaults(), jsonServer.router(dataBuilder()));
app.use("/", express.static("./build"));

app.listen(port, () => console.log(`Server listen on port ${port}`));
