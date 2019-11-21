import React from "react";
import Card from "./Card";
import Game from "./Game";
import "./Main.css";
class Main extends React.Component {
  render() {
    return (
      <div id="Main">
        <Card />
        <Game />
      </div>
    );
  }
}

export default Main;
