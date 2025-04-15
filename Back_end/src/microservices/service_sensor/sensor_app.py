from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# In-memory sensor data store
sensor_data = []

# Endpoint to post sensor data
@app.route('/data', methods=['POST'])
def post_sensor_data():
    data = request.get_json() or {}
    sensor = data.get("sensor")
    value = data.get("value")
    if sensor is None or value is None:
        return jsonify({"status": "fail", "message": "Sensor and value are required."}), 400
    sensor_data.append({"sensor": sensor, "value": value})
    return jsonify({
        "status": "success",
        "message": "Data posted successfully",
        "data": sensor_data
    }), 201

# Endpoint to get sensor data
@app.route('/data', methods=['GET'])
def get_sensor_data():
    return jsonify({"status": "success", "data": sensor_data}), 200

# Endpoint to reset sensor data
@app.route('/reset-data', methods=['POST'])
def reset_sensor_data():
    global sensor_data
    sensor_data = []  # Clear all sensor data
    return jsonify({"status": "success", "message": "Sensor data reset successfully."}), 200

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=3100)