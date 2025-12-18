// Shared MCP server factory
// Used by both local dev server and serverless

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { fetchWeather } from "./tools/weather";

export function createMcpServer(): McpServer {
  const server = new McpServer({
    name: "weather-server",
    version: "1.0.0",
  });

  // Register weather tool
  server.registerTool(
    "get-weather",
    {
      title: "Get Weather",
      description: "Get current weather information for a city",
      inputSchema: {
        city: z.string().describe("City name to get weather for (e.g., 'London', 'New York', 'Tokyo')"),
      },
      _meta: {
        "openai/outputTemplate": "ui://widget/weather.html",
        "openai/toolInvocation/invoking": "Checking the weather...",
        "openai/toolInvocation/invoked": "Weather data ready!",
      },
    },
    async ({ city }) => {
      try {
        const weather = await fetchWeather(city);
        return {
          structuredContent: { type: "object", properties: weather },
          content: [
            {
              type: "text" as const,
              text: `Current weather in ${weather.location}: ${weather.temperature}°C, humidity ${weather.humidity}%, wind ${weather.windSpeed} km/h`,
            },
          ],
          _meta: { ...weather } as Record<string, unknown>,
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to fetch weather";
        return {
          structuredContent: { error: errorMessage },
          content: [{ type: "text" as const, text: errorMessage }],
          _meta: { error: errorMessage } as Record<string, unknown>,
        };
      }
    }
  );

  return server;
}
