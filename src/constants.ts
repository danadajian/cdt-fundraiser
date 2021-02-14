import {State} from "./types";

export const NUMBER_OF_COLUMNS = 20;
export const NUMBER_OF_ROWS = 18;
export const INITIAL_STATE: State = {
    selectedBoxes: [],
    boxesTaken: []
};
export const BOXES_BUCKET_NAME = 'tzedakah-boxes';
export const BOXES_TAKEN_FILE_NAME = 'boxesTaken.json';
