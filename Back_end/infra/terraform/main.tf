provider "google" {
  project = var.gcp_project
  region  = var.gcp_region
}

resource "google_compute_instance" "edge_server" {
  name         = "edge-cloud-iot-server"
  machine_type = var.instance_type
  zone         = var.gcp_zone

  boot_disk {
    initialize_params {
      image = var.image
    }
  }

  network_interface {
    network       = "default"
    access_config {}
  }

  tags = ["edge-cloud-iot"]
}