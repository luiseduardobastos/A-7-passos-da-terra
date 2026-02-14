import bcrypt from "bcryptjs";
import { prisma } from "../repository/client.js";

export default class AuthController {
  async register(request, response) {
    const { nome, cidade, email, senha } = request.body;

    if (!nome || !cidade || !email || !senha) {
      return response.status(400).json({
        message: "Nome, cidade, email e senha sao obrigatorios.",
      });
    }

    const existing = await prisma.administrador.findUnique({
      where: { email },
    });

    if (existing) {
      return response.status(409).json({
        message: "Email ja cadastrado.",
      });
    }

    const senha_hash = await bcrypt.hash(senha, 10);

    const administrador = await prisma.administrador.create({
      data: {
        nome,
        cidade,
        email,
        senha_hash,
      },
    });

    return response.status(201).json({
      id: administrador.id,
      nome: administrador.nome,
      cidade: administrador.cidade,
      email: administrador.email,
    });
  }

  async login(request, response) {
    const { email, senha } = request.body;

    if (!email || !senha) {
      return response.status(400).json({
        message: "Email e senha sao obrigatorios.",
      });
    }

    const administrador = await prisma.administrador.findUnique({
      where: { email },
    });

    if (!administrador) {
      return response.status(401).json({
        message: "Credenciais invalidas.",
      });
    }

    const senhaOk = await bcrypt.compare(senha, administrador.senha_hash);

    if (!senhaOk) {
      return response.status(401).json({
        message: "Credenciais invalidas.",
      });
    }

    return response.json({
      id: administrador.id,
      nome: administrador.nome,
      cidade: administrador.cidade,
      email: administrador.email,
    });
  }

  async updatePassword(request, response) {
    const { email, senhaAtual, novaSenha } = request.body;

    if (!email || !senhaAtual || !novaSenha) {
      return response.status(400).json({
        message: "Email, senha atual e nova senha sao obrigatorios.",
      });
    }

    const administrador = await prisma.administrador.findUnique({
      where: { email },
    });

    if (!administrador) {
      return response.status(404).json({
        message: "Administrador nao encontrado.",
      });
    }

    const senhaOk = await bcrypt.compare(senhaAtual, administrador.senha_hash);

    if (!senhaOk) {
      return response.status(401).json({
        message: "Senha atual invalida.",
      });
    }

    const senha_hash = await bcrypt.hash(novaSenha, 10);

    await prisma.administrador.update({
      where: { email },
      data: { senha_hash },
    });

    return response.json({
      message: "Senha atualizada com sucesso.",
    });
  }

  async updateProfile(request, response) {
    const { emailAtual, nome, cidade, email } = request.body;

    if (!emailAtual || !nome || !cidade || !email) {
      return response.status(400).json({
        message: "Nome, cidade, email e email atual sao obrigatorios.",
      });
    }

    const administrador = await prisma.administrador.findUnique({
      where: { email: emailAtual },
    });

    if (!administrador) {
      return response.status(404).json({
        message: "Administrador nao encontrado.",
      });
    }

    const emailEmUso = await prisma.administrador.findUnique({
      where: { email },
    });

    if (emailEmUso && emailEmUso.id !== administrador.id) {
      return response.status(409).json({
        message: "Email ja cadastrado.",
      });
    }

    const atualizado = await prisma.administrador.update({
      where: { email: emailAtual },
      data: { nome, cidade, email },
    });

    return response.json({
      id: atualizado.id,
      nome: atualizado.nome,
      cidade: atualizado.cidade,
      email: atualizado.email,
    });
  }
}
