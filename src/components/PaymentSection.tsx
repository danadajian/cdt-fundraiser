import {StateProps} from "../types";
import {Badge, Button, ButtonGroup, makeStyles, TextField, Theme, Tooltip, withStyles} from "@material-ui/core";
import {sum} from 'lodash';
import {handlePayNowButton} from "../handlers/handlePayNowButton";
import '../App.css';
import {useState} from "react";

export const PaymentSection = (props: StateProps) => {
    const {state, setState} = props;
    const classes = useStyles();

    const [name, setName] = useState('');
    const {selectedBoxNumbers} = state;
    const shouldDisplayNameToolTip = selectedBoxNumbers.length > 0 && !name;
    const shouldDisplaySubmitToolTip = selectedBoxNumbers.length > 0 && name.length > 0;
    return <section className={'PaymentSection'}>
        <LightTooltip title={'Type in your name.'} arrow open={shouldDisplayNameToolTip} placement={'left'}>
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
        </LightTooltip>
        <ButtonGroup style={{marginLeft: '0.5rem'}}>
            <LightTooltip title={'Click "submit" when finished!'} arrow open={shouldDisplaySubmitToolTip} placement={'top'}>
                <Badge classes={{ badge: classes.badge }} badgeContent={`$${sum(state.selectedBoxNumbers)}`} showZero={false} max={100000}>
                    <Button style={{backgroundColor: '#040004'}} size={'large'} color={'primary'} variant={'contained'} disableRipple={false}
                            onClick={() => handlePayNowButton(props, name)}>Submit</Button>
                </Badge>
            </LightTooltip>
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

const LightTooltip = withStyles((theme: Theme) => ({
    tooltip: {
        backgroundColor: '#F90505',
        color: 'white',
        boxShadow: theme.shadows[1],
        fontSize: 18,
    },
}))(Tooltip);
