import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyHelmet from "@fastify/helmet";
import { config } from "dotenv";

// Loads .env
config();

// Create server
export const server = fastify({
  logger: true,
});

// Plugins
await server.register(fastifyCors, {
  origin: true,
  methods: ["POST", "GET", "PUT", "DELETE"],
});
await server.register(fastifyHelmet);

// Route
server.get("/", async () => {
  return { message: "Hello from Fastify!" };
});
