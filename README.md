# Remote Fuel Monitoring System

## Overview
The **Remote Fuel Monitoring System** is designed to track fuel levels, pressure, and temperature in telecom tower generator fuel tanks. The system transmits real-time data to a web application via the cloud, providing efficient fuel management and reducing theft risks.
<img width="393" alt="block diagram" src="https://github.com/user-attachments/assets/b998bb3b-0b00-4d34-a5e2-cd0f08e4bec5" />

## Flow Chart
<img width="389" alt="Flowchart" src="https://github.com/user-attachments/assets/f9f07b9e-a533-4e8c-a087-fe6567da71a3" />

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
<img width="394" alt="Hard Integration" src="https://github.com/user-attachments/assets/c8022169-51af-4ff7-b6dc-ee908575c243" />

## Calculations: (In real case: these calculations should be for fuel tank)
<img width="393" alt="block diagram" src="https://github.com/user-attachments/assets/b10de10d-f41c-4b2f-8fc4-5b28feddd431" />

## Data Transmitting from Mircocontroller to Cloud 
<img width="392" alt="Transmitting" src="https://github.com/user-attachments/assets/0679ddcb-443e-4c97-97f1-a3f22e67c5b2" />

## WebApp Display for monitoring
![Untitled design (3)](https://github.com/user-attachments/assets/fbc48d21-695f-421f-b509-5a759febf00f)

![Untitled design (5)](https://github.com/user-attachments/assets/c120a467-c32e-4760-87a3-485781c2172f)

![Untitled design (4)](https://github.com/user-attachments/assets/61b5fd14-7e2f-4f40-a377-d5f3d1099539)

![Untitled design (6)](https://github.com/user-attachments/assets/fa883306-a55b-492d-8d44-3b89283ceed1)








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

