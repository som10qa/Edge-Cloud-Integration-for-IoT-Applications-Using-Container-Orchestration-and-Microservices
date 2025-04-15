from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import time
import threading
import queue

app = Flask(__name__)
CORS(app)

# A thread-safe queue for notifications
notification_queue = queue.Queue()

# POST endpoint to send a new notification
@app.route('/notify', methods=['POST'])
def notify():
    data = request.get_json() or {}
    message = data.get("message")
    
    if not message:
        return jsonify({"status": "fail", "message": "Notification message is required."}), 400

    # Add the message to the queue
    notification_queue.put(message)
    
    return jsonify({"status": "success", "message": "Notification sent."}), 201

# SSE generator that yields new notifications from the queue
def stream_notifications():
    while True:
        try:
            # Wait for a notification to become available (timeout if needed)
            notification = notification_queue.get(timeout=10)
            yield f"data: {notification}\n\n"
        except queue.Empty:
            # If no notifications for 10 seconds, send a heartbeat to keep connection alive
            yield "data: heartbeat\n\n"

# SSE endpoint to subscribe to notifications
@app.route('/subscribe', methods=['GET'])
def subscribe():
    return Response(stream_notifications(), mimetype="text/event-stream")

# Run the service on port 8080 or adjust as needed.
if __name__ == '__main__':
    # Choose an appropriate port: here we use 8080 for notifications (or use 4000 for SSE if desired)
    app.run(host="0.0.0.0", port=8080)
