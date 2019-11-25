import React, { useState, useEffect } from "react";
import "./GameInfo.scss";

const GameInfo = () => {
  const [time, updateTime] = useState({ min: 0, sec: 0 });
  let startDate;
  let getTime;
  useEffect(() => {
    return clearInterval(getTime);
  }, [getTime]);

  const startGame = () => {
    startDate = Date.now();
    getTime = setInterval(() => {
      const time = Date.now() - startDate;
      console.log(time);
      updateTime({ min: 0, sec: parseInt(time / 1000) });
    }, 1000);
  };
  return (
    <div className="GameInfo">
      <p>
        {time.min} : {time.sec}
      </p>
      <button onClick={startGame}>Start !</button>
    </div>
  );
};

export default GameInfo;
