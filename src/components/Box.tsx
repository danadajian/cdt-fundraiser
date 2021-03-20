import {TableCell} from "@material-ui/core";
import React from "react";
import {StateProps} from "../types";
import {handleBoxClick} from "../handlers/handleBoxClick";
import '../App.css';
import Flame from '../images/cdt-flame.png';
import {find} from "lodash";

interface BoxProps {
    props: StateProps;
    boxNumber: number;
}

export const Box = (props: BoxProps) => {
    const {boxNumber, props: {state, setState}} = props;
    const {selectedBoxNumbers, boxesTaken} = state;
    const boxIsTaken = Boolean(find(boxesTaken, {number: boxNumber}));
    const styleOverride = selectedBoxNumbers?.includes(boxNumber) ?
        {backgroundColor: '#F90505'} : boxIsTaken ? {
            backgroundImage: `url(${Flame})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
        } : {};
    const boxText = boxIsTaken ? '' : `$${boxNumber}`;
    return <TableCell
        style={{...styleOverride}}
        align={'center'}
        onClick={() => handleBoxClick(state, setState, boxNumber)}>{boxText}</TableCell>
};
