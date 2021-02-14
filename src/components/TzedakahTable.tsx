import {StateProps} from "../types";
import {Table, TableBody, TableRow} from "@material-ui/core";
import {range} from "lodash";
import {NUMBER_OF_COLUMNS, NUMBER_OF_ROWS} from "../constants";
import {Box} from "./Box";
import React from "react";

export const TzedakahTable = (props: StateProps) =>
    <Table style={{display: 'flex', justifyContent: 'center'}}>
        <TableBody>
            {range(1, NUMBER_OF_ROWS + 1).map(rowNumber => (
                <TableRow key={rowNumber}>
                    {range(1, NUMBER_OF_COLUMNS + 1).map(columnNumber => {
                        const boxNumber = (rowNumber - 1) * NUMBER_OF_COLUMNS + columnNumber;
                        return <Box
                            key={boxNumber}
                            props={props}
                            boxNumber={boxNumber}
                        />
                    })}
                </TableRow>
            ))}
        </TableBody>
    </Table>;
