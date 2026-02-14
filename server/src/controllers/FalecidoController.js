import { prisma } from "../repository/client.js";

export default class FalecidoController {
  async getAll(request, response) {
    // Busca todos os falecidos ordenados pelo nome
    const falecidos = await prisma.falecido.findMany({
      orderBy: { nome: "asc" },
    });
    return response.json(falecidos);
  }

  async create(request, response) {
    const {
      nome,
      data_falecimento,
      data_sepultamento,
      localizacao,
      responsavel,
    } = request.body;

    // Validação simples
    if (!nome || !data_falecimento) {
      return response.status(400).json({
        code: 400,
        message: "Nome e Data de Falecimento são obrigatórios.",
      });
    }

    try {
      const falecido = await prisma.falecido.create({
        data: {
          nome,
          data_falecimento: new Date(data_falecimento),
          data_sepultamento: new Date(data_sepultamento),
          localizacao,
          responsavel,
          ativo: true,
        },
      });
      return response.status(201).json(falecido);
    } catch (error) {
      return response
        .status(500)
        .json({ message: "Erro ao criar registro.", error });
    }
  }

  async getById(request, response) {
    try {
      const { id } = request.params;
      const falecido = await prisma.falecido.findFirstOrThrow({
        where: { id: parseInt(id) },
      });
      return response.json(falecido);
    } catch (error) {
      return response.status(404).json({ message: "Registro não encontrado." });
    }
  }

  async getByName(request, response) {
    const { name } = request.params;
    const falecidos = await prisma.falecido.findMany({
      where: {
        nome: { contains: name },
      },
    });

    if (falecidos.length === 0) {
      return response
        .status(404)
        .json({ message: "Nenhum registro encontrado." });
    }
    return response.json(falecidos);
  }

  async update(request, response) {
    const {
      id,
      nome,
      data_falecimento,
      data_sepultamento,
      localizacao,
      responsavel,
      ativo,
    } = request.body;

    try {
      const falecido = await prisma.falecido.update({
        where: { id: parseInt(id) },
        data: {
          nome,
          data_falecimento: data_falecimento
            ? new Date(data_falecimento)
            : undefined,
          data_sepultamento: data_sepultamento
            ? new Date(data_sepultamento)
            : undefined,
          localizacao,
          responsavel,
          ativo,
        },
      });
      return response.json(falecido);
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Erro ao atualizar.", error });
    }
  }

  async delete(request, response) {
    const { id } = request.body;
    try {
      await prisma.falecido.delete({
        where: { id: parseInt(id) },
      });
      return response.json({ message: "Registro deletado com sucesso." });
    } catch (error) {
      return response.status(400).json({ message: "Erro ao deletar." });
    }
  }
}
