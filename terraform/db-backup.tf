resource "aws_s3_bucket" "db_backup_bucket" {
  bucket = "tzedakah-boxes-db-backup"
}

resource "aws_iam_user" "db_backup_user" {
  name = "db-backup-user"
}

resource "aws_iam_policy" "db_backup_policy" {
  name = "db-backup-policy"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "s3:PutObject"
        ]
        Effect = "Allow"
        Resource = [
          aws_s3_bucket.db_backup_bucket.arn,
          "${aws_s3_bucket.db_backup_bucket.arn}/*"
        ]
      }
    ]
  })
}

resource "aws_iam_user_policy_attachment" "backup_attachment" {
  user       = aws_iam_user.db_backup_user.name
  policy_arn = aws_iam_policy.db_backup_policy.arn
}
