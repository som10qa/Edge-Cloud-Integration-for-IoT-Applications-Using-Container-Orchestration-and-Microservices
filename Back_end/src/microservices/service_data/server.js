const express = require('express');
const app = express();

app.use(express.json());

let dataStore = []; // In-memory data storage

// Endpoint to retrieve stored data
app.get('/data', (req, res) => {
  res.json(dataStore);
});

// Endpoint to store sensor data
app.post('/data', (req, res) => {
  const data = req.body;
  dataStore.push(data);
  res.status(201).json({ message: 'Data stored successfully', data });
});

app.listen(3000, () => {
  console.log('Data Service running on port 3000');
});