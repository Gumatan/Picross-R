const bdd = require("./conf");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 4000;

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

app.get("/puzzles", (req, res) => {
  bdd.query("select * from puzzle", (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(200).json(results);
    }
  });
});

app.post("/puzzles", (req, res) => {
  const formData = req.body;
  console.log(formData);
  bdd.query("insert into puzzle SET ?", formData, err => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send("Succesfully added a puzzle");
    }
  });
});

app.listen(port, err => {
  if (err) {
    throw new Error("Something bad happened...");
  } else {
    console.log("server running on port " + port);
  }
});
