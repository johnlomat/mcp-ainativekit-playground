import React from 'react'
import ReactDOM from 'react-dom/client'
import { WeatherWidget } from '../components/WeatherWidget'

// Get weather data from ChatGPT's tool output
const getWeatherData = () => {
  const toolOutput = (window as any).openai?.toolOutput
  return toolOutput || {
    location: 'Demo City',
    temperature: 25,
    humidity: 60,
    windSpeed: 12,
    feelsLike: 27,
    uvIndex: 5,
    weatherCode: 0
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WeatherWidget data={getWeatherData()} />
  </React.StrictMode>
)
