import React, { useState } from "react";
import "./Tile.scss";

const Tile = props => {
  const [status, statusUpdate] = useState("empty");

  const changeStatusStart = event => {
    event.preventDefault();
    props.changeStatusStart(status);
    if (status === "empty") {
      if (event.buttons === 1) {
        statusUpdate("full");
      } else if (event.buttons === 2) {
        statusUpdate("flaged");
      }
    } else if (status === "full") {
      if (event.buttons === 1) {
        statusUpdate("empty");
      }
    } else if (event.buttons === 2) {
      statusUpdate("empty");
    }
  };

  const changeStatus = event => {
    event.preventDefault();
    if (status === "empty" && props.dragStartStatus === "empty") {
      if (event.buttons === 1) {
        statusUpdate("full");
      } else if (event.buttons === 2) {
        statusUpdate("flaged");
      }
    } else if (status === "full" && props.dragStartStatus === "full") {
      if (event.buttons === 1) {
        statusUpdate("empty");
      }
    } else if (status === "flaged" && props.dragStartStatus === "flaged") {
      if (event.buttons === 2) {
        statusUpdate("empty");
      }
    }
  };

  let tyleStyle;
  switch (status) {
    case "empty":
      tyleStyle = { backgroundColor: "white" };
      break;
    case "full":
      tyleStyle = { backgroundColor: "#00cbff" };
      break;
    case "flaged":
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
      identifier={props.key}
      onMouseOver={changeStatus}
      onMouseDown={changeStatusStart}
      style={tyleStyle}
    ></div>
  );
};

export default Tile;
