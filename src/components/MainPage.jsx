import React from "react";
import SelectScreen from "./SelectScreen";
import Game from "./Game/Game";

class MainPage extends React.Component {
  render() {
    return (
      <div id="MainPage">
        <SelectScreen />
        <Game />
      </div>
    );
  }
}

export default MainPage;
