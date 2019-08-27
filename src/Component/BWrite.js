import React from "react";
import axios from "axios";
import { Button, InputBase } from "@material-ui/core/";
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

    // 이것도 초기화
    subject = "";
    context = "";
    password = "";
    state.update(subject, context, password);  // 이거 다시 안해주니까 공백일때 버튼 누르면 이전값이 들어감

    state.loadList(list);
  }

  return (
    <div className="write">
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <div class="container-fluid bg-grey">
        <h1 className="text-center"> 글쓰기 </h1> <br/>
        <div className="row">
          <textarea
            className="form-control"
            id="inputID1"
            aria-label="maximum height"
            name="subject"
            onChange={onChangehandler}
            rows="1"
          />
          
          <textarea
            className="form-control"
            id="inputID2"
            aria-label="maximum height"
            name="context"
            onChange={onChangehandler}
            rows="15">
          </textarea>
        </div>
      </div>


      {/* <TextareaAutosize
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
      /> */}

      <div className="contents-bottom">
        <InputBase
          id="validation-outlined-input"
          type="password"
          placeholder="password"
          className="textField"
          name="password"
          
          onChange={onChangehandler}
          onKeyDown={onKeyDownHandler}
        />

        <Button
            className="button"
            variant="contained"
            color="secondary"
            onClick={onClickhandle}>
          저장
        </Button>

      </div>
    </div>
  );
};

export default BWrite;