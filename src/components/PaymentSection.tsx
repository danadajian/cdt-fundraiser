import {StateProps} from "../types";
import {Button, Table, TableBody, TableCell, TableFooter, TableHead, TableRow} from "@material-ui/core";
import {orderBy, sum} from 'lodash';
import {handlePayNowButton} from "../handlers/handlePayNowButton";

export const PaymentSection = (props: StateProps) => {
    const {state, setState} = props;
    return (
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align={'center'}>Boxes Chosen</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orderBy(state.selectedBoxes).map((selectedBox, index) => (
                        <TableRow key={index}>
                            <TableCell align={'center'}>{`$${selectedBox}`}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell align={'center'}>{`Your Total: $${sum(state.selectedBoxes)}`}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
            <Button onClick={() => handlePayNowButton(state)}>Pay Now</Button>
            <Button onClick={() => setState({...state, selectedBoxes: []})}>Clear</Button>
        </div>
    )
};
