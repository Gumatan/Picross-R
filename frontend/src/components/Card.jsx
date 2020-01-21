import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Preview from "./Preview";

const Card = ({ puzzleData }) => {
  const dispatch = useDispatch();
  const completedPuzzles = useSelector(state => state.completedPuzzles);
  const pendingAnims = useSelector(state => state.pendingAnims);
  const [playAnim, playAnimUpdate] = useState(false);
  const { id, name, creator, solutionString } = puzzleData;

  useEffect(() => {
    if (!playAnim && pendingAnims.includes(id)) {
      playAnimUpdate(true);
      setTimeout(() => {
        playAnimUpdate(false);
        dispatch({ type: "PLAYED_ANIM", id });
      }, 3000);
    }
  }, [completedPuzzles]);
  const completed = completedPuzzles.includes(id);
  return (
    <div
      className="Card"
      onClick={() => {
        dispatch({ type: "SELECT_PUZZLE", puzzleData });
      }}
    >
      <Link to={`/game/${id}`}>
        <h3>{completed ? name : "???"}</h3>
        <div className="puzzlePreview">
          {playAnim ? (
            <img src="/questionMark.gif" alt="" />
          ) : completed ? (
            <Preview id={id} solutionString={solutionString} />
          ) : (
            <img src="/questionMark-static.jpg" alt="" />
          )}
        </div>
        <p>Creator : {creator}</p>
      </Link>
    </div>
  );
};

export default Card;
