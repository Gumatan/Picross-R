import React from "react";
import { Link } from "react-router-dom";

const Card = props => {
  return (
    <div className="Card">
      <Link to={`/game/${props.id}`}>
        <h3>{props.name}</h3>
        <div className="puzzlePreview">
          <img src="/questionMark-static.jpg" alt="" />
        </div>
        <p>Creator : {props.creator}</p>
      </Link>
    </div>
  );
};

export default Card;
