import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./style/Game.scss";
import Tile from "./Game/Tile";

const CreatePuzzle = () => {
  const dispatch = useDispatch();
  const currentPuzzleData = useSelector(state => state.currentPuzzleData);
  const [dragStartStatus, dragStartStatusUpdate] = useState("0");

  const handleFirstStatusChange = firstChange => {
    dragStartStatusUpdate(firstChange);
  };

  const preventDefault = e => {
    e.preventDefault();
  };

  useEffect(() => {
    return () => {
      dispatch({ type: "RESET_TILES_STATUS" });
    };
  }, []);

  const map = Array.prototype.map;

  return (
    <div className="CreatePuzzle">
      <div
        className="TileField"
        onContextMenu={preventDefault}
        onDragStart={preventDefault}
        onDrop={preventDefault}
      >
        {map.call(new Array(100), (e, i) => (
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
