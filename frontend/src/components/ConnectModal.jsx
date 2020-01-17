import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import "./style/ConnectModal.scss";

const ConnectModal = () => {
  const dispatch = useDispatch();
  const showConnectModal = useSelector(state => state.showConnectModal);
  const [username, usernameUpdate] = useState("");
  const [password, passwordUpdate] = useState("");
  const [credentialsState, credentialsStateUpdate] = useState(true);

  const handleSubmit = () => {
    axios.post("http://localhost:5000/auth/login", { username, password }).then(
      response => {
        localStorage.setItem("token", response.data.token);
        console.log(response.data);
        dispatch({ type: "SAVE_USER_DATA", value: response.data });
        dispatch({ type: "TOGGLE_CONNECT_MODAL" });
      },
      err => {
        credentialsStateUpdate(false);
      }
    );
  };

  return (
    showConnectModal && (
      <div className="ConnectModal">
        <div
          className="background"
          onClick={e => {
            dispatch({ type: "TOGGLE_CONNECT_MODAL" });
          }}
        ></div>
        <div className="modal">
          <h3>Identifiant</h3>
          <input
            type="text"
            value={username}
            onChange={e => {
              credentialsStateUpdate(true);
              usernameUpdate(e.target.value);
            }}
            className={!credentialsState ? "wrong" : undefined}
          />
          <h3>Mot de passe</h3>
          <input
            type="password"
            value={password}
            onChange={e => {
              credentialsStateUpdate(true);
              passwordUpdate(e.target.value);
            }}
            className={!credentialsState ? "wrong" : undefined}
          />
          <button type="submit" onClick={handleSubmit}>
            Se connecter
          </button>
          <h3>Vous n'avez pas de compte ?</h3>
        </div>
      </div>
    )
  );
};

export default ConnectModal;
