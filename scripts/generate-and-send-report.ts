import { SNS } from "@aws-sdk/client-sns";
import { db } from "../src/db";

const data = await db.query.squaresTable.findMany();

const sns = new SNS();
await sns.publish({
  TopicArn: process.env.SNS_TOPIC_ARN,
  Subject: "CDT Daily Fundraiser Report",
  Message: JSON.stringify(data, null, 2),
});
