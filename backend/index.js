const express = require("express");
const app = express();
const {
  CONFIG: { backendPort },
  bdd
} = require("./conf");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
require("./passport-strategies.js");

app.use("/auth", require("./auth"));

app.get("/puzzles", (req, res) => {
  const id = req.query.id;
  id
    ? bdd.query("select * from puzzle where id=?", [id], (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          res.status(200).json(results);
        }
      })
    : bdd.query("select * from puzzle", (err, results) => {
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
  bdd.query("insert into puzzle SET ?", formData, err => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send("Succesfully added a puzzle");
    }
  });
});

app.put(
  "/savedata",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    bdd.query(
      "UPDATE user SET saveData=? WHERE username=?",
      [req.body.saveData, req.user.username],
      err => {
        if (err) {
          console.log(err);

          res.status(500).send(err);
        } else {
          res
            .status(200)
            .send("Succesfully updated saveData of " + req.user.username);
        }
      }
    );
  }
);

app.listen(backendPort, err => {
  if (err) {
    throw new Error("Something bad happened...");
  } else {
    console.log("server running on port " + backendPort);
  }
});
