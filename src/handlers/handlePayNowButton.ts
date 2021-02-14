import {uploadObjectToS3} from "../aws/aws";
import {State} from "../types";
import {BOXES_TAKEN_FILE_NAME, TZEDAKAH_BUCKET_NAME} from "../constants";

export const handlePayNowButton = (state: State) => {
    const {selectedBoxes, boxesTaken} = state;
    const newBoxesTaken = [...boxesTaken, ...selectedBoxes];
    uploadObjectToS3({boxNumbers: newBoxesTaken}, TZEDAKAH_BUCKET_NAME, BOXES_TAKEN_FILE_NAME)
        .then(() => alert('Redirecting to payment page...'));
};
