import React from "react";
import "./style/Preview.scss";

const Preview = ({ id, solutionString }) => {
  const map = Array.prototype.map;
  return (
    <div className="Preview">
      {map.call(solutionString, (e, i) => {
        return (
          <div key={`${i}${id}`} className={e === "0" ? "empty" : "full"}></div>
        );
      })}
    </div>
  );
};

export default Preview;
