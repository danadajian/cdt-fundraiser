#!/bin/bash -e

APP_BUCKET_NAME=tzedakah-boxes-app
BOXES_BUCKET_NAME=tzedakah-boxes

if aws s3api head-bucket --bucket "${APP_BUCKET_NAME}" 2>/dev/null
then
    echo "Bucket exists: $APP_BUCKET_NAME"
else
    echo "Bucket does not exist, creating: ${APP_BUCKET_NAME}"
    aws s3 mb s3://"${APP_BUCKET_NAME}"
    aws s3api put-bucket-policy --bucket "${APP_BUCKET_NAME}" --policy file://bucket-policy.json
    aws s3api put-bucket-cors --bucket "${APP_BUCKET_NAME}" --cors-configuration file://bucket-cors.json
    aws s3 website "s3://${APP_BUCKET_NAME}" --index-document index.html
fi

if aws s3api head-bucket --bucket "${BOXES_BUCKET_NAME}" 2>/dev/null
then
    echo "Bucket exists: $BOXES_BUCKET_NAME"
else
    echo "Bucket does not exist, creating: ${BOXES_BUCKET_NAME}"
    aws s3 mb s3://"${BOXES_BUCKET_NAME}"
    aws s3api put-bucket-cors --bucket "${BOXES_BUCKET_NAME}" --cors-configuration file://bucket-cors.json
fi

{
  echo "REACT_APP_AWS_KEY=$AWS_ACCESS_KEY_ID"
  echo "REACT_APP_AWS_SECRET=$AWS_SECRET_ACCESS_KEY"
} >> ./.env

cat ./.env

aws s3 sync ./build "s3://${APP_BUCKET_NAME}" --exclude "precache-manifest*"