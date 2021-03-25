import {publishToSnsTopic, retrieveObjectFromS3} from './aws';
import {formatBoxes, getBoxesTotal} from './formatBoxes';

export const handler = () =>
    retrieveObjectFromS3('tzedakah-boxes', 'boxes-taken.json')
        .then(result => {
            const formattedBoxes = formatBoxes(result.boxes);
            const boxesTotal = getBoxesTotal(result.boxes);
            return publishToSnsTopic(JSON.stringify(formattedBoxes, null, 2), `Mission Possible: $${boxesTotal} Raised So Far!`);
        });
