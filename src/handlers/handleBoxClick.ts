import {State} from "../types";

export const handleBoxClick = (state: State, setState: (state: State) => void, boxNumber: number) => {
    if (state.boxesTaken.includes(boxNumber)) {
        alert('This box has been taken. :(');
    } else if (state.selectedBoxes.includes(boxNumber)) {
        const selectedBoxes = state.selectedBoxes.filter(selectedBox => selectedBox !== boxNumber);
        setState({
            ...state,
            selectedBoxes
        });
    } else {
        setState({
            ...state,
            selectedBoxes: [
                ...state.selectedBoxes,
                boxNumber
            ]
        });
    }
};
