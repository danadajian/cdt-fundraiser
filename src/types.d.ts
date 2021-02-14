export interface StateProps {
    state: State;
    setState: (state: State) => void;
}

export interface State {
    selectedBoxes: number[];
    boxesTaken: number[];
}
