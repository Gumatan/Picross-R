import React from "react";
import "./style/Preview.scss";

const Preview = ({ solutionString }) => {
  const map = Array.prototype.map;
  return (
    <div className="Preview">
      {map.call(solutionString, e => {
        return <div className={e === "0" ? "empty" : "full"}></div>;
      })}
    </div>
  );
};

export default Preview;
