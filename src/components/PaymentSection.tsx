import {StateProps} from "../types";
import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {orderBy, sum} from 'lodash';
import {handlePayNowButton} from "../handlers/handlePayNowButton";

export const PaymentSection = (props: StateProps) => {
    const {state, setState} = props;
    return (
        <div>
            <Button color={'primary'} variant={'contained'} disableRipple={false} onClick={() => handlePayNowButton(state)}>Pay Now</Button>
            <Button variant={'outlined'} onClick={() => setState({...state, selectedBoxes: []})}>Clear</Button>
            <TableContainer style={{height: '50vmin'}}>
                <Table stickyHeader={true}>
                    <TableHead>
                        <TableRow>
                            <TableCell align={'center'}
                                       style={{fontWeight: 'bold'}}>{`Your Total: $${sum(state.selectedBoxes)}`}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orderBy(state.selectedBoxes).map((selectedBox, index) => (
                            <TableRow key={index}>
                                <TableCell align={'center'}>{`$${selectedBox}`}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
};
