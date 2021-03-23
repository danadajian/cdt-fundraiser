import {publishToSnsTopic, retrieveObjectFromS3} from './aws';
import {formatBoxes} from './formatBoxes';

export const handler = () =>
    retrieveObjectFromS3('tzedakah-boxes', 'boxes-taken.json')
        .then(result => {
            const formattedBoxes = formatBoxes(result.boxes);
            return publishToSnsTopic(JSON.stringify(formattedBoxes, null, 2));
        });
