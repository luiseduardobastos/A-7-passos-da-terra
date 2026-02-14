import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../components/logo.png";
import api from "../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await api.post("/api/auth/login", { email, senha });
      localStorage.setItem("authToken", "logged");
      localStorage.setItem("authUser", JSON.stringify(response.data));
      navigate("/dashboard");
    } catch (error) {
      alert("Email ou senha invalidos.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-slate-200 p-8">
        <div className="flex flex-col items-center text-center mb-8">
          <img
            src={logo}
            alt="Logo A 7 Palmos da Terra"
            className="h-16 w-16 rounded-xl object-cover mb-4"
          />
          <h1 className="text-2xl font-bold text-slate-900">A 7 Palmos da Terra</h1>
          <p className="text-slate-600 text-sm mt-1">Sistema de Gerenciamento de Cemitérios</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Seu email"
              value={email}
              required
              className="mt-2 flex h-9 w-full rounded-md border border-slate-300 bg-white px-3 text-sm ring-offset-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 transition-all"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div>
            <label htmlFor="senha" className="text-sm font-medium text-slate-700">
              Senha
            </label>
            <input
              id="senha"
              name="senha"
              type="password"
              placeholder="Sua senha"
              value={senha}
              required
              className="mt-2 flex h-9 w-full rounded-md border border-slate-300 bg-white px-3 text-sm ring-offset-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 transition-all"
              onChange={(event) => setSenha(event.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-slate-800"
          >
            Entrar
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600">
          <span>Primeira vez aqui? </span>
          <Link to="/cadastrar" className="font-medium text-slate-900 hover:underline">
            Cadastrar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
