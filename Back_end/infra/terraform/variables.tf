variable "gcp_project" {
  description = "GCP Project ID"
  type        = string
}

variable "gcp_region" {
  description = "GCP Region"
  default     = "us-central1"
}

variable "gcp_zone" {
  description = "GCP Zone"
  default     = "us-central1-a"
}

variable "instance_type" {
  description = "Compute instance type"
  default     = "e2-medium"
}

variable "image" {
  description = "Image for the instance"
  default     = "debian-cloud/debian-10"
}