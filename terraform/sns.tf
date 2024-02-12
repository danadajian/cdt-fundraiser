resource "aws_sns_topic" "cdt_topic" {
  name = "cdt-fundraiser-topic"
}

resource "aws_sns_topic_subscription" "cdt_subscription" {
  topic_arn = aws_sns_topic.cdt_topic.arn
  protocol  = "email"
  endpoint  = "danadajian@gmail.com"
}
resource "aws_sns_topic_subscription" "cdt_subscription" {
  topic_arn = aws_sns_topic.cdt_topic.arn
  protocol  = "email"
  endpoint  = "rachelallencdt@gmail.com"
}
resource "aws_sns_topic_subscription" "cdt_subscription" {
  topic_arn = aws_sns_topic.cdt_topic.arn
  protocol  = "email"
  endpoint  = "sjahanfar@dortamid.com"
}
