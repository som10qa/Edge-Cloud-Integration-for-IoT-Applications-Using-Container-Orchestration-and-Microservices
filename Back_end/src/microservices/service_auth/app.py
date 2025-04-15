from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests from any origin

# In-memory user store (for demonstration purposes)
users = {}

# Home (health-check) endpoint supporting GET
@app.route('/', methods=['GET'])
def home():
    return "<h1>Flask Backend is Running</h1>", 200

# Login endpoint supporting both GET (for info) and POST (for login)
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return jsonify({
            "status": "info",
            "message": "This endpoint accepts POST requests with JSON payload for login. Example payload: { 'username': '...', 'password': '...'}"
        }), 200

    # Process POST request for login
    data = request.get_json() or {}
    username = data.get("username")
    password = data.get("password")
    
    if not username or not password:
        return jsonify({
            "status": "fail",
            "message": "Username and password are required."
        }), 400

    if username in users and users[username] == password:
        return jsonify({
            "status": "success",
            "message": "Logged in!"
        }), 200
    else:
        return jsonify({
            "status": "fail",
            "message": "Invalid credentials."
        }), 401

# Register endpoint supporting both GET (for info) and POST (for registration)
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'GET':
        return jsonify({
            "status": "info",
            "message": "This endpoint accepts POST requests with JSON payload for registration. Example payload: { 'username': '...', 'password': '...'}"
        }), 200

    # Process POST request for registration
    data = request.get_json() or {}
    username = data.get("username")
    password = data.get("password")
    
    if not username or not password:
        return jsonify({
            "status": "fail",
            "message": "Username and password are required."
        }), 400

    if username in users:
        return jsonify({
            "status": "fail",
            "message": "User already exists."
        }), 409

    users[username] = password
    return jsonify({
        "status": "success",
        "message": "User registered."
    }), 201

if __name__ == "__main__":
    # Run the app on all interfaces on port 5000
    app.run(host="0.0.0.0", port=5000)
