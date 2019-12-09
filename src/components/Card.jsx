import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const Card = ({ puzzleData }) => {
  const dispatch = useDispatch();

  const { id, name, creator } = puzzleData;
  return (
    <div
      className="Card"
      onClick={() => {
        dispatch({ type: "SELECT_PUZZLE", puzzleData });
      }}
    >
      <Link to={`/game/${id}`}>
        <h3>{name}</h3>
        <div className="puzzlePreview">
          <img src="/questionMark-static.jpg" alt="" />
        </div>
        <p>Creator : {creator}</p>
      </Link>
    </div>
  );
};

export default Card;
