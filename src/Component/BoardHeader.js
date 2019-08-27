import React from "react";
import "./css/freelancer.css";

const BoardHeader = () => {
  return (
    <nav
      className="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top"
      id="mainNav"
    >
      <div className="container">
        <a
          className="navbar-brand js-scroll-trigger"
          href="http://localhost:3000">
          5조 게시판
        </a>

        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item mx-0 mx-lg-1">
              <a
                className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger"
                href="#boardlist">
                리스트
              </a>
            </li>
            <li className="nav-item mx-0 mx-lg-1">
              <a
                className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger"
                href="#boardview">
                글보기
              </a>
            </li>
            <li className="nav-item mx-0 mx-lg-1">
              <a
                className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger"
                href="#boardwrite">
                글쓰기
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default BoardHeader;