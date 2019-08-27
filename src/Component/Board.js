import React from "react";
import BList from "./BList";
import BView from "./BView";
import BWrite from "./BWrite";
import "./css/board.css";
const Board = ({ state }) => {
  const show = () => {
    return state.selectedListIndex === -1 ? <div /> : <div><BView state={state} /> <div id="boardwrite1" /></div>
  };

  return (
    <div className="board">

      <div id="boardlist" />
      <BList state={state} />
      <div id="boardview" />
      {show()}
      <BWrite state={state} />

    </div>
  );
};

export default Board;