// Weather widget HTML for ChatGPT Apps
// Uses window.openai.toolOutput to access data passed from the tool

export function getWeatherWidget(): string {
  return `<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 200px; color: white; }
    .weather-card { background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); border-radius: 16px; padding: 24px; max-width: 400px; }
    .location { font-size: 24px; font-weight: 600; margin-bottom: 8px; }
    .temp { font-size: 64px; font-weight: 300; margin: 16px 0; }
    .details { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-top: 16px; }
    .detail-item { background: rgba(255,255,255,0.1); padding: 12px; border-radius: 8px; }
    .detail-label { font-size: 12px; opacity: 0.8; }
    .detail-value { font-size: 18px; font-weight: 500; margin-top: 4px; }
    .condition { font-size: 18px; opacity: 0.9; }
    .error { color: #ffcccc; padding: 20px; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script>
    function getWeatherEmoji(code) {
      const emojis = { 0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️', 45: '🌫️', 48: '🌫️', 51: '🌧️', 53: '🌧️', 55: '🌧️', 61: '🌧️', 63: '🌧️', 65: '🌧️', 71: '🌨️', 73: '🌨️', 75: '🌨️', 80: '🌦️', 81: '🌦️', 82: '🌦️', 95: '⛈️', 96: '⛈️', 99: '⛈️' };
      return emojis[code] || '🌡️';
    }
    function getConditionText(code) {
      const conditions = { 0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast', 45: 'Foggy', 48: 'Foggy', 51: 'Light drizzle', 53: 'Drizzle', 55: 'Heavy drizzle', 61: 'Light rain', 63: 'Rain', 65: 'Heavy rain', 71: 'Light snow', 73: 'Snow', 75: 'Heavy snow', 80: 'Light showers', 81: 'Showers', 82: 'Heavy showers', 95: 'Thunderstorm', 96: 'Thunderstorm with hail', 99: 'Severe thunderstorm' };
      return conditions[code] || 'Unknown';
    }
    function render() {
      const root = document.getElementById('root');
      const data = window.openai?.toolOutput;
      if (!data || data.error) {
        root.innerHTML = '<div class="error">' + (data?.error || 'No weather data available') + '</div>';
        return;
      }
      const emoji = getWeatherEmoji(data.weatherCode);
      const condition = getConditionText(data.weatherCode);
      root.innerHTML = '<div class="weather-card"><div class="location">' + data.location + '</div><div class="condition">' + emoji + ' ' + condition + '</div><div class="temp">' + Math.round(data.temperature) + '°C</div><div class="details"><div class="detail-item"><div class="detail-label">Humidity</div><div class="detail-value">' + data.humidity + '%</div></div><div class="detail-item"><div class="detail-label">Wind</div><div class="detail-value">' + data.windSpeed + ' km/h</div></div><div class="detail-item"><div class="detail-label">Feels Like</div><div class="detail-value">' + Math.round(data.feelsLike) + '°C</div></div><div class="detail-item"><div class="detail-label">UV Index</div><div class="detail-value">' + data.uvIndex + '</div></div></div></div>';
    }
    if (window.openai) { render(); } else { window.addEventListener('load', render); }
  </script>
</body>
</html>`;
}
