variable "aws_region" {
  description = "This the value of the aws-region veriable"
  default     = "eu-west-1"
}

variable "ami_id" {
  description = "this it the value of the ami_id varibale for ec2 instance"
  default     = "ami-03446a3af42c5e74e"
}

variable "instance_type" {
  description = "This is the vlaue of the instance type which is used inn the project job-portal"
  default     = "c7i-flex.large"
}

variable "my_envirnoment" {
  description = "environment for the EC2 instance"
  default     = "development"
}