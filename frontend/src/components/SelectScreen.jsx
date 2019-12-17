import React from "react";
import Card from "./Card";
import "./SelectScreen.scss";

const SelectScreen = () => {
  const BDD = [
    {
      id: 1,
      name: "Saucisson",
      creator: "Gum",
      height: 10,
      width: 10,
      solutionString:
        "0000111000000101000000010100000010001000001001100001111101000110111100111111111110001000101001010010"
    },
    {
      id: 1,
      name: "Redux",
      creator: "Gum",
      height: 10,
      width: 10,
      solutionString:
        "0000111000000101000000010100000010001000001001100001111101000110111100111111111110001000101001010010"
    },
    {
      id: 1,
      name: "React",
      creator: "Gum",
      height: 10,
      width: 10,
      solutionString:
        "0000111000000101000000010100000010001000001001100001111101000110111100111111111110001000101001010010"
    },
    {
      id: 1,
      name: "JavaScript",
      creator: "Gum",
      height: 10,
      width: 10,
      solutionString:
        "0000111000000101000000010100000010001000001001100001111101000110111100111111111110001000101001010010"
    }
  ];

  return (
    <div className="SelectScreen">
      {BDD.map(e => (
        <Card puzzleData={e} />
      ))}
    </div>
  );
};

export default SelectScreen;
