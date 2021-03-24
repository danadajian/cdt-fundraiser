import {sum} from 'lodash';
import '../App.css';
import React from "react";
import {State} from "../types";
import {Button, Link} from "@material-ui/core";

export const PaymentConfirmation = (props: {state: State}) => {
    const {name, selectedBoxNumbers} = props.state;
    return <div className={'PaymentConfirmation'}>
        <p>{`Agent ${name}: You've helped us complete the mission!`}</p>
        <p style={{fontSize: 32}}>Remember your total amount and enter it on the next page.</p>
        <p style={{color: '#F90505'}}>{`Total Amount: $${sum(selectedBoxNumbers)}`}</p>
        <Button style={{backgroundColor: '#F90505', color: 'white'}}>
            <Link color={'inherit'} href={'https://www.dortamid.org/missionpossible2'} target={'_blank'}>
                Click here to continue
            </Link>
        </Button>
    </div>;
};
