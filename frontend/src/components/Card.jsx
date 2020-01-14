import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Preview from "./Preview";

const Card = ({ puzzleData }) => {
  const dispatch = useDispatch();
  const completedPuzzles = useSelector(state => state.completedPuzzles);
  const [playAnim, playAnimUpdate] = useState(false);
  const { id, name, creator, solutionString } = puzzleData;

  useEffect(() => {
    if (!playAnim && completedPuzzles[completedPuzzles.length - 1] === id) {
      playAnimUpdate(true);
      setTimeout(() => {
        playAnimUpdate(false);
      }, 3000);
    }
  }, [completedPuzzles]);

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
          {playAnim ? (
            <img src="/questionMark.gif" alt="" />
          ) : completedPuzzles.includes(id) ? (
            <Preview solutionString={solutionString} />
          ) : (
            <img src="/questionMark-static.jpg" alt="" />
          )}
        </div>
        <p>Createur : {creator}</p>
      </Link>
    </div>
  );
};

export default Card;
