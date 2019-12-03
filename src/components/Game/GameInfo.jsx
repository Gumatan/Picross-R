import React, { useState, useEffect } from "react";

const GameInfo = () => {
  const [time, updateTime] = useState(null);
  const [gameStarted, gameStartedUpdate] = useState(false);
  let startDate;
  let getTime;

  const startGame = () => {
    startDate = Date.now();
    getTime = setInterval(() => {
      const time = Date.now() - startDate;
      console.log(time);
      updateTime({
        min: Math.floor(time / 1000 / 60),
        sec: Math.floor(time / 1000) % 60
      });
    }, 1000);
    gameStartedUpdate(true);
  };

  useEffect(() => {
    return clearInterval(getTime);
  }, [getTime]);

  return (
    <div className="GameInfo">
      <p>{gameStarted && time ? `${time.min} : ${time.sec}` : "0 : 0"}</p>
      <button onClick={gameStarted ? () => alert("dab") : startGame}>
        {gameStarted ? "Attempt" : "Start !"}
      </button>
    </div>
  );
};

export default GameInfo;
