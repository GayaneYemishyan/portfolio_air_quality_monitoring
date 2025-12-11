# Gayane Yemishyan — Portfolio

A modern, responsive portfolio website showcasing projects, skills, and air quality data visualization. Built with vanilla JavaScript and [Chart.js](https://www.chartjs.org/).

## Features

- **Theme Toggle**: Light/dark mode with localStorage persistence
- **Air Quality Charts**: Real-time line charts visualizing PM1, PM2.5, PM4, PM10 measurements
- **Responsive Design**: Mobile-first layout with CSS Grid and media queries
- **Smooth Navigation**: Animated scroll to sections
- **Contact Form**: Demo form handler with console logging
- **Data Flexibility**: Fetches `data.json` over HTTP or uses fallback for offline use

## Project Structure

```
.
├── portfolio.html      # Main HTML page
├── styles.css          # Styling and responsive layout
├── script.js           # Application logic (themes, charts, form)
├── fallback-data.js    # Offline data fallback (69 sensor readings)
├── data.json           # Full air quality dataset (fetched on HTTP)
└── README.md           # This file
```

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

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ JavaScript required
- Chart.js v4 (CDN via jsDelivr)

## Customization

### Colors

Edit CSS variables in `styles.css`:

```css
:root {
  --accent: #38bdf8;   /* Chart colors, links */
  --muted: #9fbad7;    /* Axes, secondary text */
  /* ... more variables */
}
```

### Chart Appearance

Modify chart options in `createChart()` function in `script.js`:

- `aspectRatio`: Height ratio relative to width
- `tension`: Line smoothness (0 = straight, 1 = curved)
- `pointRadius`: Dot size on chart
- `borderWidth`: Line thickness

### Data Source

Replace `data.json` with your own sensor readings. File must be valid JSON with array of reading objects.

## Deployment

### GitHub Pages

1. Push to GitHub repository
2. Enable Pages in repo settings (branch: main, directory: root)
3. Charts will fetch `data.json` from your repo

### Static Hosting

Works on any static host (Netlify, Vercel, AWS S3, etc.). JSON fetching requires same-origin or CORS-enabled server.

## License

Portfolio and code by Gayane Yemishyan © 2025.

## Contact

📧 [gayaneyemishyan4@gmail.com](mailto:gayaneyemishyan4@gmail.com)  
🔗 [LinkedIn](https://linkedin.com/in/gayane-yemishyan)  
🐙 [GitHub](https://github.com/GayaneYemishyan)

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Customization

### Change Theme Colors
Edit CSS variables in `styles.css`:
```css
:root {
  --bg: #0a0f1f;
  --accent: #7dd3fc;
  --text: #e6f1ff;
  /* ... */
}
```

### Add More Data
Replace `data.json` with new readings (requires same format: `pm1_0`, `pm2_5`, `pm4_0`, `pm10`, `timestamp`)

### Modify Content
Update sections in `index.html` for About, Skills, Projects, Experience, Contact

## License

Personal portfolio — feel free to use as inspiration for your own portfolio.

## Author

**Gayane Yemishyan**
- Email: gayaneyemishyan4@gmail.com
- GitHub: [GayaneYemishyan](https://github.com/GayaneYemishyan)
- LinkedIn: [gayane-yemishyan](https://linkedin.com/in/gayane-yemishyan)
