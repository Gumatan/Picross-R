import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const GameInfo = ({ name, solutionString }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const tilesState = useSelector(state => state.tilesState);
  const gameStarted = useSelector(state => state.gameStarted);
  const [time, updateTime] = useState("");
  let startDate;
  let getTime;

  const startGame = () => {
    dispatch({ type: "START_GAME" });
    startDate = Date.now();
    getTime = setInterval(() => {
      const time = Date.now() - startDate;
      let min = Math.floor(time / 1000 / 60);
      let sec = Math.floor(time / 1000) % 60;
      min = min.toString();
      sec = sec.toString();
      min = min.length === 2 ? min : "0" + min;
      sec = sec.length === 2 ? sec : "0" + sec;
      updateTime({
        min,
        sec
      });
    }, 1000);
  };

  const attempt = () => {
    if (solutionString === tilesState) {
      dispatch({ type: "COMPLETED_PUZZLE" });
      history.push("/");
    } else {
      alert("oppsie :(");
    }
  };

  useEffect(() => {
    return () => clearInterval(getTime);
  }, []);

  return (
    <div className="GameInfo">
      <p>{name}</p>
      <p>{gameStarted && time ? `${time.min} : ${time.sec}` : "00 : 00"}</p>
      <button onClick={gameStarted ? attempt : startGame}>
        {gameStarted ? "Attempt" : "Start !"}
      </button>
    </div>
  );
};

export default GameInfo;
