import {TableCell} from "@material-ui/core";
import React from "react";
import spinningCoin from "../images/spinning-coin.gif";
import {StateProps} from "../types";
import {handleBoxClick} from "../handlers/handleBoxClick";

interface BoxProps {
    props: StateProps;
    boxNumber: number;
}

export const Box = (props: BoxProps) => {
    const { boxNumber, props: {state, setState} } = props;
    const {selectedBoxes, boxesTaken} = state;
    const backgroundColor = boxesTaken?.includes(boxNumber) ? 'gray': 'white';
    return <TableCell align={'center'} style={{border: '1px solid black', backgroundColor, height: '4vmin', width: '4vmin'}}
               onClick={() => handleBoxClick(state, setState, boxNumber)}>
        {selectedBoxes?.includes(boxNumber) ?
            <img src={spinningCoin} alt={'spinning-coin'} style={{height: '4vmin', width: '4vmin'}}/> : `$${boxNumber}`}
    </TableCell>
};
