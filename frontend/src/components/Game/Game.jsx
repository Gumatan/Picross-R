import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Game.scss";
import GameInfo from "./GameInfo";
import LeftHints from "./LeftHints";
import Tile from "./Tile";
import TopHints from "./TopHints";

const Game = () => {
  const dispatch = useDispatch();
  const currentPuzzleData = useSelector(state => state.currentPuzzleData);
  const [dragStartStatus, dragStartStatusUpdate] = useState("0");
  const { solutionString, name, height, width } = currentPuzzleData;
  const gameHeight = height;
  const gameWidth = width;

  const handleFirstStatusChange = firstChange => {
    dragStartStatusUpdate(firstChange);
  };
  const preventDefault = e => {
    e.preventDefault();
  }
  
  useEffect(() => {
    return () => {
      dispatch({ type: "RESET_TILES_STATUS" });
    };
  });

  const map = Array.prototype.map;

  return (
    <div
      className="Game"
      onContextMenu={preventDefault}
      onDragStart={preventDefault}
      onDrop={preventDefault}
    >
      <GameInfo name={name} />
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
        {solutionString &&
          map.call(solutionString, (e, i) => (
            <Tile
              key={i}
              id={i}
              sendFirstStatusChange={handleFirstStatusChange}
              dragStartStatus={dragStartStatus}
            />
          ))}
      </div>
    </div>
  );
};

export default Game;

