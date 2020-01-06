import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import "./style/SelectScreen.scss";

const SelectScreen = () => {
  const [BDD, setBDD] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:5000/puzzles")
      .then(res => {
        console.log(res);
        setBDD(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  return (
    <div className="SelectScreen">
      {BDD && BDD.map(e => <Card puzzleData={e} />)}
    </div>
  );
};

export default SelectScreen;
