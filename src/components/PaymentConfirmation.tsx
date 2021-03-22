import {sum} from 'lodash';
import '../App.css';
import React from "react";
import {State} from "../types";

export const PaymentConfirmation = (props: {state: State}) => {
    const {name, selectedBoxNumbers} = props.state;
    return <div className={'PaymentConfirmation'}>
        <p>{`Agent ${name}:`}</p>
        <p>You've helped us complete the mission!</p>
        <p style={{color: '#F90505'}}>{`Your total is: $${sum(selectedBoxNumbers)}`}</p>
        <p>Please enter your information below.</p>
    </div>;
};
