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
      passwordField: "password"
    },
    (formPseudo, formPassword, done) => {
      bdd.query(
        "SELECT username, password, creator FROM user WHERE username=?",
        [formPseudo],
        (err, results) => {
          if (err) {
            console.log(err);
            return done(err);
          }
          let user;
          if (results && results[0]) user = { ...results[0] };
          if (!user || !user.username)
            return done(null, false, { message: "User not found!" });
          bcrypt.compare(formPassword, user.password, (errBcrypt, result) => {
            if (errBcrypt) return done(errBcrypt);
            if (!result)
              return done(null, false, {
                message: "Incorrect password!"
              });
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
      const user = jwtPayload;
      // find the user in bdd if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
      return done(null, user);
    }
  )
);
