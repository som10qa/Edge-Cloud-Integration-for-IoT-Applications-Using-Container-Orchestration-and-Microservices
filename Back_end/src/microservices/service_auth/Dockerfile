# Use official Python image (3.9 slim version)
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy dependency file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code
COPY app.py .

# Expose port 5000 for the service
EXPOSE 5000

# Run the Flask app when the container starts
CMD ["python3", "app.py"]
