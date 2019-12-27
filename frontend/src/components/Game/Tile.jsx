import React from "react";
import { useSelector, useDispatch } from "react-redux";

const Tile = ({ sendFirstStatusChange, dragStartStatus, id }) => {
  const status = useSelector(state => state.tilesState[id]);
  const dispatch = useDispatch();
  const changeStatusStart = event => {
    event.preventDefault();
    sendFirstStatusChange(status);
    if (status === "0") {
      if (event.buttons === 1) {
        dispatch({ type: "UPDATE_TILE", newStatus: "1", id });
      } else if (event.buttons === 2) {
        dispatch({ type: "UPDATE_TILE", newStatus: "2", id });
      }
    } else if (status === "1") {
      if (event.buttons === 1) {
        dispatch({ type: "UPDATE_TILE", newStatus: "0", id });
      }
    } else if (event.buttons === 2) {
      dispatch({ type: "UPDATE_TILE", newStatus: "0", id });
    }
  };

  const changeStatus = event => {
    event.preventDefault();
    if (status === "0" && dragStartStatus === "0") {
      if (event.buttons === 1) {
        dispatch({ type: "UPDATE_TILE", newStatus: "1", id });
      } else if (event.buttons === 2) {
        dispatch({ type: "UPDATE_TILE", newStatus: "2", id });
      }
    } else if (status === "1" && dragStartStatus === "1") {
      if (event.buttons === 1) {
        dispatch({ type: "UPDATE_TILE", newStatus: "0", id });
      }
    } else if (status === "2" && dragStartStatus === "2") {
      if (event.buttons === 2) {
        dispatch({ type: "UPDATE_TILE", newStatus: "0", id });
      }
    }
  };

  let tyleStyle;
  switch (status) {
    case "0":
      tyleStyle = { backgroundColor: "white" };
      break;
    case "1":
      tyleStyle = { backgroundColor: "#00cbff" };
      break;
    case "2":
      tyleStyle = {
        background: "white url(/cross.png) center no-repeat"
      };
      break;
    default:
      break;
  }
  return (
    <div
      className="Tile"
      identifier={id}
      onMouseOver={changeStatus}
      onMouseDown={changeStatusStart}
      style={tyleStyle}
    ></div>
  );
};

export default Tile;
