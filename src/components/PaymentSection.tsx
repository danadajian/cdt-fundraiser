import {StateProps} from "../types";
import {Button, ButtonGroup, makeStyles, TextField} from "@material-ui/core";
import {sum} from 'lodash';
import {handlePayNowButton} from "../handlers/handlePayNowButton";
import '../App.css';
import {useState} from "react";

export const PaymentSection = (props: StateProps) => {
    const {state, setState} = props;
    const classes = useStyles();

    const [name, setName] = useState('');
    return <section className={'PaymentSection'}>
        <TextField
            InputProps={{ className: classes.textField }}
            autoFocus
            label={'Name'}
            type={'text'}
            fullWidth={false}
            placeholder={'Enter Name'}
            required
            value={name}
            onChange={event => setName(event.target.value)}
        />
        <h2>{`Total: $${sum(state.selectedBoxNumbers)}`}</h2>
        <ButtonGroup>
            <Button size={'large'} color={'primary'} variant={'contained'} disableRipple={false}
                    onClick={() => handlePayNowButton(state, name)}>Pay Now</Button>
            <Button size={'large'} color={'default'} variant={'outlined'}
                    onClick={() => setState({...state, selectedBoxNumbers: []})}>Clear</Button>
        </ButtonGroup>
    </section>;
};

const useStyles = makeStyles({
    textField: {
        color: 'white'
    }
});
