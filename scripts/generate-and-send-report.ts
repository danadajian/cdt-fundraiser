import { Parser } from "@json2csv/plainjs";
import { SNS } from "@aws-sdk/client-sns";
import { db } from "../src/db";
import { squaresTable } from "../src/schema";
import { S3 } from "@aws-sdk/client-s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const data = await db
  .select()
  .from(squaresTable)
  .orderBy(squaresTable.name, squaresTable.amount);

const sns = new SNS();
const s3Client = new S3();
const s3Inputs = {
  Bucket: "cdt-fundraiser-db-backup",
  Key: `reports/${new Date().toISOString()}.csv`,
};
await s3Client.putObject({ ...s3Inputs, Body: new Parser().parse(data) });
const command = new GetObjectCommand(s3Inputs);
const url = await getSignedUrl(s3Client, command, { expiresIn: 86400 });
await sns.publish({
  TopicArn: process.env.SNS_TOPIC_ARN,
  Subject: "CDT Daily Fundraiser Report",
  Message: `Click below to download today's report!\n\n${url}`,
});
