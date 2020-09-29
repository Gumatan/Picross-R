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
    ? bdd.query("SELECT p.id, p.name, u.username as creator, p.height, p.width, p.solutionString FROM puzzle p JOIN user u ON u.id = p.creator WHERE p.id=?", [id], (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json(results);
      }
    })
    : bdd.query("SELECT p.id, p.name, u.username as creator, p.height, p.width, p.solutionString FROM puzzle p JOIN user u ON u.id = p.creator ", (err, results) => {
      if (err) {
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
    const loggedUser = req.user;

    const newlyCompletedPuzzles = req.body.saveData.filter(incomingId =>
      !loggedUser.saveData.some(alreadySavedId => alreadySavedId == incomingId)
    );
    if (newlyCompletedPuzzles.length > 0) {
      bdd.query(
        "INSERT INTO puzzle_user(user_id,puzzle_id) VALUES ?",
        [newlyCompletedPuzzles.map(id => [loggedUser.id, id])],
        err => {
          if (err) {
            return res.status(500).send(err);
          } else {
            return res
              .status(200)
              .send("Succesfully updated saveData of " + loggedUser.username);
          }
        }
      );
    } else {
      return res
        .status(200)
        .send("Succesfully updated saveData of " + loggedUser.username);
    }
  }
);

app.listen(backendPort, err => {
  if (err) {
    throw new Error("Something bad happened...");
  } else {
    console.log("server running on port " + backendPort);
  }
});
