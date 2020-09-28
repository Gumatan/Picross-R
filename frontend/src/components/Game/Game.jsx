import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import "../style/Game.scss";
import GameInfo from "./GameInfo";
import LeftHints from "./LeftHints";
import Tile from "./Tile";
import TopHints from "./TopHints";
import Axios from "axios";
const { backendAddress } = require("../../conf");

const Game = () => {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentPuzzleData = useSelector(state => state.currentPuzzleData);
  const gameStarted = useSelector(state => state.gameStarted);
  const [dragStartStatus, dragStartStatusUpdate] = useState("0");
  let { solutionString, name, height, width } = currentPuzzleData;
  const gameHeight = height;
  const gameWidth = width;

  const handleFirstStatusChange = firstChange => {
    dragStartStatusUpdate(firstChange);
  };
  const preventDefault = e => {
    e.preventDefault();
  };

  useEffect(() => {
    if (currentPuzzleData.id === -1)
      Axios.get(`${backendAddress}/puzzles?id=${id}`)
        .then(res => {
          if (res.data[0])
            dispatch({ type: "SELECT_PUZZLE", puzzleData: res.data[0] });
          else history.push("/");
        })
        .catch(err => {
          console.log(err);
        });
    return () => {
      dispatch({ type: "RESET_GAME" });
    };
  }, []);

  const map = Array.prototype.map;

  if (!gameStarted || !solutionString) solutionString = "";

  return (
    <div
      className="Game"
      onContextMenu={preventDefault}
      onDragStart={preventDefault}
      onDrop={preventDefault}
    >
      <GameInfo
        id={currentPuzzleData.id}
        name={name}
        solutionString={solutionString}
      />

      <TopHints
        gameHeight={gameHeight}
        gameWidth={gameWidth}
        solutionString={solutionString}
      />

      <LeftHints
        gameHeight={gameHeight}
        gameWidth={gameWidth}
        solutionString={solutionString}
      />

      <div className="TileField">
        {solutionString ? (
          map.call(solutionString, (e, i) => (
            <Tile
              key={i}
              id={i}
              sendFirstStatusChange={handleFirstStatusChange}
              dragStartStatus={dragStartStatus}
            />
          ))
        ) : (
            <img src="/questionMark-static.jpg" alt="" />
          )}
      </div>
    </div>
  );
};

export default Game;
