# Edge-Cloud Integration for IoT Applications Using Container Orchestration and Microservices

This project demonstrates an integrated edge-cloud framework for simulated IoT data using containerized microservices, a pub-sub messaging model, and a real-time UI for data input.

## Deployment Strategy

### Cloud (GCP):
- **Microservices** (Authentication, Data Management, Notification, Pub-Sub) are containerized and deployed on GCP via Google Kubernetes Engine (GKE).
- **Infrastructure** is defined with Terraform and Kubernetes manifests found in the `infra/` directory.
- (Optional) The UI may also be hosted in the cloud if desired.

### Local VM (Edge Simulation):
- The **Edge Gateway** (in `src/edge_gateway/`) simulates sensor data processing.
- The **User Interface** (in `src/ui/`) provides a webpage for real-time sensor data input.
- Networking is configured to allow communication from the local edge to cloud endpoints.

## Repository Structure