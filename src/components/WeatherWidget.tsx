import React from 'react'
import { Card, Badge, Chip } from '@ainativekit/ui'

interface WeatherData {
  location?: string
  temperature?: number
  humidity?: number
  windSpeed?: number
  feelsLike?: number
  uvIndex?: number
  weatherCode?: number
}

interface WeatherWidgetProps {
  data: WeatherData
}

const getWeatherEmoji = (code: number): string => {
  if (code === 0) return '☀️'
  if (code <= 3) return '⛅'
  if (code <= 49) return '🌫️'
  if (code <= 69) return '🌧️'
  if (code <= 79) return '🌨️'
  if (code <= 99) return '⛈️'
  return '🌡️'
}

const getWeatherDescription = (code: number): string => {
  if (code === 0) return 'Clear sky'
  if (code <= 3) return 'Partly cloudy'
  if (code <= 49) return 'Foggy'
  if (code <= 69) return 'Rainy'
  if (code <= 79) return 'Snowy'
  if (code <= 99) return 'Thunderstorm'
  return 'Unknown'
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ data }) => {
  const emoji = getWeatherEmoji(data.weatherCode || 0)
  const description = getWeatherDescription(data.weatherCode || 0)

  return (
    <Card elevationLevel={1}>
      <Card.Header>
        <Card.ChipGroup>
          <Chip variant="neutral">{emoji} {description}</Chip>
        </Card.ChipGroup>
      </Card.Header>
      <Card.Body>
        <Card.Title>{data.location || 'Unknown Location'}</Card.Title>
        <div style={{ fontSize: '48px', fontWeight: 300, textAlign: 'center', margin: '16px 0' }}>
          {data.temperature ?? '--'}°C
        </div>
        <Card.Description>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '12px' }}>
            <Badge variant="neutral">💧 Humidity: {data.humidity ?? '--'}%</Badge>
            <Badge variant="neutral">💨 Wind: {data.windSpeed ?? '--'} km/h</Badge>
            <Badge variant="neutral">🌡️ Feels: {data.feelsLike ?? '--'}°C</Badge>
            <Badge variant="neutral">☀️ UV: {data.uvIndex ?? '--'}</Badge>
          </div>
        </Card.Description>
      </Card.Body>
    </Card>
  )
}
