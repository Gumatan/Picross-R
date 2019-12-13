const connection = require("./conf");
const express = require("express");
const app = express();
const port = 4000;

const bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
