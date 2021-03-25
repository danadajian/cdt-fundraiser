import {publishToSnsTopic, retrieveObjectFromS3} from './aws';
import {formatBoxes, getBoxesTotal} from './formatBoxes';

export const handler = () =>
    retrieveObjectFromS3('tzedakah-boxes', 'boxes-taken.json')
        .then(result => {
            const formattedBoxes = formatBoxes(result.boxes);
            const boxesTotal = getBoxesTotal(result.boxes);
            return publishToSnsTopic(formattedBoxes, `A donation has been made. $${boxesTotal} Raised So Far!`);
        });
