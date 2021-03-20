import {State} from "../types";
import {find} from 'lodash';

export const handleBoxClick = (state: State, setState: (state: State) => void, boxNumber: number) => {
    if (Boolean(find(state.boxesTaken, {number: boxNumber}))) {
        alert('This box has been taken. :(');
    } else if (state.selectedBoxNumbers.includes(boxNumber)) {
        const selectedBoxes = state.selectedBoxNumbers.filter(selectedBox => selectedBox !== boxNumber);
        setState({
            ...state,
            selectedBoxNumbers: selectedBoxes
        });
    } else {
        setState({
            ...state,
            selectedBoxNumbers: [
                ...state.selectedBoxNumbers,
                boxNumber
            ]
        });
    }
};
