import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import "./style/CreatePuzzle.scss";
import LeftHints from "./Game/LeftHints";
import Tile from "./Game/Tile";
import TopHints from "./Game/TopHints";
const { backendAddress } = require("../conf");

const CreatePuzzle = () => {
  const dispatch = useDispatch();
  const tilesState = useSelector(state => state.tilesState);
  const [puzzleName, puzzleNameUpdate] = useState("");
  const [creator, creatorUpdate] = useState("");
  const [posted, postedUpdate] = useState(false);
  const [puzzleCreated, puzzleCreatedUpdate] = useState(false);
  const [dragStartStatus, dragStartStatusUpdate] = useState("0");

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

  const post = () => {
    postedUpdate(true);

    const data = {
      name: puzzleName,
      creator: creator,
      height: 10,
      width: 10,
      solutionString: tilesState
    };

    axios.post(backendAddress + "/puzzles", data).then(
      response => {
        puzzleCreatedUpdate(true);
      },
      error => {
        console.log(error);
      }
    );
  };

  const map = Array.prototype.map;

  return (
    <div className="CreatePuzzle">
      {puzzleCreated && <Redirect to="/" />}
      <div className="NewPuzzleInfo">
        <input
          placeholder="Puzzle name"
          value={puzzleName}
          onChange={e => {
            puzzleNameUpdate(e.target.value);
          }}
          type="text"
        />
        <input
          placeholder="Createur"
          value={creator}
          onChange={e => {
            creatorUpdate(e.target.value);
          }}
          type="text"
        />
        <button onClick={!posted && post}>POSTE !</button>
      </div>
      <TopHints gameHeight={10} gameWidth={10} solutionString={tilesState} />
      <LeftHints gameHeight={10} gameWidth={10} solutionString={tilesState} />
      <div
        className="TileField"
        onContextMenu={preventDefault}
        onDragStart={preventDefault}
        onDrop={preventDefault}
      >
        {map.call([...new Array(100)], (e, i) => (
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

export default CreatePuzzle;
