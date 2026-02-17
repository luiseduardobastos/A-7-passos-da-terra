import { prisma } from "../repository/client.js";

export class PagamentoController {
  // Registrar pagamento
  static async registrarPagamento(req, res) {
    try {
      const { falecido_id } = req.body;

      if (!falecido_id) {
        return res.status(400).json({ erro: "falecido_id é obrigatório" });
      }

      // Verificar se já existe pagamento para este falecido
      const pagamentoExistente = await prisma.pagamento.findFirst({
        where: { falecido_id: parseInt(falecido_id) },
      });

      if (pagamentoExistente) {
        return res
          .status(400)
          .json({ erro: "Este falecido já possui um registro de pagamento" });
      }

      // Criar novo pagamento
      const pagamento = await prisma.pagamento.create({
        data: {
          falecido_id: parseInt(falecido_id),
          valor: 500,
        },
      });

      res.status(201).json(pagamento);
    } catch (error) {
      console.error("Erro ao registrar pagamento:", error);
      res.status(500).json({ erro: "Erro ao registrar pagamento" });
    }
  }

  // Listar todos os pagamentos
  static async listarPagamentos(req, res) {
    try {
      const pagamentos = await prisma.pagamento.findMany({
        orderBy: {
          data_pagamento: "desc",
        },
      });

      res.status(200).json(pagamentos);
    } catch (error) {
      console.error("Erro ao listar pagamentos:", error);
      res.status(500).json({ erro: "Erro ao listar pagamentos" });
    }
  }

  // Deletar pagamento
  static async deletarPagamento(req, res) {
    try {
      const { id } = req.params;

      const pagamento = await prisma.pagamento.delete({
        where: { id: parseInt(id) },
      });

      res
        .status(200)
        .json({ mensagem: "Pagamento deletado com sucesso", pagamento });
    } catch (error) {
      console.error("Erro ao deletar pagamento:", error);
      res.status(500).json({ erro: "Erro ao deletar pagamento" });
    }
  }
}
