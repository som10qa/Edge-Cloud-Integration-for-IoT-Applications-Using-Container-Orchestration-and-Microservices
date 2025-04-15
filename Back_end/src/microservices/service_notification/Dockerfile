# Example: service_notification/Dockerfile
FROM python:3.10-slim

WORKDIR /app

# Copy dependency file and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code
COPY service_notification.py .

# Expose the notification service port (e.g., 8080)
EXPOSE 8080

# Run the notification service
CMD ["python3", "service_notification.py"]
