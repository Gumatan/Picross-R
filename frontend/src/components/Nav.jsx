import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import { toast } from "react-toastify";
import ConnectModal from "./ConnectModal";
import RegisterModal from "./RegisterModal";
import "./style/Nav.scss";

const Nav = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [isBurgerOpen, isBurgerOpenUpdate] = useState(false);
  const isMenuOpen = state => {
    isBurgerOpenUpdate(state.isOpen);
    return state.isOpen;
  };
  return (
    <nav className="Nav">
      <Link to="/">
        <img className="logo" src="/logo.jpeg" alt="PicrossR logo" />
        <h1>Picross-R</h1>
        <img className="reactLogo" src="/reactLogo.png" alt="React logo" />
      </Link>
      {user.username ? (
        <React.Fragment>
          <div className="rightSide">
            <p>Signed in as {user.username}</p>
            {user.creator && <Link to="/create">Create a Puzzle</Link>}
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
          <div className="rightSideMobile">
            <Menu
              right
              isOpen={isBurgerOpen}
              onStateChange={isMenuOpen}
              disableAutoFocus
            >
              <p>Signed in as {user.username}</p>
              {user.creator && (
                <Link
                  to="/create"
                  onClick={() => {
                    isBurgerOpenUpdate(false);
                  }}
                >
                  Create a Puzzle
                </Link>
              )}
              <button
                onClick={() => {
                  isBurgerOpenUpdate(false);
                  localStorage.removeItem("token");
                  dispatch({ type: "DISCONNECT" });
                  toast("Succesfully logged out, bye " + user.username);
                }}
              >
                Disconnect
              </button>
            </Menu>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
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
          </div>
          <div className="rightSideMobile">
            <Menu right isOpen={isBurgerOpen} onStateChange={isMenuOpen}>
              <button
                onClick={() => {
                  isBurgerOpenUpdate(false);
                  dispatch({ type: "TOGGLE_REGISTER_MODAL" });
                }}
              >
                Register
              </button>
              <button
                onClick={() => {
                  isBurgerOpenUpdate(false);
                  dispatch({ type: "TOGGLE_CONNECT_MODAL" });
                }}
              >
                Connect
              </button>
            </Menu>
          </div>
          <RegisterModal />
          <ConnectModal />
        </React.Fragment>
      )}
    </nav>
  );
};

export default Nav;
