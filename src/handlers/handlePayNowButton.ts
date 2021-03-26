import {retrieveObjectFromS3, uploadObjectToS3} from "../aws/aws";
import {isEqual} from 'lodash';
import {BoxesData, StateProps} from "../types";
import {BOXES_TAKEN_FILE_NAME, BOXES_BUCKET_NAME} from "../constants";

export const handlePayNowButton = (props: StateProps, name: string) => {
    const {state, setState} = props;
    const {selectedBoxNumbers, boxesTaken} = state;
    if (selectedBoxNumbers.length === 0) {
        alert('Please select a box first.');
        return;
    }
    if (name.length === 0) {
        alert('Please type in your name before paying.');
        return;
    }
    const newBoxesTaken = [...boxesTaken, ...selectedBoxNumbers.map(number => ({name, number}))];
    return retrieveObjectFromS3(BOXES_BUCKET_NAME, BOXES_TAKEN_FILE_NAME)
        .then((result: BoxesData) => {
            if (isEqual(result.boxes, boxesTaken)) {
                return uploadObjectToS3({boxes: newBoxesTaken}, BOXES_BUCKET_NAME, BOXES_TAKEN_FILE_NAME)
                    .then(() => setState({...state, name, paymentComplete: true}));
            }
            alert('Some squares have recently been purchased. Please reload the page and try again.');
        });
};
