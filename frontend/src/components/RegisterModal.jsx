import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import "./style/RegisterModal.scss";
const { backendAddress } = require("../conf");

const RegisterModal = () => {
  const dispatch = useDispatch();
  const saveData = useSelector(state => JSON.stringify(state.completedPuzzles));
  const showRegisterModal = useSelector(state => state.showRegisterModal);
  const [username, usernameUpdate] = useState("");
  const [password, passwordUpdate] = useState("");
  const [confirmPassword, confirmPasswordUpdate] = useState("");
  const [passwordsAreSame, passwordsAreSameUpdate] = useState(true);
  const [usernameTaken, usernameTakenUpdate] = useState(false);
  const [passwordIsLongEnough, passwordIsLongEnoughUpdate] = useState(true);

  const handleSubmit = () => {
    if (password.length >= 4) {
      if (password === confirmPassword) {
        axios
          .post(backendAddress + "/auth/signup", {
            username,
            password,
            saveData
          })
          .then(response => {
            localStorage.setItem("token", response.data.token);
            dispatch({ type: "SAVE_USER_DATA", value: response.data });
            dispatch({ type: "TOGGLE_REGISTER_MODAL" });
            toast("Welcome " + username + " :)");
          })
          .catch(err => {
            usernameTakenUpdate(true);
          });
      } else {
        passwordsAreSameUpdate(false);
      }
    } else {
      passwordIsLongEnoughUpdate(false);
    }
  };

  return (
    showRegisterModal && (
      <div className="RegisterModal">
        <div
          className="background"
          onClick={e => {
            dispatch({ type: "TOGGLE_REGISTER_MODAL" });
          }}
        ></div>
        <form onSubmit={e => e.preventDefault()} className="modal">
          <h3>Username :</h3>
          <input
            className={usernameTaken ? "wrong" : undefined}
            type="text"
            value={username}
            onChange={e => {
              usernameUpdate(e.target.value);
              usernameTakenUpdate(false);
            }}
            autoFocus
          />
          {usernameTaken && (
            <p>
              This username is already taken,
              <br /> sorry.
            </p>
          )}
          <h3>Password :</h3>
          <input
            className={!passwordsAreSame ? "wrong" : undefined}
            type="password"
            value={password}
            onChange={e => {
              passwordUpdate(e.target.value);
              passwordsAreSameUpdate(true);
              passwordIsLongEnoughUpdate(true);
            }}
          />
          <h3>Confirm password :</h3>
          <input
            className={!passwordsAreSame ? "wrong" : undefined}
            type="password"
            value={confirmPassword}
            onChange={e => {
              confirmPasswordUpdate(e.target.value);
              passwordsAreSameUpdate(true);
              passwordIsLongEnoughUpdate(true);
            }}
          />
          {!passwordsAreSame && (
            <p>
              Passwords are not identical,
              <br /> please retry.
            </p>
          )}
          {!passwordIsLongEnough && (
            <p>
              Password needs to be at least,
              <br />4 characters long.
            </p>
          )}
          <button type="submit" onClick={handleSubmit}>
            Create Account
          </button>
        </form>
      </div>
    )
  );
};

export default RegisterModal;
