import {State} from "./types";

export const NUMBER_OF_COLUMNS = 20;
export const NUMBER_OF_ROWS = 18;
export const INITIAL_STATE: State = {
    selectedBoxNumbers: [],
    boxesTaken: [],
    name: undefined,
    paymentComplete: false
};
export const BOXES_BUCKET_NAME = 'tzedakah-boxes';
export const BOXES_TAKEN_FILE_NAME = 'boxes-taken.json';
