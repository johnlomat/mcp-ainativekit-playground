// Shared MCP server factory
// Used by both local dev server and serverless

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  registerAppResource,
  registerAppTool,
  RESOURCE_MIME_TYPE,
} from "@modelcontextprotocol/ext-apps/server";
import { z } from "zod";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { fetchWeather } from "@/tools/weather";
import { fetchProducts, fetchProductById } from "@/tools/woocommerce";
import { formatProductText } from "@/lib/utils";

// Base URL for widget assets (set via environment or default)
const WIDGET_BASE_URL = process.env.WIDGET_BASE_URL || "https://mcp.johnquery.com";
const WOOCOMMERCE_URL = process.env.WOOCOMMERCE_URL || "";

// CSP resource domains (product images)
const resourceDomains = [WIDGET_BASE_URL];
if (WOOCOMMERCE_URL) resourceDomains.push(WOOCOMMERCE_URL);

// Shared widget UI metadata for resource registration and content items
const widgetUiMeta = {
  domain: WIDGET_BASE_URL,
  prefersBorder: true,
  csp: {
    resourceDomains,
  },
};

// Read built widget assets at startup for inline embedding
const __dirname = dirname(fileURLToPath(import.meta.url));
const WIDGET_CSS = readFileSync(resolve(__dirname, "widget/assets/index.css"), "utf8");
const WIDGET_JS = readFileSync(resolve(__dirname, "widget/assets/index.js"), "utf8");

// Generate widget HTML with inlined CSS and JS (required by ChatGPT CSP)
function getWidgetHtml(widgetType: string): string {
  return `<div id="root"></div>
<style>${WIDGET_CSS}</style>
<script>window.__WIDGET_TYPE__ = "${widgetType}";</script>
<script type="module">${WIDGET_JS}</script>`;
}

export function createMcpServer(): McpServer {
  const server = new McpServer({
    name: "mcp-ainativekit-playground",
    version: "1.0.0",
  });

  // Register weather widget resource for ChatGPT Apps
  registerAppResource(
    server,
    "weather-widget",
    "ui://widget/weather.html",
    {},
    async () => ({
      contents: [
        {
          uri: "ui://widget/weather.html",
          mimeType: RESOURCE_MIME_TYPE,
          text: getWidgetHtml("weather"),
          _meta: { ui: widgetUiMeta },
        },
      ],
    })
  );

  // Register products widget resource for ChatGPT Apps
  registerAppResource(
    server,
    "products-widget",
    "ui://widget/products.html",
    {},
    async () => ({
      contents: [
        {
          uri: "ui://widget/products.html",
          mimeType: RESOURCE_MIME_TYPE,
          text: getWidgetHtml("products"),
          _meta: { ui: widgetUiMeta },
        },
      ],
    })
  );

  // Register weather tool
  registerAppTool(
    server,
    "get-weather",
    {
      title: "Get Weather",
      description: "Get current weather information for a city",
      inputSchema: {
        city: z.string().describe("City name to get weather for (e.g., 'London', 'New York', 'Tokyo')"),
      },
      annotations: {
        readOnlyHint: true,
        openWorldHint: true,
        destructiveHint: false,
      },
      _meta: {
        ui: { resourceUri: "ui://widget/weather.html" },
      },
    },
    async ({ city }) => {
      try {
        const weather = await fetchWeather(city);
        return {
          structuredContent: { ...weather } as Record<string, unknown>,
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

  // Register get-products tool
  registerAppTool(
    server,
    "get-products",
    {
      title: "Get Products",
      description: "Get a list of products from the WooCommerce store",
      inputSchema: {
        search: z.string().optional().describe("Search term to filter products"),
        category: z.string().optional().describe("Category slug to filter products"),
        perPage: z.number().optional().describe("Number of products to return (default: 10)"),
      },
      annotations: {
        readOnlyHint: true,
        openWorldHint: true,
        destructiveHint: false,
      },
      _meta: {
        ui: { resourceUri: "ui://widget/products.html" },
      },
    },
    async ({ search, category, perPage }) => {
      try {
        const products = await fetchProducts({ search, category, perPage });
        const productList = products.map(formatProductText).join("\n\n");
        return {
          structuredContent: { products } as Record<string, unknown>,
          content: [
            {
              type: "text" as const,
              text: `Found ${products.length} products:\n\n${productList}`,
            },
          ],
          _meta: { products } as Record<string, unknown>,
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to fetch products";
        return {
          structuredContent: { error: errorMessage },
          content: [{ type: "text" as const, text: errorMessage }],
          _meta: { error: errorMessage } as Record<string, unknown>,
        };
      }
    }
  );

  // Register get-product-by-id tool
  registerAppTool(
    server,
    "get-product-by-id",
    {
      title: "Get Product by ID",
      description: "Get detailed information about a specific product by its ID",
      inputSchema: {
        id: z.number().describe("The product ID to fetch"),
      },
      annotations: {
        readOnlyHint: true,
        openWorldHint: false,
        destructiveHint: false,
      },
      _meta: {
        ui: { resourceUri: "ui://widget/products.html" },
      },
    },
    async ({ id }) => {
      try {
        const product = await fetchProductById(id);
        return {
          structuredContent: { ...product } as Record<string, unknown>,
          content: [
            {
              type: "text" as const,
              text: `Product Details:\n\n${formatProductText(product)}`,
            },
          ],
          _meta: { ...product } as Record<string, unknown>,
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to fetch product";
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
