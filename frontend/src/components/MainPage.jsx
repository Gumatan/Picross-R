import React from "react";
import { Switch, Route } from "react-router-dom";
import SelectScreen from "./SelectScreen";
import Game from "./Game/Game";

const MainPage = () => {
  return (
    <div id="MainPage">
      <Switch>
        <Route exact path="/" component={SelectScreen} />
        <Route path="/Game" component={Game} />
      </Switch>
    </div>
  );
};

export default MainPage;
