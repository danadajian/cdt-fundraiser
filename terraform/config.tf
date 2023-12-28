provider "aws" {
  region = "us-east-2"
}

terraform {
  backend "s3" {
    bucket = "tzedakah-boxes-terraform-us-east-2"
    key    = "tzedakah-boxes"
    region = "us-east-2"
  }
}
