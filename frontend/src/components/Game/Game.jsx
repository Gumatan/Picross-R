import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../style/Game.scss";
import GameInfo from "./GameInfo";
import LeftHints from "./LeftHints";
import Tile from "./Tile";
import TopHints from "./TopHints";

const Game = () => {
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
      <GameInfo name={name} solutionString={solutionString} />

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
