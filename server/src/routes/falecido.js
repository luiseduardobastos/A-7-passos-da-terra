import { Router } from "express";
import FalecidoController from "../controllers/FalecidoController.js";

const falecidoRouter = Router();
const falecidoController = new FalecidoController();

// Endpoints - CRUD Falecidos
falecidoRouter.get("/api/falecidos", falecidoController.getAll);
falecidoRouter.get("/api/falecidos/:id", falecidoController.getById);
falecidoRouter.get("/api/falecidos/nome/:name", falecidoController.getByName);
falecidoRouter.post("/api/falecidos", falecidoController.create);
falecidoRouter.put("/api/falecidos", falecidoController.update);
falecidoRouter.patch("/api/falecidos", falecidoController.update);
falecidoRouter.delete("/api/falecidos", falecidoController.delete);

export { falecidoRouter };
