# Remote Fuel Monitoring System

## Overview
The **Remote Fuel Monitoring System** is designed to track fuel levels, pressure, and temperature in telecom tower generator fuel tanks. The system transmits real-time data to a web application via the cloud, providing efficient fuel management and reducing theft risks.

## Features
- Real-time monitoring of fuel level, temperature, and pressure
- Cloud-based data transmission
- Web application for data visualization
- IoT-based embedded system
- Theft detection and alert mechanism

## Technologies Used
- **Microcontroller:** ESP32
- **Sensors:** DS18B20 (Temperature), JSN-SR04T (Fuel Level), Pressure Transducer
- **Cloud Platform:** Firebase
- **Database:** MongoDB
- **Frontend:** React.js
- **Programming Language:** C++ (Arduino), JavaScript (React)

## System Architecture
The system consists of the following components:
1. **Sensors**: Collect real-time fuel data
2. **Microcontroller (ESP32)**: Processes and transmits sensor data
3. **Cloud (Firebase)**: Stores and manages data
4. **Web Application (React.js)**: Displays real-time analytics

## Usage
- Connect the microcontroller to the fuel tank sensors.
- Deploy the web application.
- Monitor real-time fuel data from the dashboard.

## Installation
```sh

# Clone the repository
git clone https://github.com/yourusername/remote-fuel-monitoring.git

# Install dependencies
npm install  # For web application

# Flash ESP32 with the Arduino code

# Configure Firebase API keys in the environment variables

# Run the web application
npm start

