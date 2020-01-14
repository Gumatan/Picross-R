import React, { useState, useEffect } from "react";

const TopHints = ({ solutionString, gameHeight, gameWidth }) => {
  const [topHints, topHintsUpdate] = useState(null);

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

        if (solutionString[j * 10 + i] === "1") {
          //If current Cell == 1
          hints[i][currentHintIndex] = currentValue; //Increment related Hint
          currentValue += 1; //^

          if (
            solutionString[j * 10 + 10] &&
            solutionString[j * 10 + 10 + i] === "0"
          ) {
            //If next cell in row exists and is equal to 0
            currentHintIndex += 1; //Start a new hint for the row
            currentValue = 1; //And reset it's value
          }
        }
      }
    }
    hints = hints.map(item => item.filter(values => values !== 0)); //removing 0's in hints
    topHintsUpdate(hints);
  };

  useEffect(() => {
    determineHints();
  }, [solutionString]);

  return (
    <div className="TopHints">
      {topHints &&
        topHints.map(e => (
          <div>
            {e.map(n => (
              <div>{n}</div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default TopHints;
