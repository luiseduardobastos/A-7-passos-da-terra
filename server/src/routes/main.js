import { Router } from "express";

const mainRouter = Router();

mainRouter.get("/", (request, response) => {
  response.send("<h1>Sistema de Gestão de Cemitérios</h1>");
});

mainRouter.get("/status", (request, response) => {
  response.json({
    code: 200,
    message: "API do Cemitério está rodando perfeitamente.",
  });
});

export { mainRouter };
