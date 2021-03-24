#!/bin/bash -e

cd cron-job

BUCKET_NAME=tzedakah-boxes-cron

if aws s3api head-bucket --bucket "${BUCKET_NAME}" 2>/dev/null
then
    echo "Bucket exists: BUCKET_NAME"
else
    echo "Bucket does not exist, creating: ${BUCKET_NAME}"
    aws s3 mb s3://"${BUCKET_NAME}"
fi

TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
FILE_NAME="cron-job-$TIMESTAMP.zip"

zip -r -qq "$FILE_NAME" build node_modules
echo "### Zipped $FILE_NAME successfully."

aws s3 rm "s3://${BUCKET_NAME}" --recursive --exclude "*" --include "*.zip"
aws s3 cp "${FILE_NAME}" "s3://${BUCKET_NAME}/"

SNS_TOPICS=$(aws sns list-topics)
SNS_TOPIC_ARN=$(echo "$SNS_TOPICS" | jq -r '.Topics[] | select(.TopicArn | contains("TzedakahBoxes"))' | jq '.TopicArn' | tr -d '"')
echo SNS_TOPIC_ARN="${SNS_TOPIC_ARN}"

aws cloudformation deploy \
  --template-file template.yaml \
  --stack-name "tzedakah-boxes-cron" \
  --capabilities CAPABILITY_IAM \
  --parameter-overrides BucketName="${BUCKET_NAME}" CodeKey="${FILE_NAME}" SnsTopicArn="${SNS_TOPIC_ARN}" AwsKey="${AWS_ACCESS_KEY_ID}" AwsSecret="${AWS_SECRET_ACCESS_KEY}" \
  --no-fail-on-empty-changeset