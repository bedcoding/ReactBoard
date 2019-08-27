import React from "react";
import "./css/BView.css";
import axios from "axios";

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { Button, InputBase } from "@material-ui/core/";
import DeleteIcon from "@material-ui/icons/Delete";

const BView = ({ state }) => {
  let {
    boardList,
    boardView,
    plusListC,
    selectedListIndex,
    selectedListNumber
  } = state;

  const { del } = state;
  let password = "";
  boardView.password = boardList[selectedListIndex].password;
  boardView.idx = boardList[selectedListIndex].idx;
  boardView.subject = boardList[selectedListIndex].subject;
  boardView.context = boardList[selectedListIndex].context;
  boardView.writer = boardList[selectedListIndex].writer;

  const onClickHandler = async () => {
    console.log("비밀번호: ");
    console.log(boardView.password);

    if (boardView.password === password) {
      await axios
        .post(`http://localhost:4000/DB/delete`, {
          idx: `${selectedListNumber}`
        })
        .then(response => {
          alert("삭제되었습니다.");
          window.location.href = "#boardlist";
          selectedListIndex = -1;
        })
        .catch(response => {
          alert("DB접속오류");
        })

      await axios
        .post("/DB/getList", {
          idx: plusListC
        })
        .then(res => {
          boardList = res.data;
        });

      await del(boardList, boardView, selectedListIndex);
      boardView = {};

    } else {
      alert("비밀번호가 다릅니다");
      let input = document.getElementById("inputID");
      input.value = "";
    }
  };

  function onKeyDownHandler(e) {
    if (e.keyCode === 13) { // 13 = "ENTER"
      onClickHandler()
    }
  }

  const onChangeHandler = e => {
    password = e.target.value;
  };

  let i = 0;  // 밑에 map 함수에서 "key값 없다"고 warning 뜨는게 꼴보기 싫어서 선언

  return (
    <div>
      <div className="contents-bigbox">
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell> 제목: {boardView.subject} </TableCell>
            </TableRow>

            <TableRow>
              <TableCell> 글쓴이: {boardView.writer} </TableCell>
            </TableRow>
          </TableHead>
        </Table>

        <div id="contents-smallbox">
          {boardView.context.split("\n").map(line => {
            return <div key={++i}> {line} <br></br> </div>;
          })}
        </div>

        <div id="contents-bottom">
          <InputBase
            type="password"
            id="inputID"
            onChange={onChangeHandler}
            placeholder="비밀번호 입력"
            onKeyDown={onKeyDownHandler}>
          </InputBase>

          <Button
            className="button"
            variant="contained"
            color="secondary"
            onClick={onClickHandler}>
            삭제
            <DeleteIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BView;