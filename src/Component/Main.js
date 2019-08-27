import React, { Component } from "react";
import Board from "./Board";
import Login from "./Login";
import { connect } from "react-redux";
import axios from "axios";
// import "./css/board.css";

class Main extends Component {
  pageChange = () => { 
    return !this.props.didlogin 
    ? (<Login state={this.props}/>) 
    : (<Board state={this.props}/>);
  };

  async componentDidMount() {
    let list = [];
    await axios
      .post("/DB/getList", {
        idx: this.props.plusListC
      })
      .then(res => {
        list = res.data;
      })
      .catch(err => { });

    this.props.loadList(list);
  }

  render() {
    return (
      <div id="page-top">
        {this.pageChange()}
      </div>
    );
  }
}

// state의 초기값: init
const init = {
  id: "",
  didlogin: false,

  selectedListNumber: -1, // 글 번호
  selectedListIndex: -1, // 위에서부터 인덱스
  itemCount: -1,
  plusListC: 15,
  
  // 글목록
  boardList: [],

  boardView: {
    idx: "",
    subject: "",
    context: "",
    writer: "",
    password: ""
  },

  boardWrite: {
    subject: "",
    context: "",
    password: ""
  }
};

// 글보기를 누를 경우: selectedId변경
const view = (selectedListIndex, selectedListNumber) => {
  return {
    selectedListIndex: selectedListIndex,
    selectedListNumber: selectedListNumber
  };
};

// 글쓰기
const plusList = (plusListC, boardList) => {
  return {
    plusListC: plusListC,
    boardList: boardList
  };
};

// 글삭제
const del = (boardList, boardView, selectedListIndex) => {
  return {
    boardList: boardList,
    boardView: boardView,
    selectedListIndex: selectedListIndex
  };
};

// ID넣기
const setID = (id, didlogin) => {
  return {
    id: id,
    didlogin: didlogin
  };
};

const update = (subject, context, password) => {
  return {
    subject: subject,
    context: context,
    password: password
  };
};

// 디스패치: 부모로부터 - 사용할 함수들을 받아옴 (우리가 쓸 함수들을 넣어줌)
// 이 return: 디스패치에 넣어준다는 것
const mDTP = dispatch => {
  return {
    view: (idx, number) => {
      dispatch({
        type: "VIEW",
        selectedListIndex: idx,
        selectedListNumber: number
      });
    },

    plusList: (plusListC, boardList) => {
      dispatch({
        type: "PLUSLIST",
        plusListC: plusListC,
        boardList: boardList
      });
    },

    del: (boardList, boardView, selectedListIndex) => {
      dispatch({
        type: "DEL",
        boardList: boardList,
        boardView: boardView,
        selectedListIndex: selectedListIndex
      });
    },

    setID: (id, didlogin) => {
      dispatch({ type: "SETID", id: id, didlogin: didlogin }); // 함수를 실행한 것
    },

    loadList: list => {
      dispatch({ type: "LOADLIST", list: list });
    },

    update: (subject, context, password) => {
      dispatch({
        type: "UPDATE",
        subject: subject,
        context: context,
        password: password
      });
    }
  };
};

// state 초기값 설정: 만약 매개변수에 아무것도 전달안되면 init 객체로 초기화
export function reducer(state = init, action) {
  switch (action.type) {
    case "VIEW":
      return (state = {
        ...state,
        ...view(action.selectedListIndex, action.selectedListNumber)
      });

    case "PLUSLIST":
      return (state = {
        ...state,
        ...plusList(action.plusListC, action.boardList)
      });

    case "DEL":
      return (state = {
        ...state,
        ...del(action.boardList, action.boardView, action.selectedListIndex)
      });
    case "SETID":
      return (state = {
        ...state,
        ...setID(action.id, action.didlogin)
      });

    case "LOADLIST":
      return (state = {
        ...state,
        boardList: action.list
      });

    case "UPDATE":
      return (state = {
        ...state,
        boardWrite: {
          ...update(action.subject, action.context, action.password)
        }
      });

    default:
      return state;
  }
}

// 매핑한다 state To Props
const mSTP = state => {
  return {
    ...state
  };
};

export default connect(
  mSTP,
  mDTP
)(Main); // 컨넥션 인자 2개