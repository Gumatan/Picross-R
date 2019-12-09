import React from "react";
import Card from "./Card";
import "./SelectScreen.scss";

const SelectScreen = () => {
  const BDD = JSON.parse(
    JSON.stringify([
      {
        id: 1,
        name: "Saucisson",
        creator: "Gum",
        height: 10,
        width: 10,
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
      },
      {
        id: 1,
        name: "Redux",
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
      },
      {
        id: 1,
        name: "React",
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
      },
      {
        id: 1,
        name: "JavaScript",
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
    ])
  );

  return (
    <div className="SelectScreen">
      {BDD.map(e => (
        <Card puzzleData={e} />
      ))}
    </div>
  );
};

export default SelectScreen;
