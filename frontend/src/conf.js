require("dotenv").config();

const backendAddress =
  process.env.REACT_APP_BACKEND_ADDRESS || "backend-adress:1234";

module.exports = { backendAddress };
