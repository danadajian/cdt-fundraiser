import {TableCell} from "@material-ui/core";
import React from "react";
import {NUMBER_OF_COLUMNS} from "../constants";
import spinningCoin from '../spinning-coin.gif';
import {StateProps} from "../types";
import {handleBoxClick} from "../handlers/handleBoxClick";

interface BoxProps {
    props: StateProps;
    rowNumber: number;
    columnNumber: number;
}

export const Box = (props: BoxProps) => {
    const { rowNumber, columnNumber, props: {state, setState} } = props;
    const {selectedBoxes, boxesTaken} = state;
    const boxNumber = (rowNumber - 1) * NUMBER_OF_COLUMNS + columnNumber;
    const backgroundColor = boxesTaken?.includes(boxNumber) ? 'gray': 'white';
    return <TableCell align={'center'} style={{border: '1px solid black', backgroundColor, height: '5vmin', width: '5vmin'}}
               onClick={() => handleBoxClick(state, setState, boxNumber)}>
        {selectedBoxes?.includes(boxNumber) ?
            <img src={spinningCoin} alt={'spinning-coin'} style={{height: '5vmin', width: '5vmin'}}/> : `$${boxNumber}`}
    </TableCell>
};
