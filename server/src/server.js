import express from "express";
import cors from "cors";

// Routes - import
import { mainRouter } from "./routes/main.js";
import { falecidoRouter } from "./routes/falecido.js";
import { authRouter } from "./routes/auth.js";

// Configurações (.env)
const PORT = 5000;

// Server
const server = express();

// Configuration
server.use(express.json());
server.use(cors());

// Add Routes to server
server.use(mainRouter);
server.use(falecidoRouter);
server.use(authRouter);

// Start - listen
server.listen(PORT, () => {
  console.log(`[SERVER] Server is running on port ${PORT}.`);
});
