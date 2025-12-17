// Vercel serverless MCP endpoint
// Stateless mode - creates new server per request

import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createMcpServer } from "../src/server.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Create a new server and transport for each request (stateless)
  const server = createMcpServer();
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined, // Stateless mode
  });

  await server.connect(transport);
  await transport.handleRequest(req, res);
}
