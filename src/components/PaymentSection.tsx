import {StateProps} from "../types";
import {Badge, Button, ButtonGroup, makeStyles, TextField} from "@material-ui/core";
import {sum} from 'lodash';
import {handlePayNowButton} from "../handlers/handlePayNowButton";
import '../App.css';

const useStyles = makeStyles({
    badge: {
        backgroundColor: '#F90505',
        color: 'white'
    }
});

export const PaymentSection = (props: StateProps) => {
    const {state, setState} = props;
    const classes = useStyles();
    return <section className={'PaymentSection'}>
        <TextField
            autoFocus
            label={'Name'}
            type={'text'}
            fullWidth={false}
            placeholder={'Enter Name'}
            required
        />
        <ButtonGroup>
            <Badge classes={{ badge: classes.badge }} badgeContent={`$${sum(state.selectedBoxes)}`} showZero={false} max={100000}>
                <Button size={'large'} color={'primary'} variant={'contained'} disableRipple={false}
                        onClick={() => handlePayNowButton(state)}>Pay Now</Button>
            </Badge>
            <Button size={'large'} color={'default'} variant={'outlined'}
                    onClick={() => setState({...state, selectedBoxes: []})}>Clear</Button>
        </ButtonGroup>
    </section>;
};
