import React from "react";

class TopHints extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topHints: null
    };
  }

  determineHints() {
    let topHints = new Array(this.props.gameWidth)
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

        if (this.props.solutionTab[j][i] === 1) {
          //If current Cell == 1
          topHints[i][currentHintIndex] = currentValue; //Increment related Hint
          currentValue += 1; //^

          if (
            this.props.solutionTab[j + 1] &&
            this.props.solutionTab[j + 1][i] === 0
          ) {
            //If next cell in row exists and is equal to 0

            currentHintIndex += 1; //Start a new hint for the row
            currentValue = 1; //And reset it's value
          }
        }
      }
    }
    topHints = topHints.map(item => item.filter(values => values !== 0)); //removing 0's in hints
    this.setState({ topHints: topHints });
  }

  componentDidMount() {
    this.determineHints();
  }

  render() {
    return (
      <div className="TopHints">
        {this.state.topHints &&
          this.state.topHints.map(e => (
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

export default TopHints;
