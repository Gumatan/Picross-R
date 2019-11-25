import React from "react";
import "./Tile.scss";

class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { status: "empty" };
  }

  changeStatusStart = event => {
    event.preventDefault();
    this.props.changeStatusStart(this.state.status);
    if (this.state.status === "empty") {
      if (event.buttons === 1) {
        this.setState({ status: "full" });
      } else if (event.buttons === 2) {
        this.setState({ status: "flaged" });
      }
    } else if (this.state.status === "full") {
      if (event.buttons === 1) {
        this.setState({ status: "empty" });
      }
    } else if (event.buttons === 2) {
      this.setState({ status: "empty" });
    }
  };

  changeStatus = event => {
    event.preventDefault();
    if (
      this.state.status === "empty" &&
      this.props.dragStartStatus === "empty"
    ) {
      if (event.buttons === 1) {
        this.setState({ status: "full" });
      } else if (event.buttons === 2) {
        this.setState({ status: "flaged" });
      }
    } else if (
      this.state.status === "full" &&
      this.props.dragStartStatus === "full"
    ) {
      if (event.buttons === 1) {
        this.setState({ status: "empty" });
      }
    } else if (
      this.state.status === "flaged" &&
      this.props.dragStartStatus === "flaged"
    ) {
      if (event.buttons === 2) {
        this.setState({ status: "empty" });
      }
    }
  };

  render() {
    let tyleStyle;
    switch (this.state.status) {
      case "empty":
        tyleStyle = { backgroundColor: "white" };
        break;
      case "full":
        tyleStyle = { backgroundColor: "#00cbff" };
        break;
      case "flaged":
        tyleStyle = {
          background: "white url(/cross.png) center no-repeat"
        };
        break;
      default:
        break;
    }
    return (
      <div
        className="Tile"
        identifier={this.props.key}
        onMouseOver={this.changeStatus}
        onMouseDown={this.changeStatusStart}
        style={tyleStyle}
      ></div>
    );
  }
}

export default Tile;
