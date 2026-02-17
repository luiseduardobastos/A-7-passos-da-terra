import { Router } from "express";
import { PagamentoController } from "../controllers/PagamentoController.js";

export const pagamentoRouter = Router();

// Registrar novo pagamento
pagamentoRouter.post("/api/pagamentos", PagamentoController.registrarPagamento);

// Listar todos os pagamentos
pagamentoRouter.get("/api/pagamentos", PagamentoController.listarPagamentos);

// Deletar pagamento
pagamentoRouter.delete(
  "/api/pagamentos/:id",
  PagamentoController.deletarPagamento,
);
