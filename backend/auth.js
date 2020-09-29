const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

const {
  CONFIG: { jwtSecret, saltRounds },
  bdd
} = require("./conf");
const bcrypt = require("bcrypt");

router.post("/signup", (req, res) => {
  const newUser = req.body;
  bcrypt.hash(newUser.password, parseInt(saltRounds), (err, hash) => {
    newUser.password = hash;
    bdd.query(
      "SELECT username from user WHERE username=?",
      [newUser.username],
      (err, results) => {
        if (err) {
          return res.status(500).send(err);
        } else if (results.length === 0) {
          bdd.query("INSERT INTO user SET ?", [{ username: newUser.username, password: newUser.password, creator: 0 }], (err, results) => {
            if (err) {
              return res.status(400).send("Invalid User creation request");
            }
            newUser.password = undefined;
            const saveData = newUser.saveData;
            newUser.saveData = undefined;
            return res.status(201).send({
              user: { ...newUser, saveData },
              token: jwt.sign(newUser, jwtSecret)
            });
          });
        } else {
          return res.status(401).json({
            message: "Username Taken"
          });
        }
      }
    );
  });
});

router.post("/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    const loggedUser = req.user;
    const token = jwt.sign({ id: loggedUser.id, username: loggedUser.username, creator: loggedUser.creator }, jwtSecret);
    if (req.body.saveData !== []) {
      const mergedSaveData = req.body.saveData.concat(loggedUser.saveData);
      const reconciliatedSaveData = [...new Set(mergedSaveData)];
      loggedUser.saveData = reconciliatedSaveData;

      const newlyCompletedPuzzles =
        req.body.saveData
          .filter(incomingId =>
            !loggedUser.saveData.some(alreadySavedId =>
              alreadySavedId == incomingId
            )
          );
      if (newlyCompletedPuzzles.length > 0) {
        bdd.query(
          "INSERT INTO user_completed_puzzle(user_id,puzzle_id) VALUES ?",
          [newlyCompletedPuzzles.map(puzzleId => [loggedUser.id, puzzleId])],
          (err, results) => {
            if (err) {
              res.status(500).send(err);
            } else {
              return res.status(200).json({ user: loggedUser, token });
            }
          }
        );
      } else return res.status(200).json({ user: loggedUser, token });

    } else {
      return res.status(200).json({ user: loggedUser, token });
    }
  }
);

router.get(
  "/authenticateViaJWT",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let loggedUser = req.user
    res.status(200).json(
      loggedUser
    );
  }
);


module.exports = router;
