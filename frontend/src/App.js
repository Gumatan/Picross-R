import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Nav from "./components/Nav";
import MainPage from "./components/MainPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ToastStyle.scss";
import Footer from "./components/Footer";
import Axios from "axios";
const { backendAddress } = require("./conf");

const App = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.jwt);
  useEffect(() => {
    const localStorageToken = localStorage.getItem("token");
    if (localStorageToken) {
      const config = {
        headers: { Authorization: "Bearer " + localStorageToken }
      };
      Axios.get(backendAddress + "/auth/authenticateViaJWT", config)
        .then(response => {
          const data = {
            user: {
              username: response.data.username,
              creator: response.data.creator,
              saveData: response.data.saveData
            },
            token: localStorageToken
          };
          dispatch({ type: "SAVE_USER_DATA", value: data });
        })
        .catch(err => {
          console.log("validateJWT error " + err);
        });
    }
  }, []);

  useEffect(() => {
    if (token) Axios.defaults.headers.Authorization = "Bearer " + token;
  }, [token]);

  return (
    <div className="App">
      <Nav />
      <MainPage />
      <ToastContainer
        autoClose={5000}
        draggable={false}
        position="bottom-left"
      />
      <Footer />
    </div>
  );
};

export default App;
