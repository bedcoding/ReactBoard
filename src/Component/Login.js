import React from "react";
import "./css/freelancer.css";
import "./css/freelancer.min.css";
import Fab from "@material-ui/core/Fab";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";

const Login = props => {
  let { id, didlogin } = props.state;
  const { setID } = props.state;

  function check(AllLength) {
    if (AllLength.length < 1) {
      return false;
    }

    return true;
  }

  const onClickHandler = () => {
    if (check(id) == false) {
      alert("아이디를 입력하세요.");
      return;
    }

    didlogin = true;
    setID(id, didlogin);
  };

  const onChangeHandler = e => {
    id = e.target.value;
  };

  function onKeyDownHandler(e) {
    if (e.keyCode === 13) { // 13 = "ENTER"
      onClickHandler()
    }
  }
  return (    
    <header className="masthead bg-primary text-white text-center">
      <div className="container d-flex align-items-center flex-column">
        <h1 className="masthead-heading text-uppercase mb-0"> 로그인 </h1> <br/><br/>
        <div>
          <TextField
            id="input-with-icon-textfield"
            label="닉네임"
            onChange={onChangeHandler}
            onKeyDown={onKeyDownHandler}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              )
            }}
          />
          <Fab color="primary" aria-label="add" onClick={onClickHandler}>
            접속
          </Fab>
        </div>

        <div className="divider-custom divider-light" />
      </div>
    </header>
  );
};

export default Login;