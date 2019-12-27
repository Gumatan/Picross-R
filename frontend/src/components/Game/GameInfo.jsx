import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const GameInfo = ({ name, solutionString }) => {
  const tilesState = useSelector(state => state.tilesState);
  const [time, updateTime] = useState(null);
  const [gameStarted, gameStartedUpdate] = useState(false);
  let startDate;
  let getTime;

  const startGame = () => {
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
    gameStartedUpdate(true);
  };

  const attempt = () => {
    if (solutionString === tilesState) {
      alert(
        `Félicitation tu as complété ${name} en ${time.min} minutes et ${time.sec} secondes !!`
      );
      console.log(
        `Félicitation tu as complété ${name} en ${time.min} minutes et ${time.sec} secondes !!`
      );
    } else {
      alert("oppsie :(");
      console.log("oppsie :(");
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
