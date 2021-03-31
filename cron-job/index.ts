import {publishToSnsTopic, retrieveObjectFromS3} from './aws';
import {formatBoxes, getBoxesTotal} from './formatBoxes';

export const handler = () =>
    retrieveObjectFromS3('tzedakah-boxes', 'boxes-taken.json')
        .then(result => {
            const formattedBoxes = formatBoxes(result.boxes);
            const boxesTotal = getBoxesTotal(result.boxes);
            const subject = `${result.latestContributor} has made a donation of $${result.latestContribution}. $${boxesTotal} Raised So Far!`;
            return publishToSnsTopic(formattedBoxes, subject);
        });
