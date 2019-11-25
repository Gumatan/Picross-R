import React from "react";
import "./Game.scss";
import GameInfo from "./GameInfo";
import LeftHints from "./LeftHints";
import puzzle from "./puzzle";
import Tile from "./Tile";
import TopHints from "./TopHints";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DragStartStatus: "empty",
      gameHeight: puzzle.size.y, //Determining The size of the puzzle
      gameWidth: puzzle.size.x
    };
  }
  // determineHints() {
  //   //Horizontal Hints

  //
  //   return { hHint, vHint };
  // }

  // loadHints() {
  //   let hints = this.determineHints();
  //   let currentHint;

  //   for (let i = 0; i < this.state.gameHeight; i++) {
  //     for (let j = 0; j < hints.hHint[i].length; j++) {
  //       currentHint =
  //         "hHint" +
  //         i.toString() +
  //         "-" +
  //         (Math.ceil(this.state.gameWidth / 2) - 1 - j).toString();
  //       document.getElementById(currentHint).innerHTML =
  //         hints.hHint[i][hints.hHint[i].length - 1 - j];
  //     }
  //   }

  //   for (let i = 0; i < this.state.gameWidth; i++) {
  //     for (let j = 0; j < hints.vHint[i].length; j++) {
  //       currentHint =
  //         "vHint" +
  //         i.toString() +
  //         "-" +
  //         (Math.ceil(this.state.gameHeight / 2) - 1 - j).toString();
  //       document.getElementById(currentHint).innerHTML =
  //         hints.vHint[i][hints.vHint[i].length - 1 - j];
  //     }
  //   }
  // }
  // componentDidMount() {
  //   loadHints();
  // }

  changeStatusStart = firstChange => {
    this.setState({ DragStartStatus: firstChange });
  };
  preventDefault(e) {
    e.preventDefault();
  }
  render() {
    return (
      <div
        className="Game"
        onContextMenu={this.preventDefault}
        onDragStart={this.preventDefault}
        onDrop={this.preventDefault}
      >
        <GameInfo />
        <TopHints
          gameHeight={this.state.gameHeight}
          gameWidth={this.state.gameWidth}
          solutionTab={puzzle.solutionTab}
        />
        <LeftHints
          gameHeight={this.state.gameHeight}
          gameWidth={this.state.gameWidth}
          solutionTab={puzzle.solutionTab}
        />
        <div className="TileField">
          {puzzle.solutionTab.map((e, i) =>
            e.map((e, j) => (
              <Tile
                key={[i, j]}
                changeStatusStart={this.changeStatusStart}
                dragStartStatus={this.state.DragStartStatus}
              />
            ))
          )}
        </div>
      </div>
    );
  }
}

export default Game;
