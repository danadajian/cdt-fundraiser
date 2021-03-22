import * as AWS from 'aws-sdk';
import './env'

AWS.config.credentials = new AWS.Credentials(process.env.AWS_KEY, process.env.AWS_SECRET);
AWS.config.region = 'us-east-2'
export const S3 = new AWS.S3();
export const SNS = new AWS.SNS();
