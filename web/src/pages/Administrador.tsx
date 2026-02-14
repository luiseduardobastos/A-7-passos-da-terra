import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const Administrador = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [cidade, setCidade] = useState("");
  const [emailAtual, setEmailAtual] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (!storedUser) return;

    try {
      const parsed = JSON.parse(storedUser);
      if (parsed?.nome) setNome(parsed.nome);
      if (parsed?.cidade) setCidade(parsed.cidade);
      if (parsed?.email) setEmail(parsed.email);
      if (parsed?.email) setEmailAtual(parsed.email);
    } catch (error) {
      console.error("Erro ao ler usuario autenticado", error);
    }
  }, []);

  const handleUpdateAdministrador = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      const response = await api.patch("/api/auth/profile", {
        emailAtual,
        nome,
        cidade,
        email,
      });

      localStorage.setItem("authUser", JSON.stringify(response.data));
      setEmailAtual(response.data.email);

      if (senhaAtual || novaSenha) {
        if (!senhaAtual || !novaSenha) {
          alert("Preencha senha atual e nova senha para alterar a senha.");
          return;
        }

        await api.patch("/api/auth/password", {
          email,
          senhaAtual,
          novaSenha,
        });
        setSenhaAtual("");
        setNovaSenha("");
      }

      alert("Dados atualizados com sucesso!");
    } catch (error) {
      alert("Erro ao atualizar os dados.");
      console.error(error);
    }
  };

  return (
    <>
      <div className="px-6 py-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dados do Administrador do Sistema</h1>
          <p className="text-slate-600 text-sm mt-1">Mantenha seus dados atualizados</p>
        </div>
      </div>

      <form onSubmit={handleUpdateAdministrador} className="container px-6 pb-8">
        <div className="w-full p-2">
          <label
            htmlFor="nome"
            className="text-sm font-medium leading-none text-slate-700"
          >
            Nome *
          </label>
          <input
            type="text"
            name="nome"
            id="nome"
            placeholder="Nome do administrador"
            value={nome}
            required
            className="flex h-8 w-full rounded-md border border-slate-300 bg-white px-2 py-1 text-xs ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 transition-all shadow-sm"
            onChange={(event) => setNome(event.target.value)}
          />
        </div>

        <div className="w-full p-2">
          <label
            htmlFor="cidade"
            className="text-sm font-medium leading-none text-slate-700"
          >
            Cidade *
          </label>
          <input
            type="text"
            name="cidade"
            id="cidade"
            placeholder="Cidade do administrador"
            value={cidade}
            required
            className="flex h-8 w-full rounded-md border border-slate-300 bg-white px-2 py-1 text-xs ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 transition-all shadow-sm"
            onChange={(event) => setCidade(event.target.value)}
          />
        </div>

        <div className="w-full p-2">
          <label
            htmlFor="email"
            className="text-sm font-medium leading-none text-slate-700"
          >
            Email *
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email do administrador"
            value={email}
            required
            className="flex h-8 w-full rounded-md border border-slate-300 bg-white px-2 py-1 text-xs ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 transition-all shadow-sm"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="w-full p-2">
          <label
            htmlFor="senhaAtual"
            className="text-sm font-medium leading-none text-slate-700"
          >
            Senha Atual
          </label>
          <input
            type="password"
            name="senhaAtual"
            id="senhaAtual"
            placeholder="Sua senha atual"
            value={senhaAtual}
            className="flex h-8 w-full rounded-md border border-slate-300 bg-white px-2 py-1 text-xs ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 transition-all shadow-sm"
            onChange={(event) => setSenhaAtual(event.target.value)}
          />
        </div>

        <div className="w-full p-2">
          <label
            htmlFor="novaSenha"
            className="text-sm font-medium leading-none text-slate-700"
          >
            Nova Senha
          </label>
          <input
            type="password"
            name="novaSenha"
            id="novaSenha"
            placeholder="Crie uma nova senha"
            value={novaSenha}
            className="flex h-8 w-full rounded-md border border-slate-300 bg-white px-2 py-1 text-xs ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 transition-all shadow-sm"
            onChange={(event) => setNovaSenha(event.target.value)}
          />
        </div>

        <div className="w-full flex items-center justify-center gap-2 mt-4">
          <button
            type="submit"
            className="rounded-md bg-lime-900 px-5 py-2 text-sm font-medium text-white transition-all hover:bg-blue-800"
          >
            Editar dados
          </button>
          <Link
            to="/dashboard"
            className="rounded-md bg-slate-900 px-5 py-2 text-sm font-medium text-white transition-all hover:bg-red-800"
          >
            Voltar
          </Link>
        </div>
      </form>
    </>
  );
};

export default Administrador;
