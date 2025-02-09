const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Include CORS package

const app = express();
const port = 5000;

app.use(cors()); // Enable CORS for all routes and origins
app.use(bodyParser.json()); // Body parser middleware

// Connect to MongoDB
mongoose.connect('mongodb+srv://mwaqasakhtar101:uT8yu7UHJJhRmkCb@cluster0.wg4on3p.mongodb.net/sensorDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Define a schema for Sensor Data
const SensorDataSchema = new mongoose.Schema({
  distance: Number,
  temperature: Number,
  pressure: Number,
}, { timestamps: true });

const SensorData = mongoose.model('SensorData', SensorDataSchema);

// Routes
app.post('/api/sensorData', (req, res) => {
  const newSensorData = new SensorData(req.body);
  newSensorData.save()
    .then(data => res.json(data))
    .catch(err => res.status(400).json('Error: ' + err));
});

app.get('/api/sensorData', async (req, res) => {
    try {
      const sensorData = await SensorData.find().sort({ createdAt: -1 }); // Assuming SensorData is your model
      res.json(sensorData);
    } catch (error) {
      console.error("Error fetching sensor data:", error);
      res.status(500).json({ message: "Error fetching sensor data" });
    }
  });
  
  
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
