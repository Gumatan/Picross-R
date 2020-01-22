import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import "./style/ConnectModal.scss";
const { backendAddress } = require("../conf");

const ConnectModal = () => {
  const dispatch = useDispatch();
  const saveData = useSelector(state => state.completedPuzzles);
  const showConnectModal = useSelector(state => state.showConnectModal);
  const [username, usernameUpdate] = useState("");
  const [password, passwordUpdate] = useState("");
  const [credentialsState, credentialsStateUpdate] = useState(true);

  const handleSubmit = () => {
    axios
      .post(backendAddress + "/auth/login", { username, password, saveData })
      .then(
        response => {
          localStorage.setItem("token", response.data.token);
          dispatch({ type: "SAVE_USER_DATA", value: response.data });
          dispatch({ type: "TOGGLE_CONNECT_MODAL" });
          toast("Welcome " + username + " :)");
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
        <form onSubmit={e => e.preventDefault()} className="modal">
          <h3>Username :</h3>
          <input
            type="text"
            value={username}
            onChange={e => {
              credentialsStateUpdate(true);
              usernameUpdate(e.target.value);
            }}
            className={!credentialsState ? "wrong" : undefined}
            autoFocus
          />
          <h3>Password :</h3>
          <input
            type="password"
            value={password}
            onChange={e => {
              credentialsStateUpdate(true);
              passwordUpdate(e.target.value);
            }}
            className={!credentialsState ? "wrong" : undefined}
          />
          {!credentialsState && (
            <p>
              Your credentials seems false,
              <br />
              Please retry.
            </p>
          )}
          <button type="submit" onClick={handleSubmit}>
            Connect
          </button>
          <h3
            onClick={() => {
              dispatch({ type: "SWITCH_MODAL" });
            }}
          >
            You don't own an account yet ?
          </h3>
        </form>
      </div>
    )
  );
};

export default ConnectModal;
