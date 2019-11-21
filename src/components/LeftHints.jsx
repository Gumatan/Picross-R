import React from "react";
import "./LeftHints.scss";

class LeftHints extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leftHints: null
    };
  }

  determineHints() {
    let leftHints = new Array(this.props.gameWidth)
      .fill(0)
      .map(() => new Array(Math.ceil(this.props.gameHeight / 2)).fill(0)); //Custom double entry array to the size of the game
    let currentHintIndex;
    let currentValue;

    for (let i = 0; i < this.props.gameHeight; i++) {
      //For each row
      currentHintIndex = 0;
      currentValue = 1;

      for (let j = 0; j < this.props.gameWidth; j++) {
        //For each cell in row

        if (this.props.solutionTab[i][j] === 1) {
          //If current Cell == 1
          leftHints[i][currentHintIndex] = currentValue; //Increment related Hint
          currentValue += 1; //^

          if (this.props.solutionTab[i][j + 1] === 0) {
            //If next cell in row is equal to 0

            currentHintIndex += 1; //Start a new hint for the row
            currentValue = 1; //And reset it's value
          }
        }
      }
    }
    leftHints = leftHints.map(item => item.filter(values => values !== 0)); //removing 0's in hints
    this.setState({ leftHints: leftHints });
  }

  componentDidMount() {
    this.determineHints();
  }

  render() {
    return (
      <div className="LeftHints">
        {this.state.leftHints &&
          this.state.leftHints.map(e => (
            <div>
              {e.map(n => (
                <div>{n}</div>
              ))}
            </div>
          ))}
      </div>
    );
  }
}

export default LeftHints;
