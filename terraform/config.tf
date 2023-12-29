provider "aws" {
  region = "us-east-2"
}

terraform {
  backend "s3" {
    bucket = "cdt-fundraiser-terraform-us-east-2"
    key    = "cdt-fundraiser"
    region = "us-east-2"
  }
}
