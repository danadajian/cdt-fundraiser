import {uploadObjectToS3} from "../aws/aws";
import {StateProps} from "../types";
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
    return uploadObjectToS3({boxes: newBoxesTaken}, BOXES_BUCKET_NAME, BOXES_TAKEN_FILE_NAME)
        .then(() => setState({...state, name, paymentComplete: true}));
};
