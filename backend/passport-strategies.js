const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { Strategy: JWTStrategy, ExtractJwt } = require("passport-jwt");
const bcrypt = require("bcrypt");
const {
  CONFIG: { jwtSecret },
  bdd
} = require("./conf");

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    (formUsername, formPassword, done) => {
      bdd.query(
        "SELECT username, password, creator, saveData FROM user WHERE username=?",
        [formUsername],
        (err, results) => {
          if (err) {
            return done(err, false, {
              message: "Sql error!"
            });
          }
          let user;
          if (results && results[0]) {
            user = { ...results[0] };
            user.saveData = JSON.parse(user.saveData);
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
        "SELECT saveData FROM user WHERE username=?",
        [loggedUser.username],
        (err, results) => {
          if (err) {
            return done(err, false, { message: "Sql error!" });
          } else {
            loggedUser.saveData = results[0].saveData
            return done(null, loggedUser)
          }
        }
      );
    }
  )
);
