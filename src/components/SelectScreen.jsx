import React from "react";
import Card from "./Card";
import "./SelectScreen.scss";

const BDD = [
  {
    id: 1,
    name: "Saucisson",
    creator: "Gum",
    size: { x: 10, y: 10 },
    solutionTab: [
      [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 1, 0, 0, 1, 1, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 0, 1, 0, 0],
      [0, 1, 1, 0, 1, 1, 1, 1, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
      [1, 0, 0, 1, 0, 1, 0, 0, 1, 0]
    ]
  }
];

class SelectScreen extends React.Component {
  render() {
    return (
      <div className="SelectScreen">
        {/* {BDD.map(e => (
          <Card {...e} />
        ))} */}
        <Card {...BDD[0]} />
        <Card {...BDD[0]} />
        <Card {...BDD[0]} />
        <Card {...BDD[0]} />
        <Card {...BDD[0]} />
        <Card {...BDD[0]} />
        <Card {...BDD[0]} />
      </div>
    );
  }
}

export default SelectScreen;
