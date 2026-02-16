import React from 'react'
import ReactDOM from 'react-dom/client'
import '@openai/apps-sdk-ui/css'
import '@ainativekit/ui/styles'
import { useWidgetProps } from '@ainativekit/ui'
import { WeatherWidget } from '@/components/weather-widget'
import { ProductsWidget } from '@/components/products-widget'
import { demoData } from './demo-data'

// Get widget type from global variable (set by MCP resource HTML) or URL query param
const getWidgetType = (): string => {
  // Check for global variable set by MCP resource HTML first
  if ((window as any).__WIDGET_TYPE__) {
    return (window as any).__WIDGET_TYPE__
  }
  // Fallback to URL query param for local development
  const params = new URLSearchParams(window.location.search)
  return params.get('type') || 'weather'
}

const App: React.FC = () => {
  const widgetType = getWidgetType()
  const toolOutput = useWidgetProps<Record<string, any>>()
  const hasToolOutput = Object.keys(toolOutput).length > 0

  switch (widgetType) {
    case 'products': {
      // Handle both single product and product list
      const products = hasToolOutput
        ? (toolOutput.products || (toolOutput.id ? [toolOutput] : demoData.products))
        : demoData.products
      return <ProductsWidget products={products} />
    }
    case 'weather':
    default: {
      const data = hasToolOutput ? toolOutput : demoData.weather
      return <WeatherWidget data={data as any} />
    }
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
