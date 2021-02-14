import {retrieveObjectFromS3} from "../aws/aws";
import {State} from "../types";
import {BOXES_TAKEN_FILE_NAME, BOXES_BUCKET_NAME} from "../constants";

export const getLatestBoxesTaken = (state: State, setState: (state: State) => void) => {
    retrieveObjectFromS3(BOXES_BUCKET_NAME, BOXES_TAKEN_FILE_NAME)
        .then(result => setState({...state, boxesTaken: result.boxNumbers}))
        .catch(err => {
            console.log('No boxes have been taken yet.', err);
            return []
        })
};
