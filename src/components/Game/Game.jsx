import React, { useState } from "react";
import { connect } from "react-redux";
import "./Game.scss";
import GameInfo from "./GameInfo";
import LeftHints from "./LeftHints";
import puzzle from "./puzzle";
import Tile from "./Tile";
import TopHints from "./TopHints";

const Game = ({ currentPuzzleData }) => {
  const [dragStartStatus, dragStartStatusUpdate] = useState("empty");
  const { solutionTab, name } = currentPuzzleData;
  const gameHeight = puzzle.size.y;
  const gameWidth = puzzle.size.x;

  const handleFirstStatusChange = firstChange => {
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
      <GameInfo name={name} />
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
        {solutionTab.map((e, i) =>
          e.map((e, j) => (
            <Tile
              key={i * 10 + j}
              id={i * 10 + j}
              sendFirstStatusChange={handleFirstStatusChange}
              dragStartStatus={dragStartStatus}
            />
          ))
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    currentPuzzleData: state.currentPuzzleData
  };
};

export default connect(mapStateToProps)(Game);
