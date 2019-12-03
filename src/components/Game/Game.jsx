import React, { useState } from "react";
import "./Game.scss";
import GameInfo from "./GameInfo";
import LeftHints from "./LeftHints";
import puzzle from "./puzzle";
import Tile from "./Tile";
import TopHints from "./TopHints";

const Game = props => {
  const [dragStartStatus, dragStartStatusUpdate] = useState("empty");
  const gameHeight = puzzle.size.y;
  const gameWidth = puzzle.size.x;

  const changeStatusStart = firstChange => {
    dragStartStatusUpdate(firstChange);
  };
  const preventDefault = e => {
    e.preventDefault();
  };
  return (
    <div
      className="Game"
      onContextMenu={preventDefault}
      onDragStart={preventDefault}
      onDrop={preventDefault}
    >
      <GameInfo />
      <TopHints
        gameHeight={gameHeight}
        gameWidth={gameWidth}
        solutionTab={puzzle.solutionTab}
      />
      <LeftHints
        gameHeight={gameHeight}
        gameWidth={gameWidth}
        solutionTab={puzzle.solutionTab}
      />
      <div className="TileField">
        {puzzle.solutionTab.map((e, i) =>
          e.map((e, j) => (
            <Tile
              key={[i, j]}
              changeStatusStart={changeStatusStart}
              dragStartStatus={dragStartStatus}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Game;
