import {S3} from "../aws";
import boxesTaken from '../fixtures/boxesTaken.json';

export const retrieveObjectFromS3 = async (bucketName: string, fileName: string): Promise<any> => {
    const params = {
        Bucket: bucketName,
        Key: fileName
    };
    if (isDevelopment()) {
        return delay(250).then(() => boxesTaken)
    }
    const data: any = await S3.getObject(params).promise();
    return JSON.parse(data.Body.toString());
};

export const uploadObjectToS3 = async (object: any, bucketName: string, fileName: string): Promise<any> => {
    const params = {
        Bucket: bucketName,
        Key: fileName,
        Body: JSON.stringify(object)
    };
    if (isDevelopment()) {
        return delay(250).then(() => console.log(`Uploaded ${JSON.stringify(object)} to S3!`))
    }
    return S3.putObject(params).promise();
};

const isDevelopment = () => !process.env.NODE_ENV || process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test';
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
