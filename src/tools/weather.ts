// Weather tool using Open-Meteo API (free, no API key needed)

export interface WeatherData {
  location: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  uvIndex: number;
}

interface GeocodingResult {
  lat: number;
  lon: number;
  name: string;
}

async function getCoordinates(city: string): Promise<GeocodingResult> {
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
  );
  const data = await response.json();
  if (!data.results || data.results.length === 0) {
    throw new Error(`City "${city}" not found`);
  }
  const result = data.results[0];
  return {
    lat: result.latitude,
    lon: result.longitude,
    name: `${result.name}, ${result.country}`,
  };
}

export async function fetchWeather(city: string): Promise<WeatherData> {
  const coords = await getCoordinates(city);
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,uv_index`
  );
  const data = await response.json();
  return {
    location: coords.name,
    temperature: data.current.temperature_2m,
    feelsLike: data.current.apparent_temperature,
    humidity: data.current.relative_humidity_2m,
    windSpeed: data.current.wind_speed_10m,
    weatherCode: data.current.weather_code,
    uvIndex: data.current.uv_index,
  };
}
