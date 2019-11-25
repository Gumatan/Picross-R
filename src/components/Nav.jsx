import React from "react";
import "./Nav.scss";

const Nav = () => (
  <nav>
    <img className="logo" src="logo.jpeg" alt="PicrossR logo" />
    <h1>Picross-R</h1>
    <img className="reactLogo" src="reactLogo.png" alt="React logo" />
    <div className="login">
      <button>Inscription</button>
      <button>Connection</button>
    </div>
  </nav>
);
export default Nav;
