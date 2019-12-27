import React, { useState, useEffect } from "react";

const LeftHints = ({ solutionString, gameHeight, gameWidth }) => {
  const [leftHints, leftHintsUpdate] = useState(null);

  const determineHints = () => {
    let hints = new Array(gameWidth)
      .fill(0)
      .map(() => new Array(Math.ceil(gameHeight / 2)).fill(0)); //Custom double entry array to the size of the game
    let currentHintIndex;
    let currentValue;

    for (let i = 0; i < gameHeight; i++) {
      //For each row
      currentHintIndex = 0;
      currentValue = 1;

      for (let j = 0; j < gameWidth; j++) {
        //For each cell in row

        if (solutionString[i * 10 + j] === "1") {
          //If current Cell == 1
          hints[i][currentHintIndex] = currentValue; //Increment related Hint
          currentValue += 1; //^

          if (solutionString[i * 10 + j + 1] === "0") {
            //If next cell in row is equal to 0

            currentHintIndex += 1; //Start a new hint for the row
            currentValue = 1; //And reset it's value
          }
        }
      }
    }
    hints = hints.map(item => item.filter(values => values !== 0)); //removing 0's in hints
    leftHintsUpdate(hints);
  };

  useEffect(() => {
    determineHints();
  }, []);

  return (
    <div className="LeftHints">
      {leftHints &&
        leftHints.map(e => (
          <div>
            {e.map(n => (
              <div>{n}</div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default LeftHints;
