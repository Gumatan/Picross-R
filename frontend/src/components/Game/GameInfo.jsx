import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
const { backendAddress } = require("../../conf");

const GameInfo = ({ id, name, solutionString }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const tilesState = useSelector(state => state.tilesState);
  const gameStarted = useSelector(state => state.gameStarted);
  const jwt = useSelector(state => state.jwt);
  const completedPuzzles = useSelector(state => state.completedPuzzles);

  const [time, updateTime] = useState({ min: "00", sec: "00" });
  let startDate = React.useRef(null);
  let getTime = React.useRef(null);

  const startGame = () => {
    startDate.current = Date.now();
    getTime.current = setInterval(() => {
      const time = Date.now() - startDate.current;
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
    dispatch({ type: "START_GAME" });
  };

  const attempt = () => {
    if (solutionString === tilesState.replace(/2/g, "0")) {
      if (jwt !== null && !completedPuzzles.includes(id)) {
        const body = {
          saveData: [...completedPuzzles, id]
        };
        axios
          .put(backendAddress + "/savedata", body)
          .then(res => { })
          .catch(err => {
            console.log(err);
          });
      }
      dispatch({ type: "COMPLETED_PUZZLE" });
      history.push("/");
      toast(
        "You completed " +
        name +
        " in " +
        (time.min !== "00" ? time.min + " min and " : "") +
        time.sec +
        " sec"
      );
    } else {
      alert("oppsie :(");
    }
  };

  useEffect(() => {
    return () => {
      clearInterval(getTime.current);
    };
  }, []);

  return (
    <div className="GameInfo">
      <p>{gameStarted && time ? `${time.min} : ${time.sec}` : "00 : 00"}</p>
      <button onClick={gameStarted ? attempt : startGame}>
        {gameStarted ? "Attempt" : "Start !"}
      </button>
    </div>
  );
};

export default GameInfo;
