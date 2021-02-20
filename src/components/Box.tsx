import {TableCell} from "@material-ui/core";
import React from "react";
import {StateProps} from "../types";
import {handleBoxClick} from "../handlers/handleBoxClick";

interface BoxProps {
    props: StateProps;
    boxNumber: number;
}

export const Box = (props: BoxProps) => {
    const {boxNumber, props: {state, setState}} = props;
    const {selectedBoxes, boxesTaken} = state;
    const backgroundColor = boxesTaken?.includes(boxNumber) ? 'gray' : selectedBoxes?.includes(boxNumber) ? 'red' : 'white';
    return <TableCell
                align={'center'}
                style={{border: '1px solid black', backgroundColor, padding: '0.8rem 0.2rem'}}
                onClick={() => handleBoxClick(state, setState, boxNumber)}>{`$${boxNumber}`}</TableCell>
};
