import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import "./style/RegisterModal.scss";

const RegisterModal = () => {
  const dispatch = useDispatch();
  const showRegisterModal = useSelector(state => state.showRegisterModal);
  const [username, usernameUpdate] = useState("");
  const [password, passwordUpdate] = useState("");
  const [confirmPassword, confirmPasswordUpdate] = useState("");
  const [passwordsAreSame, passwordsAreSameUpdate] = useState(true);
  const [usernameTaken, usernameTakenUpdate] = useState(false);

  const handleSubmit = () => {
    if (password === confirmPassword) {
      axios
        .post("http://localhost:5000/auth/signup", { username, password })
        .then(response => {
          localStorage.setItem("token", response.data.token);
          dispatch({ type: "SAVE_USER_DATA", value: response.data });
          dispatch({ type: "TOGGLE_REGISTER_MODAL" });
        })
        .catch(err => {
          usernameTakenUpdate(true);
        });
    } else {
      passwordsAreSameUpdate(false);
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
        <div className="modal">
          <h3>Identifiant</h3>
          <input
            className={usernameTaken ? "wrong" : undefined}
            type="text"
            value={username}
            onChange={e => {
              usernameUpdate(e.target.value);
              usernameTakenUpdate(false);
            }}
          />
          <h3>Mot de passe</h3>
          <input
            className={!passwordsAreSame ? "wrong" : undefined}
            type="password"
            value={password}
            onChange={e => {
              passwordUpdate(e.target.value);
              passwordsAreSameUpdate(true);
            }}
          />
          <h3>Confirmez le mot de passe</h3>
          <input
            className={!passwordsAreSame ? "wrong" : undefined}
            type="password"
            value={confirmPassword}
            onChange={e => {
              confirmPasswordUpdate(e.target.value);
              passwordsAreSameUpdate(true);
            }}
          />
          {!passwordsAreSame && (
            <p className="wrong">
              les mots de passe ne sont pas identiques, veuillez réesayer
            </p>
          )}
          <button type="submit" onClick={handleSubmit}>
            S'inscrire
          </button>
        </div>
      </div>
    )
  );
};

export default RegisterModal;
