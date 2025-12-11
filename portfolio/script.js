// Theme toggle handler
function toggleTheme() {
  document.body.classList.toggle('light-mode');
  const themeText = document.getElementById('theme-text');
  const isLight = document.body.classList.contains('light-mode');
  themeText.textContent = isLight ? 'Dark' : 'Light';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

// Smooth scroll to Air Quality section
function scrollToAQ() {
  const section = document.getElementById('air-quality');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

// Air Quality Data Visualization
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  const themeText = document.getElementById('theme-text');
  
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    if (themeText) themeText.textContent = 'Dark';
  } else {
    if (themeText) themeText.textContent = 'Light';
  }

  if (!window.Chart) return;

  const warnEl = document.getElementById('air-quality');
  const showWarn = (msg) => {
    if (!warnEl) return;
    const note = document.createElement('p');
    note.style.color = '#f87171';
    note.style.marginTop = '10px';
    note.textContent = msg;
    warnEl.appendChild(note);
  };

  const styles = getComputedStyle(document.documentElement);
  const accent = styles.getPropertyValue('--accent').trim() || '#38bdf8';
  const tickColor = styles.getPropertyValue('--muted').trim() || '#9fbad7';
  const legendColor = styles.getPropertyValue('--text').trim() || '#e6f1ff';
  const embeddedAQData = {"readings":[{"pm1_0":22.02,"pm2_5":23.42,"pm4_0":23.53,"pm10":23.58,"timestamp":"2025-12-10T13:36:46.896467+04:00"},{"pm1_0":20.99,"pm2_5":22.36,"pm4_0":22.5,"pm10":22.57,"timestamp":"2025-12-10T13:46:44.388119+04:00"},{"pm1_0":19.93,"pm2_5":21.21,"pm4_0":21.33,"pm10":21.38,"timestamp":"2025-12-10T13:52:13.606544+04:00"},{"pm1_0":20.51,"pm2_5":21.83,"pm4_0":21.94,"pm10":22.0,"timestamp":"2025-12-10T14:02:11.655314+04:00"},{"pm1_0":37.47,"pm2_5":40.5,"pm4_0":41.23,"pm10":41.6,"timestamp":"2025-12-10T14:12:08.973396+04:00"},{"pm1_0":36.67,"pm2_5":40.02,"pm4_0":41.04,"pm10":41.57,"timestamp":"2025-12-10T14:22:06.502341+04:00"},{"pm1_0":41.39,"pm2_5":45.46,"pm4_0":46.85,"pm10":47.56,"timestamp":"2025-12-10T14:32:05.915834+04:00"},{"pm1_0":43.57,"pm2_5":47.85,"pm4_0":49.32,"pm10":50.06,"timestamp":"2025-12-10T14:42:05.328370+04:00"},{"pm1_0":45.66,"pm2_5":50.45,"pm4_0":52.23,"pm10":53.14,"timestamp":"2025-12-10T14:52:05.793631+04:00"},{"pm1_0":53.21,"pm2_5":58.85,"pm4_0":60.98,"pm10":62.07,"timestamp":"2025-12-10T15:02:15.330664+04:00"},{"pm1_0":50.19,"pm2_5":55.1,"pm4_0":56.77,"pm10":57.62,"timestamp":"2025-12-10T15:12:15.588501+04:00"},{"pm1_0":56.66,"pm2_5":62.71,"pm4_0":65.02,"pm10":66.19,"timestamp":"2025-12-10T15:22:16.253175+04:00"},{"pm1_0":55.11,"pm2_5":61.37,"pm4_0":63.93,"pm10":65.24,"timestamp":"2025-12-10T15:32:18.616180+04:00"},{"pm1_0":57.42,"pm2_5":63.94,"pm4_0":66.6,"pm10":67.96,"timestamp":"2025-12-10T15:42:18.797507+04:00"},{"pm1_0":60.64,"pm2_5":66.36,"pm4_0":68.21,"pm10":69.15,"timestamp":"2025-12-10T16:04:24.214638+04:00"},{"pm1_0":62.87,"pm2_5":68.81,"pm4_0":70.74,"pm10":71.72,"timestamp":"2025-12-10T16:14:23.935506+04:00"},{"pm1_0":60.52,"pm2_5":66.36,"pm4_0":68.3,"pm10":69.29,"timestamp":"2025-12-10T16:24:24.051077+04:00"},{"pm1_0":65.57,"pm2_5":72.2,"pm4_0":74.56,"pm10":75.76,"timestamp":"2025-12-10T16:34:26.660693+04:00"},{"pm1_0":64.73,"pm2_5":71.25,"pm4_0":73.57,"pm10":74.74,"timestamp":"2025-12-10T16:44:27.956113+04:00"},{"pm1_0":93.74,"pm2_5":100.16,"pm4_0":101.02,"pm10":101.45,"timestamp":"2025-12-10T16:54:28.994531+04:00"},{"pm1_0":70.15,"pm2_5":77.15,"pm4_0":79.61,"pm10":80.85,"timestamp":"2025-12-10T17:04:30.973601+04:00"},{"pm1_0":71.83,"pm2_5":78.97,"pm4_0":81.45,"pm10":82.72,"timestamp":"2025-12-10T17:14:32.991441+04:00"},{"pm1_0":69.36,"pm2_5":77.37,"pm4_0":80.7,"pm10":82.39,"timestamp":"2025-12-10T17:24:43.494749+04:00"},{"pm1_0":74.46,"pm2_5":81.66,"pm4_0":84.08,"pm10":85.31,"timestamp":"2025-12-10T17:34:42.626050+04:00"},{"pm1_0":75.66,"pm2_5":85.36,"pm4_0":89.77,"pm10":92.01,"timestamp":"2025-12-10T17:44:52.595075+04:00"},{"pm1_0":73.94,"pm2_5":81.62,"pm4_0":84.45,"pm10":85.89,"timestamp":"2025-12-10T17:54:52.241154+04:00"},{"pm1_0":76.39,"pm2_5":84.65,"pm4_0":87.84,"pm10":89.46,"timestamp":"2025-12-10T18:04:53.956893+04:00"},{"pm1_0":72.87,"pm2_5":80.16,"pm4_0":82.72,"pm10":84.03,"timestamp":"2025-12-10T18:14:53.866548+04:00"},{"pm1_0":77.69,"pm2_5":87.3,"pm4_0":91.55,"pm10":93.71,"timestamp":"2025-12-10T18:24:55.228075+04:00"},{"pm1_0":82.5,"pm2_5":92.71,"pm4_0":97.22,"pm10":99.52,"timestamp":"2025-12-10T18:45:14.103866+04:00"},{"pm1_0":83.08,"pm2_5":93.52,"pm4_0":98.2,"pm10":100.58,"timestamp":"2025-12-10T19:26:23.578330+04:00"},{"pm1_0":83.39,"pm2_5":92.54,"pm4_0":96.14,"pm10":97.96,"timestamp":"2025-12-10T19:36:22.660053+04:00"},{"pm1_0":108.38,"pm2_5":121.71,"pm4_0":127.56,"pm10":130.54,"timestamp":"2025-12-10T22:39:57.853073+04:00"},{"pm1_0":114.62,"pm2_5":128.54,"pm4_0":134.59,"pm10":137.67,"timestamp":"2025-12-10T22:49:57.842236+04:00"},{"pm1_0":120.8,"pm2_5":138.37,"pm4_0":147.15,"pm10":151.61,"timestamp":"2025-12-10T22:59:58.250460+04:00"},{"pm1_0":123.26,"pm2_5":137.66,"pm4_0":143.71,"pm10":146.78,"timestamp":"2025-12-10T23:10:08.319403+04:00"},{"pm1_0":101.56,"pm2_5":117.1,"pm4_0":125.11,"pm10":129.18,"timestamp":"2025-12-11T02:33:54.307298+04:00"},{"pm1_0":101.79,"pm2_5":116.56,"pm4_0":123.92,"pm10":127.66,"timestamp":"2025-12-11T02:44:04.523145+04:00"},{"pm1_0":101.87,"pm2_5":116.04,"pm4_0":122.91,"pm10":126.4,"timestamp":"2025-12-11T02:54:06.818989+04:00"},{"pm1_0":97.97,"pm2_5":112.08,"pm4_0":119.08,"pm10":122.64,"timestamp":"2025-12-11T03:04:08.511114+04:00"},{"pm1_0":101.59,"pm2_5":116.86,"pm4_0":124.65,"pm10":128.6,"timestamp":"2025-12-11T03:14:19.148534+04:00"},{"pm1_0":92.89,"pm2_5":105.46,"pm4_0":111.43,"pm10":114.47,"timestamp":"2025-12-11T03:24:20.191728+04:00"},{"pm1_0":90.19,"pm2_5":103.62,"pm4_0":110.43,"pm10":113.89,"timestamp":"2025-12-11T03:34:28.491565+04:00"},{"pm1_0":91.67,"pm2_5":105.95,"pm4_0":113.39,"pm10":117.17,"timestamp":"2025-12-11T03:44:28.914335+04:00"},{"pm1_0":88.44,"pm2_5":103.37,"pm4_0":111.5,"pm10":115.63,"timestamp":"2025-12-11T03:54:31.520347+04:00"},{"pm1_0":95.05,"pm2_5":109.94,"pm4_0":117.72,"pm10":121.67,"timestamp":"2025-12-11T04:04:33.429059+04:00"},{"pm1_0":93.51,"pm2_5":106.81,"pm4_0":113.36,"pm10":116.69,"timestamp":"2025-12-11T04:14:35.026945+04:00"},{"pm1_0":89.73,"pm2_5":105.1,"pm4_0":113.52,"pm10":117.81,"timestamp":"2025-12-11T04:24:38.620713+04:00"},{"pm1_0":88.85,"pm2_5":102.24,"pm4_0":109.09,"pm10":112.57,"timestamp":"2025-12-11T04:34:41.611936+04:00"},{"pm1_0":89.43,"pm2_5":103.44,"pm4_0":110.76,"pm10":114.48,"timestamp":"2025-12-11T04:44:44.214755+04:00"},{"pm1_0":85.41,"pm2_5":100.55,"pm4_0":109.01,"pm10":113.3,"timestamp":"2025-12-11T04:54:47.023415+04:00"},{"pm1_0":83.19,"pm2_5":97.5,"pm4_0":105.37,"pm10":109.37,"timestamp":"2025-12-11T05:04:49.056346+04:00"},{"pm1_0":82.72,"pm2_5":96.01,"pm4_0":103.06,"pm10":106.65,"timestamp":"2025-12-11T05:14:51.591409+04:00"},{"pm1_0":89.71,"pm2_5":101.41,"pm4_0":106.81,"pm10":109.56,"timestamp":"2025-12-11T05:24:53.566607+04:00"},{"pm1_0":85.46,"pm2_5":99.37,"pm4_0":106.81,"pm10":110.59,"timestamp":"2025-12-11T05:34:55.354203+04:00"},{"pm1_0":87.77,"pm2_5":101.36,"pm4_0":108.42,"pm10":112.0,"timestamp":"2025-12-11T05:44:59.035695+04:00"},{"pm1_0":93.58,"pm2_5":106.59,"pm4_0":112.89,"pm10":116.09,"timestamp":"2025-12-11T05:54:56.755364+04:00"},{"pm1_0":92.55,"pm2_5":104.74,"pm4_0":110.42,"pm10":113.3,"timestamp":"2025-12-11T06:04:58.996979+04:00"},{"pm1_0":89.69,"pm2_5":101.31,"pm4_0":106.64,"pm10":109.35,"timestamp":"2025-12-11T06:15:00.443432+04:00"},{"pm1_0":88.5,"pm2_5":99.41,"pm4_0":104.23,"pm10":106.67,"timestamp":"2025-12-11T06:25:02.634541+04:00"},{"pm1_0":87.3,"pm2_5":99.31,"pm4_0":105.07,"pm10":108.0,"timestamp":"2025-12-11T06:35:02.705700+04:00"},{"pm1_0":82.68,"pm2_5":94.87,"pm4_0":101.01,"pm10":104.13,"timestamp":"2025-12-11T06:45:05.123880+04:00"},{"pm1_0":76.63,"pm2_5":86.59,"pm4_0":91.17,"pm10":93.5,"timestamp":"2025-12-11T06:55:17.927081+04:00"},{"pm1_0":82.19,"pm2_5":92.19,"pm4_0":96.54,"pm10":98.75,"timestamp":"2025-12-11T07:05:18.763505+04:00"},{"pm1_0":77.67,"pm2_5":87.47,"pm4_0":91.88,"pm10":94.13,"timestamp":"2025-12-11T07:15:21.720764+04:00"},{"pm1_0":72.45,"pm2_5":81.83,"pm4_0":86.14,"pm10":88.32,"timestamp":"2025-12-11T07:25:25.059790+04:00"},{"pm1_0":74.23,"pm2_5":83.0,"pm4_0":86.72,"pm10":88.61,"timestamp":"2025-12-11T07:35:28.352883+04:00"},{"pm1_0":67.65,"pm2_5":76.28,"pm4_0":80.19,"pm10":82.18,"timestamp":"2025-12-11T07:45:29.434717+04:00"},{"pm1_0":76.91,"pm2_5":84.4,"pm4_0":86.94,"pm10":88.23,"timestamp":"2025-12-11T07:55:27.094806+04:00"}]};

  const data = Array.isArray(embeddedAQData) ? embeddedAQData : embeddedAQData.readings;
  if (!Array.isArray(data) || data.length === 0) {
    showWarn('No air-quality data found.');
    return;
  }

  const timestamps = data.map(d => d.timestamp);
  const labels = data.map(d => {
    const dt = new Date(d.timestamp);
    if (Number.isNaN(dt)) return d.timestamp;
    return dt.toLocaleString('en-GB', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false });
  });

  const series = [
    { id: 'pm1Chart',  keys: ['pm1', 'pm1_0', 'PM1', 'PM1.0'], label: 'PM1' },
    { id: 'pm25Chart', keys: ['pm2_5', 'PM2.5'],               label: 'PM2.5' },
    { id: 'pm4Chart',  keys: ['pm4_0', 'PM4'],                 label: 'PM4' },
    { id: 'pm10Chart', keys: ['pm10', 'PM10'],                 label: 'PM10' }
  ];

  function makeChart(id, label, values) {
    const el = document.getElementById(id);
    if (!el) return;

    new Chart(el, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label,
          data: values,
          borderWidth: 2,
          borderColor: accent,
          backgroundColor: accent + '22',
          pointBackgroundColor: accent,
          pointBorderColor: accent,
          pointRadius: 3,
          pointHoverRadius: 5,
          tension: 0.4,
          fill: true,
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
          legend: { 
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(22, 35, 62, 0.9)',
            titleColor: '#e6f1ff',
            bodyColor: '#9fbad7',
            borderColor: accent,
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

  series.forEach(({ id, keys, label }) => {
    const values = data.map(d => {
      for (const k of keys) {
        if (d[k] !== undefined) return d[k];
      }
      return null;
    });
    makeChart(id, label, values);
  });
});


