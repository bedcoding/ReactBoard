import React from "react";
// import "./css/freelancer.css";
// import "./css/freelancer.min.css";

import '../boot/vendor/bootstrap/css/bootstrap.min.css';
import '../boot/vendor/fontawesome-free/css/all.min.css';
import '../boot/css/grayscale.min.css';
import { Route, BrowserRouter } from 'react-router-dom'


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
    if (check(id) === false) {
      alert("아이디를 입력하세요.");
      return;
    }

    didlogin = true;
    setID(id, didlogin);

    window.scrollTo(0, 0);  // 스크롤 최상단으로 이동
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
    <div>
      <header class="masthead">
        <div class="container d-flex h-100 align-items-center">
          <div class="mx-auto text-center">
            <h1 class="mx-auto my-0 text-uppercase"> 5조 </h1>
            <h2 class="text-white-50 mx-auto mt-2 mb-5"> 최은우　장재호　김지훈　안성민 </h2>
            <a href="#login" class="btn btn-primary js-scroll-trigger"> 로그인 </a>
          </div>
        </div>
      </header>


      <section id="login" class="signup-section">
        <div class="container h-100 align-items-center">
          <div class="row">
            <div class="col-md-10 col-lg-8 mx-auto text-center">

              <i class="far fa-paper-plane fa-2x mb-2 text-white"></i>
              <h2 class="text-white mb-5"> 로그인 </h2>

              <form class="form-inline d-flex">
                <input onChange={onChangeHandler} onKeyDown={onKeyDownHandler}
                  type="text" class="form-control flex-fill mr-0 mr-sm-2 mb-3 mb-sm-0" placeholder="아이디를 입력하세요" />
                <button onClick={onClickHandler} type="submit" class="btn btn-primary mx-auto"> 입력 </button>
              </form>
            </div>
          </div>
        </div>
      </section>



      <section id="공백" class="about-section text-center">
        <div class="container">
          <div class="row">
            <div class="col-lg-8 mx-auto">

              <p class="text-white-50">
                <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>

  );
};

//   <header className="masthead bg-primary text-white text-center">
//       <div className="container d-flex align-items-center flex-column">
//         <h1 className="masthead-heading text-uppercase mb-0"> 로그인 </h1> <br/><br/>


//         <div>
//           <TextField
//             id="input-with-icon-textfield"
//             label="닉네임"
//             onChange={onChangeHandler}
//             onKeyDown={onKeyDownHandler}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <AccountCircle />
//                 </InputAdornment>
//               )
//             }}
//           />
//           <Fab color="primary" aria-label="add" onClick={onClickHandler}>
//             접속
//           </Fab>
//         </div>

//         <div className="divider-custom divider-light" />
//       </div>
//     </header>
//   );
// };

export default Login;