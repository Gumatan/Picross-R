const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { Strategy: JWTStrategy, ExtractJwt } = require("passport-jwt");
const bcrypt = require("bcrypt");
const {
  CONFIG: { jwtSecret },
  bdd
} = require("./conf");
const { JsonWebTokenError } = require("jsonwebtoken");

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    (formUsername, formPassword, done) => {
      bdd.query(
        "SELECT u.id, u.username, u.password, u.creator, pu.puzzle_id FROM user u LEFT JOIN puzzle_user pu ON pu.user_id = u.id WHERE u.username=?",
        [formUsername],
        (err, results) => {
          if (err) {
            return done(err, false, {
              message: "Sql error!"
            });
          }
          let user;
          if (results && results[0]) {
            user = { id: results[0].id, username: results[0].username, password: results[0].password, creator: results[0].creator };
            if (results[0].puzzle_id != null) {
              user.saveData = results.map(e => e.puzzle_id);
            } else user.saveData = []

          };
          if (!user || !user.username)
            return done(null, false);
          bcrypt.compare(formPassword, user.password, (errBcrypt, result) => {
            if (errBcrypt) return done(errBcrypt, false, {
              message: "Server error!"
            });
            if (!result)
              return done(null, false, {
                message: "Incorrect password!"
              });
            user.password = undefined
            return done(null, user);
          });
        }
      );
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret
    },
    (jwtPayload, done) => {
      const loggedUser = jwtPayload;
      bdd.query(
        "SELECT pu.puzzle_id FROM puzzle_user pu WHERE pu.user_id=?",
        [loggedUser.id],
        (err, results) => {
          if (err) {
            return done(err, false, { message: "Sql error!" });
          } else {
            loggedUser.saveData = results.map(e => e.puzzle_id)
            return done(null, loggedUser)
          }
        }
      );
    }
  )
);
