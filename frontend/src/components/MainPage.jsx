import React from "react";
import { Switch, Route } from "react-router-dom";
import SelectScreen from "./SelectScreen";
import CreatePuzzle from "./CreatePuzzle";
import Game from "./Game/Game";

const MainPage = () => {
  return (
    <div id="MainPage">
      <Switch>
        <Route exact path="/" component={SelectScreen} />
        <Route path="/Create" component={CreatePuzzle} />
        <Route path="/Game" component={Game} />
      </Switch>
    </div>
  );
};

export default MainPage;
