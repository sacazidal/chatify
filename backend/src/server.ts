import { server } from "./app";
import { SERVER_CONFIG } from "./config/server.config";

// Start server
const start = async () => {
  try {
    await server.listen({ port: SERVER_CONFIG.PORT, host: SERVER_CONFIG.HOST });
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

start();
