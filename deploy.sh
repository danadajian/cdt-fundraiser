#!/bin/bash -e

BUCKET_NAME=tzedakah-boxes

if aws s3api head-bucket --bucket "${BUCKET_NAME}" 2>/dev/null
then
    echo "Bucket exists: $BUCKET_NAME"
else
    echo "Bucket does not exist, creating: ${BUCKET_NAME}"
    aws s3 mb s3://"${BUCKET_NAME}"
    aws s3api put-bucket-policy --bucket "${BUCKET_NAME}" --policy file://bucket-policy.json
    aws s3api put-bucket-cors --bucket "${BUCKET_NAME}" --cors-configuration file://bucket-cors.json
    aws s3 website "s3://${BUCKET_NAME}" --index-document index.html
fi

{
  echo "REACT_APP_AWS_KEY=$AWS_ACCESS_KEY_ID"
  echo "REACT_APP_AWS_SECRET=$AWS_SECRET_ACCESS_KEY"
} >> ./.env

cat ./.env

aws s3 sync ./build "s3://${BUCKET_NAME}" --exclude "precache-manifest*"