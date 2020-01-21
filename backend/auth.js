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
          console.log(err);
          return res.status(500).send(err);
        } else if (!results.length) {
          bdd.query("INSERT INTO user SET ?", [newUser], (err, results) => {
            if (err) {
              console.error("Failure! " + err);
              return res.status(400).send("Invalid User creation request");
            }
            newUser.password = undefined;
            return res.status(201).send({
              user: { ...newUser, saveData: "[]" },
              token: jwt.sign(JSON.stringify(newUser), jwtSecret)
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

router.post("/login", (req, res) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      // User not logged in (inexistant or tech error)
      return res.status(401).json({
        message: "Failed auth!",
        user,
        err,
        info
      });
    }
    req.login(user, { session: false }, loginErr => {
      if (loginErr) {
        // Failed (technically) to log the user in
        return res.status(401).json({
          message: "Couldn't log you in!",
          user,
          loginErr
        });
      }
      user.password = undefined;
      bdd.query(
        "SELECT saveData from user WHERE username=?",
        [user.username],
        (err, results) => {
          if (err) {
            console.log(err);
            res.status(500).send(err);
          } else {
            user.saveData = results[0].saveData;
            const token = jwt.sign(user, jwtSecret);
            return res.status(200).json({ user, token });
          }
        }
      );
    });
  })(req, res);
});

router.get(
  "/authenticateViaJWT",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    bdd.query(
      "SELECT saveData from user WHERE username=?",
      [req.user.username],
      (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          res.status(200).json({
            ...req.user,
            saveData: results[0].saveData
          });
        }
      }
    );
  }
);

module.exports = router;
