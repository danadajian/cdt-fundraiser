import {uploadObjectToS3} from "../aws/aws";
import {State} from "../types";
import {BOXES_TAKEN_FILE_NAME, BOXES_BUCKET_NAME} from "../constants";

export const handlePayNowButton = (state: State) => {
    const {selectedBoxes, boxesTaken} = state;
    const newBoxesTaken = [...boxesTaken, ...selectedBoxes];
    return uploadObjectToS3({boxNumbers: newBoxesTaken}, BOXES_BUCKET_NAME, BOXES_TAKEN_FILE_NAME)
        .then(() => alert('Redirecting to payment page...'));
};