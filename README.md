# Gayane Yemishyan — Portfolio

A modern, responsive portfolio website showcasing projects, skills, and air quality data visualization. Built with vanilla JavaScript and [Chart.js](https://www.chartjs.org/).

🌐 **Live Demo**: [http://16.171.97.241/](http://16.171.97.241/)

## Features

- **Theme Toggle**: Light/dark mode with localStorage persistence
- **Air Quality Charts**: Real-time line charts visualizing PM1, PM2.5, PM4, PM10 measurements
- **Responsive Design**: Mobile-first layout with CSS Grid and media queries
- **Smooth Navigation**: Animated scroll to sections
- **Contact Form**: Demo form handler with console logging
- **Data Flexibility**: Fetches `data.json` over HTTP or uses fallback for offline use
- **Arduino Integration**: ESP32-based air quality sensor data collection
- **AWS Lambda Backend**: Serverless data processing and storage

## Project Structure

```
.
├── portfolio/
│   ├── portfolio.html      # Main HTML page
│   ├── styles.css          # Styling and responsive layout
│   ├── script.js           # Application logic (themes, charts, form)
│   ├── fallback-data.js    # Offline data fallback (69 sensor readings)
│   └── data.json           # Full air quality dataset (fetched on HTTP)
├── arduino_sketch/         # ESP32 firmware for sensor data collection
├── lambda/                 # AWS Lambda functions for data processing
└── README. md               # This file
```

## Live Demo

Visit the live portfolio at:  **[http://16.171.97.241/](http://16.171.97.241/)**

## Setup & Running

### Option 1: Local Server (Recommended)

Serve files over HTTP to enable JSON fetching:

```bash
# Python 3
python -m http.server 5500

# Node.js / npm
npx serve .
```

Then open the local URL printed in your terminal (e.g., `http://localhost:5500`).

### Option 2: Direct File Open

Open `portfolio.html` directly in your browser (`file://...`). Charts will use the bundled fallback data from `fallback-data.js`.

## How It Works

### Data Loading (`script.js`)

The application prioritizes availability: 

1. **HTTP/Server**: Fetches fresh `data.json` with `cache: 'no-cache'`
2. **Fallback**: If fetch fails or `file://` protocol is detected, uses pre-bundled data from `fallback-data.js`

### Hardware Setup (Arduino/ESP32)

The `arduino_sketch/` folder contains firmware for ESP32 microcontroller that:
- Reads air quality sensor data (PM1, PM2.5, PM4, PM10)
- Connects to Wi-Fi network
- Sends data to AWS Lambda endpoint
- Supports local debugging via serial monitor

### Backend (AWS Lambda)

The `lambda/` folder contains serverless functions that:
- Receive sensor data from ESP32 device
- Process and validate measurements
- Store data in database or S3
- Serve data to the portfolio website

### Chart System

Four line charts render PM concentration over time:

- **PM1**: Ultra-fine particles
- **PM2.5**: Fine particles (health-relevant)
- **PM4**: Coarse particles
- **PM10**: Large particles

Each chart includes: 

- Responsive aspect ratio (1.5:1)
- Formatted timestamps on X-axis (15-label max, 45° rotation)
- Interactive tooltips with µg/m³ units
- Theme-aware colors (CSS variables `--accent`, `--muted`)

### Theme System

Toggles `.light-mode` class on `<body>`:

- Persists selection in `localStorage` under key `"theme"`
- Button label updates: "Dark" (light mode active) ↔ "Light" (dark mode active)
- All colors inherit from CSS custom properties

## Data Format

Each reading object contains: 

```json
{
  "pm1_0": 22.02,
  "pm2_5": 23.42,
  "pm4_0": 23.53,
  "pm10": 23.58,
  "timestamp": "2025-12-10T13:36:46.896467+04:00"
}
```

- **Measurements**: Particle Matter in µg/m³
- **Timestamp**: ISO 8601 format (+04:00 timezone)
- **69 readings** spanning 2025-12-10 to 2025-12-11

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)
- ES6+ JavaScript required
- Chart.js v4 (CDN via jsDelivr)

## Customization

### Change Theme Colors

Edit CSS variables in `styles.css`:

```css
:root {
  --bg: #0a0f1f;
  --accent:  #7dd3fc;
  --text: #e6f1ff;
  --muted:  #9fbad7;
}
```

### Chart Appearance

Modify chart options in `createChart()` function in `script.js`:

- `aspectRatio`: Height ratio relative to width
- `tension`: Line smoothness (0 = straight, 1 = curved)
- `pointRadius`: Dot size on chart
- `borderWidth`: Line thickness

### Add More Data

Replace `data.json` with new readings (requires same format: `pm1_0`, `pm2_5`, `pm4_0`, `pm10`, `timestamp`)

### Modify Content

Update sections in `portfolio.html` for About, Skills, Projects, Experience, Contact

## Deployment

### GitHub Pages

1. Push to GitHub repository
2. Enable Pages in repo settings (branch: main, directory: root)
3. Charts will fetch `data.json` from your repo

### Static Hosting

Works on any static host (Netlify, Vercel, AWS S3, etc.). JSON fetching requires same-origin or CORS-enabled server.

### Current Deployment

This portfolio is currently deployed at: **[http://16.171.97.241/](http://16.171.97.241/)**

## Technologies Used

- **JavaScript** (45.6%) - Frontend logic and interactivity
- **Arduino** (21.2%) - ESP32 firmware
- **HTML** (17.6%) - Page structure
- **CSS** (10.5%) - Styling and responsive design
- **Python** (5.1%) - Lambda functions and data processing

## License

Personal portfolio — feel free to use as inspiration for your own portfolio.

## Author

**Gayane Yemishyan**
- Email: gayaneyemishyan4@gmail.com
- GitHub: [GayaneYemishyan](https://github.com/GayaneYemishyan)
- LinkedIn: [gayane-yemishyan](https://linkedin.com/in/gayane-yemishyan)
