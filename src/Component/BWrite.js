import React from "react";
import axios from "axios";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import "./css/BWrite.css";

const BWrite = ({ state }) => {
  let { context, password, subject } = state.boardWrite;
  let { plusListC } = state
  function onChangehandler(e) {
    switch (e.target.name) {
      case "subject":
        subject = e.target.value;
        break;

      case "password":
        password = e.target.value;
        break;

      case "context":
        context = e.target.value;
        break;

      default:
        break;
    }
    state.update(subject, context, password);
  }

  // 글자수 제한 넣기
  function check(AllLength) {
    if (AllLength.length < 1) {
      document.getElementById("validation-outlined-input").value = '';  // 비밀번호 초기화
      return false;
    }

    return true;
  }

  function onKeyDownHandler(e) {
    if (e.keyCode === 13) { // 13 = "ENTER"
      onClickhandle()
    }
  }

  async function onClickhandle() {
    if (check(`${subject}`) === false) {
      alert("제목을 입력하십시오.");
      return;
    }

    else if (check(`${context}`) === false) {
      alert("내용을 입력하십시오.");
      return;
    }

    else if (check(`${password}`) === false) {
      alert("비밀번호를 입력하십시오.");
      return;
    }

    else {

    }

    let list = [];
    await axios({
      url: "/DB/write",
      method: "post",
      data: {
        writer: `${state.id}`,
        context: `${context}`,
        subject: `${subject}`,
        password: `${password}`
      }
    })
      .then(() => {
        alert("저장완료!");
        window.location.href = "#boardlist"
      })
      .catch(() => {
        alert("저장실패");
      });

    await axios.post('/DB/getList', {
      idx: plusListC
    })
      .then(res => {
        list = res.data;
      })
      .catch(err => { });

    // 입력창 초기화
    document.getElementById("inputID1").value = '';
    document.getElementById("inputID2").value = '';
    document.getElementById("validation-outlined-input").value = '';

    state.loadList(list);
  }

  return (
    <div className="write" id="boardwrite">
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <TextareaAutosize
        rows={1}
        id="inputID1"
        aria-label="maximum height"
        placeholder="Title"
        className="textArea"
        name="subject"
        onChange={onChangehandler}
      />

      <TextareaAutosize
        rows={10}
        id="inputID2"
        aria-label="maximum height"
        placeholder="Context"
        className="textArea"
        name="context"
        onChange={onChangehandler}
      />

      <div className="contents-bottom">
        <ValidationTextField
          label="password"
          type="password"
          required
          placeholder="password"
          id="validation-outlined-input"
          className="textField"
          name="password"
          onChange={onChangehandler}
          onKeyDown={onKeyDownHandler}
        />
        
        <Button
          variant="contained"
          size="large"
          color="primary"
          className="button"
          onClick={onClickhandle}>
          저장
        </Button>
      </div>
    </div>
  );
};

const ValidationTextField = withStyles({
  root: {
    "& input:valid + fieldset": {
      borderColor: "green",
      borderWidth: 2
    },
    "& input:invalid + fieldset": {
      borderColor: "red",
      borderWidth: 2
    },
    "& input:valid:focus + fieldset": {
      borderLeftWidth: 6,
      padding: "4px !important" // override inline-style
    }
  }
})(TextField);

export default BWrite;