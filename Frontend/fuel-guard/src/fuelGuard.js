import React, { useEffect, useState, useRef } from 'react';
import { database } from './firebase';
import { ref, onValue } from "firebase/database";
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import './fuelGuard.css'; 
import 'chartjs-plugin-zoom';
import { registerables } from 'chart.js';
Chart.register(...registerables);

const SensorDataComponent = () => {
  const [sensorData, setSensorData] = useState({ distance: null, temperature: null, pressure: null });
  const [historicalSensorData, setHistoricalSensorData] = useState([]);
  const [previousDistance, setPreviousDistance] = useState(null);
  const [previousTimestamp, setPreviousTimestamp] = useState(null);
  const [burnRate, setBurnRate] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [message, setMessage] = useState([]);
  const fullMessage = "Stay Fueled, Stay Guarded. Welcome to Fuel Guard!";
  const [initialized, setInitialized] = useState(false);
  const [currentMinTime, setCurrentMinTime] = useState(new Date(new Date().getTime() - 3600000)); // Set to one hour ago

  const distanceChartRef = useRef(null);
  const temperatureChartRef = useRef(null);
  const pressureChartRef = useRef(null);

  const distanceChartInstanceRef = useRef(null);
  const temperatureChartInstanceRef = useRef(null);
  const pressureChartInstanceRef = useRef(null);

  useEffect(() => {
    const timeouts = [];
    const words = fullMessage.split(" ");
    words.forEach((word, index) => {
      const id = setTimeout(() => {
        setMessage(prev => [...prev, word]);
      }, 400 * (index + 1));
      timeouts.push(id);
    });

    const hideTimer = setTimeout(() => {
      setShowWelcome(false);
      setInitialized(true);
    }, 400 * (words.length + 1));

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMinTime(new Date(new Date().getTime() - 3600000));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const dataRef = ref(database, '/sensors');
    let lastTimestamp = null;
    let lastDistance = null;
    let burnRateTimeout = null; // Timeout handle for debouncing
  
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      const now = new Date().getTime();
  
      if (data && typeof data.distance_cm !== 'undefined') {
        const rawNewDistance = data.distance_cm;
        const newDistance = 100 * (1 - (rawNewDistance - 80) / (20 - 80)); // Percentage calculation
  
        const newSensorData = {
          distance: newDistance,
          temperature: data.temperature_C,
          pressure: data.pressure_psi
        };
        setSensorData(newSensorData);
        saveSensorDataToMongoDB({ ...newSensorData, distance: rawNewDistance });
  
        // Clear the previous timeout to debounce the calculation
        clearTimeout(burnRateTimeout);
        burnRateTimeout = setTimeout(() => {
          if (lastDistance !== null && lastTimestamp !== null) {
            const timeDifference = (now - lastTimestamp) / 1000; // time in seconds
            if (timeDifference > 0) {
              const distanceDifference = rawNewDistance - lastDistance;
              const newBurnRate = distanceDifference / timeDifference; // rate per second
              setBurnRate(newBurnRate);
            }
          } else {
            setBurnRate(null); // Reset burn rate if there's no previous data to compare
          }
  
          // Update last used values after the calculation
          lastDistance = rawNewDistance;
          lastTimestamp = now;
        }, 500); // Delay the calculation by 500 milliseconds
      }
    }, (error) => {
      console.error("Firebase Read Error:", error);
    });
  
    return () => {
      unsubscribe();
      clearTimeout(burnRateTimeout); // Clear timeout on unmount
      setBurnRate(null); // Reset burn rate on component unmount
    };
  }, []);  

  const saveSensorDataToMongoDB = async (sensorData) => {
    try {
      const response = await fetch('http://localhost:5000/api/sensorData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sensorData),
      });
      if (!response.ok) {
        throw new Error('Failed to save sensor data');
      }
    } catch (error) {
      console.error("Error saving data to MongoDB:", error);
    }
  };

  const fetchHistoricalSensorData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/sensorData');
      if (!response.ok) {
        throw new Error('Failed to fetch historical sensor data');
      }
      const data = await response.json();
      setHistoricalSensorData(data);
    } catch (error) {
      console.error("Error fetching historical data from MongoDB:", error);
    }
  };

  useEffect(() => {
    fetchHistoricalSensorData();
  }, []);

  useEffect(() => {
    if (!initialized || historicalSensorData.length === 0) return;

    const updateChart = (chartRef, instanceRef, dataKey, label, color) => {
      if (!chartRef.current) return;

      const ctx = chartRef.current.getContext('2d');
      if (instanceRef.current) {
        instanceRef.current.destroy();
      }
      const labels = historicalSensorData.map(data => new Date(data.createdAt));
      const dataPoints = historicalSensorData.map(data => data[dataKey]);

      instanceRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: label,
            data: dataPoints,
            borderColor: `rgb(${color})`,
            backgroundColor: `rgba(${color}, 0.5)`,
            fill: false,
          }],
        },
        options: {
          scales: {
            x: {
              type: 'time',
              time: {
                parser: 'yyyy-MM-dd HH:mm',
                unit: 'minute',
                stepSize: 5,
                displayFormats: {
                  minute: 'HH:mm',
                  hour: 'HH:mm',
                },
                tooltipFormat: 'yyyy-MM-dd HH:mm',
              },
              title: {
                display: true,
                text: 'Date and Time'
              },
              min: currentMinTime,
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: `${label} Units`
              }
            }
          },
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            zoom: {
              pan: {
                enabled: true,
                mode: 'xy',
              },
              zoom: {
                wheel: {
                  enabled: true,
                },
                pinch: {
                  enabled: true,
                },
                mode: 'xy',
              },
            },
          },
        },
      });
    };

    updateChart(distanceChartRef, distanceChartInstanceRef, 'distance', 'Level (%)', '255, 99, 132');
    updateChart(temperatureChartRef, temperatureChartInstanceRef, 'temperature', 'Temperature (°C)', '54, 162, 235');
    updateChart(pressureChartRef, pressureChartInstanceRef, 'pressure', 'Pressure (psi)', '75, 192, 192');
  }, [historicalSensorData, initialized, currentMinTime]);

  if (showWelcome) {
    return <div className="welcome-message">{message.join(" ")}&nbsp;</div>;
  }

  return (
    <div className="sensor-container">
      <h2 className="sensor-title">Real-Time Sensor Data</h2>
      <div className="sensor-reading">
        <span className="sensor-label">Level:</span>
        <span className="sensor-value">{sensorData.distance !== null ? `${sensorData.distance.toFixed(2)}%` : 'Loading...'}</span>
      </div>
      <div className="sensor-reading">
        <span className="sensor-label">Temperature:</span>
        <span className="sensor-value">{sensorData.temperature !== null ? `${sensorData.temperature} °C` : 'Loading...'}</span>
      </div>
      <div className="sensor-reading">
        <span className="sensor-label">Pressure:</span>
        <span className="sensor-value">{sensorData.pressure !== null ? `${sensorData.pressure} psi` : 'Loading...'}</span>
      </div>
      <div className="sensor-reading">
        <span className="sensor-label">Burn Rate:</span>
        <span className="sensor-value">{burnRate !== null ? `${burnRate.toFixed(4)} ml/sec` : 'Calculating...'}</span>
      </div>
      
      <h2 className="sensor-title">Historical Sensor Data Visualization</h2>
      <div className="chart-container" style={{ height: '400px', width: '100%' }}>
        <canvas ref={distanceChartRef}></canvas>
      </div>
      <div className="chart-container" style={{ height: '400px', width: '100%' }}>
        <canvas ref={temperatureChartRef}></canvas>
      </div>
      <div className="chart-container" style={{ height: '400px', width: '100%' }}>
        <canvas ref={pressureChartRef}></canvas>
      </div>
    </div>
  );
};

export default SensorDataComponent;
