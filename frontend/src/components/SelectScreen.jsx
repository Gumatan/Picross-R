import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import "./style/SelectScreen.scss";
const { backendAddress } = require("../conf");

const SelectScreen = () => {
  const [BDD, setBDD] = useState(null);

  useEffect(() => {
    axios
      .get(backendAddress + "/puzzles")
      .then(res => {
        setBDD(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className="SelectScreen">
      {BDD && BDD.map(e => <Card key={e.id} puzzleData={e} />)}
    </div>
  );
};

export default SelectScreen;
