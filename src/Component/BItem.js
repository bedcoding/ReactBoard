import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';

const BItem = ({ state, item, index }) => {
    const index_ = index
    const { view, selectedListIndex } = state
    const { idx, writer, subject } = item

    const onClickHandler = (e) => {
        (selectedListIndex === index_) ? view(-1, item.idx) : view(index_, item.idx)
        window.location.href = "#boardview"
    }

    return (
        <TableRow onClick={onClickHandler}>
            <TableCell> {idx} </TableCell>
            <TableCell> {writer} </TableCell>
            <TableCell> {subject} </TableCell>
        </TableRow>
    );
};

export default BItem;