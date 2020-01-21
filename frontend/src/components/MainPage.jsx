import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import SelectScreen from "./SelectScreen";
import CreatePuzzle from "./CreatePuzzle";
import Game from "./Game/Game";

const MainPage = () => {
  const jwt = useSelector(state => state.jwt);
  const user = useSelector(state => state.user);
  return (
    <div id="MainPage">
      <Switch>
        <Route exact path="/" component={SelectScreen} />
        <Route
          path="/create"
          render={() =>
            jwt && user.creator ? <CreatePuzzle /> : <Redirect to="/" />
          }
        />
        <Route path="/game/:id" component={Game} />
      </Switch>
    </div>
  );
};

export default MainPage;
