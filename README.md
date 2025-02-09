# Remote Fuel Monitoring System

## Overview
The **Remote Fuel Monitoring System** is designed to track fuel levels, pressure, and temperature in telecom tower generator fuel tanks. The system transmits real-time data to a web application via the cloud, providing efficient fuel management and reducing theft risks.
![Untitled design (7)](https://github.com/user-attachments/assets/d4f02fbf-3b3c-4770-9197-94e928e390e2)

## Flow Chart
![Untitled design (8)](https://github.com/user-attachments/assets/c2877035-4ec2-41fe-9e57-052fa9148b71)

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

## Hardware Integration
![Untitled design (11)](https://github.com/user-attachments/assets/a648e7b5-d0db-4f0d-b23a-af7feb2cf937)

## Calculations: (In real case: these calculations should be for fuel tank)
![Untitled design (9)](https://github.com/user-attachments/assets/3dfbeaa3-f21e-429f-a93b-6af57141f414)

## Data Transmitting from Mircocontroller to Cloud 
![Untitled design (10)](https://github.com/user-attachments/assets/f2800ff5-577b-4089-ba55-21b8ca2b9eca)

## WebApp Display for monitoring
![Untitled design (3)](https://github.com/user-attachments/assets/2611e93c-6fd4-4850-ab09-4754a1b0a7f8)

![Untitled design (5)](https://github.com/user-attachments/assets/a5614aec-f50f-4849-a88f-afd71d07dbf6)

![Untitled design (4)](https://github.com/user-attachments/assets/a2eeaed0-3a22-46fe-a6af-25ac3e599f93)

![Untitled design (6)](https://github.com/user-attachments/assets/c2ef866d-5f19-40a0-ad56-bc5dc0908de3)

## Installation
```sh

# Clone the repository
git clone https://github.com/yourusername/Remote-Fuel-Monitoring-System.git

# Install dependencies
npm install  # For web application

# Flash ESP32 with the Arduino code

# Configure Firebase API keys in the environment variables

# Run the web application
npm start

