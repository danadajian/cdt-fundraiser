import {State} from "../types";
import {Table, TableBody, TableCell, TableFooter, TableHead, TableRow} from "@material-ui/core";
import { sum } from 'lodash';

export const PaymentSection = (props: {state: State}) => {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell align={'center'}>Boxes Chosen</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.state.selectedBoxes.map((selectedBox, index) => (
                    <TableRow key={index}>
                        <TableCell align={'center'}>{`$${selectedBox}`}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell align={'center'}>{`Your Total: $${sum(props.state.selectedBoxes)}`}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
};
