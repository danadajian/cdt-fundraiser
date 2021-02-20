import {StateProps} from "../types";
import {Badge, Button, ButtonGroup, TextField} from "@material-ui/core";
import {sum} from 'lodash';
import {handlePayNowButton} from "../handlers/handlePayNowButton";

export const PaymentSection = (props: StateProps) => {
    const {state, setState} = props;
    return (
        <div style={{display: 'flex', margin: '0 30vw 0 30vw'}}>
            <TextField
                style={{marginTop: '1.5rem', marginRight: '1rem', width: '30rem'}}
                autoFocus
                label={'Name'}
                type={'text'}
                fullWidth={false}
                placeholder={'Enter Name'}
                required
            />
            <ButtonGroup style={{marginTop: '3vmin'}}>
                <Badge badgeContent={`$${sum(state.selectedBoxes)}`} showZero={false} max={69000} color={'secondary'}>
                <Button size={'large'} color={'primary'} variant={'contained'} disableRipple={false}
                        onClick={() => handlePayNowButton(state)}>Pay Now</Button>
                </Badge>
                <Button size={'large'} color={'secondary'} variant={'outlined'}
                        onClick={() => setState({...state, selectedBoxes: []})}>Clear</Button>
            </ButtonGroup>
        </div>
    )
};
