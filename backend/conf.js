require("dotenv").config();
const mysql = require("mysql");
const backendPort = process.env.BACKEND_PORT || 4545;

const bdd = mysql.createPool({
  connectionLimmit: 10,
  host: process.env.DB_HOST || "conf.JS-HOSTNAME", // address of the server
  user: process.env.DB_USER || "conf.JS-USER", // username
  password: process.env.DB_PASSWORD || "conf.JS-PASSWORD",
  database: process.env.DB_DATABASE || "conf.JS-DBNAME"
});

module.exports = { backendPort, bdd };
