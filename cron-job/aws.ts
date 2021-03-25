import * as AWS from 'aws-sdk';

AWS.config.credentials = new AWS.Credentials(process.env.AWS_KEY, process.env.AWS_SECRET);
AWS.config.region = 'us-east-2'
export const S3 = new AWS.S3();
export const SNS = new AWS.SNS();

export const retrieveObjectFromS3 = async (bucketName: string, fileName: string): Promise<any> => {
    const params = {
        Bucket: bucketName,
        Key: fileName
    };
    const data: any = await S3.getObject(params).promise();
    return JSON.parse(data.Body.toString());
};

export const publishToSnsTopic = async (message: string, subject: string): Promise<any> => {
    const params = {
        Message: message,
        Subject: subject,
        TopicArn: process.env.SNS_TOPIC_ARN
    };
    return SNS.publish(params).promise();
};
