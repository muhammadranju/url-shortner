const express = require("express");
const app = express();

app.use(require("./middlewares.js"));
app.use(require("../routes/prefixRoutes.js"));

app.set("view engine", "ejs");
app.use(express.static("public"));

module.exports = app;
