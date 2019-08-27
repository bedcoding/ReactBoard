import React from "react";
import axios from "axios";

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import BItem from "./BItem";
import "./css/BWrite.css";
import "./css/BList.css";

const BList = ({ state }) => {
  let index = -1;
  let { plusListC } = state;
  const onClickHandler = async () => {
    plusListC = plusListC + 10;


    let list = [];
    await axios
      .post("/DB/plusList", {
        idx: `${plusListC}`
      })
      .then(res => {
        list = res.data;
      })
      .catch(err => { });

    state.plusList(plusListC, list);
  };

  return (
    <div>
      <div className="bigbox">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell> 번호 </TableCell>
              <TableCell> 제목 </TableCell>
              <TableCell> 작성자 </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.boardList.map(item => {
              index++;
              return (
                <BItem key={index} item={item} index={index} state={state} />
              );
            })}
          </TableBody>
        </Table>
        <div>
          <div className="button2">
            <Button
              variant="contained"
              color="primary"
              onClick={onClickHandler}>
              더보기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BList;