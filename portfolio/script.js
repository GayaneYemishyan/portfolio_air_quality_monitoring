/**
 * Air Quality Portfolio - Main Application Script
 * 
 * Features:
 * - Theme toggle (light/dark mode with localStorage persistence)
 * - Smooth navigation to Air Quality section
 * - Real-time air quality chart visualization using Chart.js
 * - Data fetching from data.json (with fallback for file:// protocol)
 * - Contact form demo handler
 */

// ===========================
// Theme Management
// ===========================

/**
 * Toggles between light and dark themes.
 * Persists selection in localStorage.
 */
function toggleTheme() {
  document.body.classList.toggle('light-mode');
  const themeText = document.getElementById('theme-text');
  const isLight = document.body.classList.contains('light-mode');
  themeText.textContent = isLight ? 'Dark' : 'Light';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

/**
 * Restores saved theme from localStorage on page load.
 */
function restoreSavedTheme() {
  const savedTheme = localStorage.getItem('theme');
  const themeText = document.getElementById('theme-text');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    if (themeText) themeText.textContent = 'Dark';
  } else {
    if (themeText) themeText.textContent = 'Light';
  }
}

// ===========================
// Navigation
// ===========================

/**
 * Smooth scroll to the Air Quality section.
 */
function scrollToAQ() {
  const section = document.getElementById('air-quality');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

// ===========================
// Air Quality Chart System
// ===========================

document.addEventListener('DOMContentLoaded', () => {
  // Restore theme preference
  restoreSavedTheme();

  // Exit early if Chart.js is not loaded
  if (!window.Chart) {
    console.warn('Chart.js not loaded; air quality charts unavailable.');
    return;
  }

  const warnEl = document.getElementById('air-quality');

  /**
   * Display a warning message in the air-quality section.
   * @param {string} msg - Warning message to display
   */
  const showWarn = (msg) => {
    if (!warnEl) return;
    const note = document.createElement('p');
    note.style.color = '#f87171';
    note.style.marginTop = '10px';
    note.textContent = msg;
    warnEl.appendChild(note);
  };

  // Get CSS color variables for chart styling
  const styles = getComputedStyle(document.documentElement);
  const accentColor = styles.getPropertyValue('--accent').trim() || '#38bdf8';
  const tickColor = styles.getPropertyValue('--muted').trim() || '#9fbad7';

  /**
   * Loads air quality data from data.json or uses fallback.
   * Fallback is used when:
   * 1. Page is opened via file:// protocol (fetch is blocked)
   * 2. HTTP fetch fails
   * 
   * @returns {Promise<Array>} Array of reading objects with pm1_0, pm2_5, pm4_0, pm10, timestamp
   */
  async function loadData() {
    // Use fallback for file:// protocol (cannot fetch local files)
    if (window.location.protocol === 'file:') {
      console.log('Running offline (file:// protocol); using fallback data.');
      return typeof FALLBACK_AQ_READINGS !== 'undefined' ? FALLBACK_AQ_READINGS : [];
    }

    // Attempt to fetch data.json from server
    try {
      const res = await fetch('data.json', { cache: 'no-cache' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      const parsed = Array.isArray(json) ? json : json?.readings;
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      console.warn('Failed to fetch data.json; using fallback.', err);
      return typeof FALLBACK_AQ_READINGS !== 'undefined' ? FALLBACK_AQ_READINGS : [];
    }
  }

  /**
   * Initializes all air quality charts after data is loaded.
   */
  async function initCharts() {
    const data = await loadData();

    if (!Array.isArray(data) || data.length === 0) {
      showWarn('No air-quality data found.');
      return;
    }

    // Extract timestamps and format labels
    const timestamps = data.map(d => d.timestamp);
    const labels = data.map(d => {
      const dt = new Date(d.timestamp);
      if (Number.isNaN(dt)) return d.timestamp;
      return dt.toLocaleString('en-GB', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
    });

    // Define chart series: PM1, PM2.5, PM4, PM10
    const chartSeries = [
      { id: 'pm1Chart', keys: ['pm1', 'pm1_0', 'PM1', 'PM1.0'], label: 'PM1' },
      { id: 'pm25Chart', keys: ['pm2_5', 'PM2.5'], label: 'PM2.5' },
      { id: 'pm4Chart', keys: ['pm4_0', 'PM4'], label: 'PM4' },
      { id: 'pm10Chart', keys: ['pm10', 'PM10'], label: 'PM10' }
    ];

    /**
     * Creates a single line chart for a given PM measurement.
     * @param {string} canvasId - DOM element id of the canvas
     * @param {string} label - Chart label (e.g., "PM2.5")
     * @param {Array} values - Data values for the Y-axis
     */
    function createChart(canvasId, label, values) {
      const canvas = document.getElementById(canvasId);
      if (!canvas) return;

      new Chart(canvas, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label,
            data: values,
            borderWidth: 2,
            borderColor: accentColor,
            backgroundColor: accentColor + '22',
            pointBackgroundColor: accentColor,
            pointBorderColor: accentColor,
            pointRadius: 3,
            pointHoverRadius: 5,
            tension: 0.4,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          aspectRatio: 1.5,
          scales: {
            x: {
              ticks: {
                color: tickColor,
                maxRotation: 45,
                minRotation: 45,
                autoSkip: true,
                maxTicksLimit: 15
              },
              grid: { color: 'rgba(159, 186, 215, 0.1)' }
            },
            y: {
              ticks: { color: tickColor },
              grid: { color: 'rgba(159, 186, 215, 0.1)' },
              beginAtZero: false
            }
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: 'rgba(22, 35, 62, 0.9)',
              titleColor: '#e6f1ff',
              bodyColor: '#9fbad7',
              borderColor: accentColor,
              borderWidth: 1,
              callbacks: {
                title: (items) => {
                  const i = items?.[0]?.dataIndex ?? 0;
                  return timestamps[i] || items?.[0]?.label;
                },
                label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y.toFixed(2)} µg/m³`
              }
            }
          }
        }
      });
    }

    // Create a chart for each PM series
    chartSeries.forEach(({ id, keys, label }) => {
      const values = data.map(d => {
        // Try multiple key variants to find the value
        for (const key of keys) {
          if (d[key] !== undefined) return d[key];
        }
        return null;
      });
      createChart(id, label, values);
    });
  }

  // Initialize charts on page load
  initCharts();
});

// ===========================
// Contact Form
// ===========================

/**
 * Handles contact form submission.
 * This is a demo; in production, integrate with a backend service.
 */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    console.log('Form data:', Object.fromEntries(formData));
    alert('Message received! (This is a demo - no backend integration yet)');
    form.reset();
  });
});

