const express = require('express');
const EventEmitter = require('events');
const app = express();

app.use(express.json());

// Create an instance of EventEmitter for pub-sub events
const pubSub = new EventEmitter();

// Endpoint to publish messages
app.post('/publish', (req, res) => {
  const message = req.body;
  pubSub.emit("message", message);
  res.status(200).json({ message: "Message published successfully" });
});

// Endpoint to subscribe to messages using Server-Sent Events (SSE)
app.get('/subscribe', (req, res) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });
  res.write("data: Subscribed to pub-sub service\n\n");
  
  // Function to send messages to the client
  const onMessage = (msg) => {
    res.write(`data: ${JSON.stringify(msg)}\n\n`);
  };

  pubSub.on("message", onMessage);

  // Clean up when the client disconnects
  req.on('close', () => {
    pubSub.removeListener("message", onMessage);
  });
});

app.listen(4000, () => {
  console.log("Pub-Sub Service is running on port 4000");
});