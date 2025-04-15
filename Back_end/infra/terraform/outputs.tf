output "edge_server_public_ip" {
  value       = google_compute_instance.edge_server.network_interface[0].access_config[0].nat_ip
  description = "Public IP of the edge server instance"
}