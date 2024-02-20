resource "aws_sns_topic" "cdt_topic" {
  name = "cdt-fundraiser-topic"
}

resource "aws_sns_topic_subscription" "cdt_subscription" {
  for_each  = toset(local.emails)
  topic_arn = aws_sns_topic.cdt_topic.arn
  protocol  = "email"
  endpoint  = each.value
}

locals {
  emails = [
    "danadajian@gmail.com",
    "rachelallencdt@gmail.com",
    "sjahanfar@dortamid.com",
    "gafoxes@bellsouth.net"
  ]
}
