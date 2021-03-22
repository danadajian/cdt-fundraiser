import {S3, SNS} from "../aws";

export const retrieveObjectFromS3 = async (bucketName: string, fileName: string): Promise<any> => {
    const params = {
        Bucket: bucketName,
        Key: fileName
    };
    const data: any = await S3.getObject(params).promise();
    return JSON.parse(data.Body.toString());
};

export const publishToSnsTopic = async (message: string): Promise<any> => {
    const params = {
        Message: message,
        TopicArn: process.env.SNS_TOPIC_ARN
    };
    return SNS.publish(params).promise();
};
