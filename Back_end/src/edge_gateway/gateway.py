import yaml
import time
import random

def load_config():
    with open("config.yaml", "r") as file:
        config = yaml.safe_load(file)
    return config

def process_sensor_data(data, config):
    processed_data = {}
    for sensor, value in data.items():
        processed_data[sensor] = value * random.uniform(0.95, 1.05)
    processed_data["edge_processed"] = True
    processed_data["timestamp"] = time.time()
    return processed_data

if __name__ == "__main__":
    config = load_config()
    sample_sensor_data = {
        "light_intensity": 300,  # in lux
        "co2": 450,              # in ppm
        "humidity": 40           # in %
    }
    print("Original sensor data:", sample_sensor_data)
    processed = process_sensor_data(sample_sensor_data, config)
    print("Processed sensor data:", processed)