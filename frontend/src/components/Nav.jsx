import React from "react";
import { Link } from "react-router-dom";
import "./Nav.scss";

const Nav = () => (
  <nav>
    <Link to="/">
      <img className="logo" src="/logo.jpeg" alt="PicrossR logo" />
      <h1>Picross-R</h1>
      <img className="reactLogo" src="/reactLogo.png" alt="React logo" />
    </Link>
    <div className="rightSide">
      <Link to="/Create">Ajouter un Puzzle</Link>
      <button>Inscription</button>
      <button>Connection</button>
    </div>
  </nav>
);
export default Nav;
