import {StateProps} from "../types";
import {Badge, Button, ButtonGroup, makeStyles, TextField} from "@material-ui/core";
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
            autoFocus
            label={'Name'}
            type={'text'}
            fullWidth={false}
            placeholder={'Enter Name'}
            required
            value={name}
            onChange={event => setName(event.target.value)}
        />
        <ButtonGroup className={'ButtonGroup'}>
            <Badge classes={{ badge: classes.badge }} badgeContent={`$${sum(state.selectedBoxNumbers)}`} showZero={false} max={100000}>
                <Button size={'large'} color={'primary'} variant={'contained'} disableRipple={false}
                        onClick={() => handlePayNowButton(props, name)}>Pay Now</Button>
            </Badge>
            <Button size={'large'} color={'default'} variant={'outlined'}
                    onClick={() => setState({...state, selectedBoxNumbers: []})}>Clear</Button>
        </ButtonGroup>
    </section>;
};

const useStyles = makeStyles({
    badge: {
        backgroundColor: '#F90505',
        color: 'white',
        fontSize: 15
    }
});
