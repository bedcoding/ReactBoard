import React from "react";
import BList from "./BList";
import BView from "./BView";
import BWrite from "./BWrite";
import BoardHeader from "./BoardHeader";
import "./css/board.css";
const Board = ({ state }) => {
  const show = () => {
    return state.selectedListIndex === -1 ? <div /> : <div><BView state={state}/></div>
  };

  
  return (  
    <div>
      <BoardHeader />
      <div className="board">
        <div id="boardlist" />
        
        <BList state={state} />
        
        <div id="boardview" />

        {show()}
        
        <div id="boardwrite"/>
        <BWrite state={state} />
        <div className="boardbottom" />
      </div>
    </div>
  );
};

export default Board;