import {TableCell} from "@material-ui/core";
import React from "react";
import {StateProps} from "../types";
import {handleBoxClick} from "../handlers/handleBoxClick";
import '../App.css';
import Flame from '../images/cdt-flame.png';

interface BoxProps {
    props: StateProps;
    boxNumber: number;
}

export const Box = (props: BoxProps) => {
    const {boxNumber, props: {state, setState}} = props;
    const {selectedBoxes, boxesTaken} = state;
    const styleOverride = selectedBoxes?.includes(boxNumber) ?
        {backgroundColor: 'gold'} : boxesTaken?.includes(boxNumber) ? {
            backgroundImage: `url(${Flame})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
        } : {};
    const boxText = boxesTaken?.includes(boxNumber) ? '' : `$${boxNumber}`;
    return <TableCell
        style={{...styleOverride}}
        align={'center'}
        onClick={() => handleBoxClick(state, setState, boxNumber)}>{boxText}</TableCell>
};
