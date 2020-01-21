require("dotenv").config();
const mysql = require("mysql");

let CONFIG = {
  backendPort: process.env.BACKEND_PORT || "4200",
  jwtSecret: process.env.JWT_SECRET || "jwt_please_change",
  saltRounds: process.env.SALT_ROUNDS || "10",
  jwtExpiration: process.env.JWT_EXPIRATION || "10000"
};

const bdd = mysql.createPool({
  connectionLimmit: 10,
  host: process.env.DB_HOST || "conf.JS-HOSTNAME", // address of the server
  user: process.env.DB_USER || "conf.JS-USER", // username
  password: process.env.DB_PASSWORD || "conf.JS-PASSWORD",
  database: process.env.DB_DATABASE || "conf.JS-DBNAME"
});

module.exports = { CONFIG, bdd };
