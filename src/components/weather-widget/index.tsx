import React from 'react'
import { Card, Badge } from '@ainativekit/ui'
import { WeatherWidgetProps } from './types'
import { getWeatherEmoji, getWeatherDescription } from './utils'

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ data }) => {
  const emoji = getWeatherEmoji(data.weatherCode || 0)
  const description = getWeatherDescription(data.weatherCode || 0)

  return (
    <Card elevationLevel={1}>
      <Card.Header>
        <Card.BadgeGroup>
          <Card.Badge>{emoji} {description}</Card.Badge>
        </Card.BadgeGroup>
      </Card.Header>
      <Card.Body>
        <Card.Title>{data.location || 'Unknown Location'}</Card.Title>
        <div style={{ fontSize: '48px', fontWeight: 300, textAlign: 'center', margin: '16px 0' }}>
          {data.temperature ?? '--'}°C
        </div>
        <Card.Description>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '12px' }}>
            <Badge variant="soft">💧 Humidity: {data.humidity ?? '--'}%</Badge>
            <Badge variant="soft">💨 Wind: {data.windSpeed ?? '--'} km/h</Badge>
            <Badge variant="soft">🌡️ Feels: {data.feelsLike ?? '--'}°C</Badge>
            <Badge variant="soft">☀️ UV: {data.uvIndex ?? '--'}</Badge>
          </div>
        </Card.Description>
      </Card.Body>
    </Card>
  )
}

export * from './types'
