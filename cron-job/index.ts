import {publishToSnsTopic, retrieveObjectFromS3} from './aws';
import {groupBy} from 'lodash';

export const handler = () =>
    retrieveObjectFromS3('tzedakah-boxes', 'boxes-taken.json')
        .then(result => {
            const formattedBoxes = formatBoxes(result.boxes);
            return publishToSnsTopic(formattedBoxes);
        });

const formatBoxes = (boxes: {name: string, number: number}[]) => {
    const formattedBoxes = groupBy(boxes, 'name');
    return JSON.stringify(formattedBoxes, null, 2);
};
