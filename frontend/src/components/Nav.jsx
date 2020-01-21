import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ConnectModal from "./ConnectModal";
import RegisterModal from "./RegisterModal";
import "./style/Nav.scss";

const Nav = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  return (
    <nav>
      <Link to="/">
        <img className="logo" src="/logo.jpeg" alt="PicrossR logo" />
        <h1>Picross-R</h1>
        <img className="reactLogo" src="/reactLogo.png" alt="React logo" />
      </Link>
      {user.username ? (
        <div className="rightSide">
          <p>Signed in as {user.username}</p>
          {user.creator && <Link to="/create">Ajouter un Puzzle</Link>}
          <button
            onClick={() => {
              localStorage.removeItem("token");
              dispatch({ type: "DISCONNECT" });
              toast("Succesfully logged out, bye " + user.username);
            }}
          >
            Disconnect
          </button>
        </div>
      ) : (
        <div className="rightSide">
          <button
            onClick={() => {
              dispatch({ type: "TOGGLE_REGISTER_MODAL" });
            }}
          >
            Register
          </button>
          <button
            onClick={() => {
              dispatch({ type: "TOGGLE_CONNECT_MODAL" });
            }}
          >
            Connect
          </button>
          <RegisterModal />
          <ConnectModal />
        </div>
      )}
    </nav>
  );
};

export default Nav;
