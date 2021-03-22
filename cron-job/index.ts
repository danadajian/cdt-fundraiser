import {publishToSnsTopic, retrieveObjectFromS3} from "./aws/aws";

export const handler = () =>
    retrieveObjectFromS3('tzedakah-boxes', 'boxes-taken.json')
        .then(result => publishToSnsTopic(JSON.stringify(result)));
