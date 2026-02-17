import { useState } from "react";
import api from "../../services/api";
import { useNavigate, Link } from "react-router-dom";

const CreateFalecido = () => {
  // Hook: useState
  const [nome, setNome] = useState("");
  const [dataFalecimento, setDataFalecimento] = useState("");
  const [dataSepultamento, setDataSepultamento] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [responsavel, setResponsavel] = useState("");

  // Hook: react-router-dom
  const navigate = useNavigate();

  // Data máxima permitida (data atual no horário local)
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const maxDate = `${year}-${month}-${day}T${hours}:${minutes}`;

  const handleCreateFalecido = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const data = {
      nome,
      data_falecimento: dataFalecimento,
      data_sepultamento: dataSepultamento,
      localizacao,
      responsavel,
    };

    try {
      const response = await api.post("/api/falecidos", data);
      console.log(response);
      const { id } = response.data;
      alert(`Falecido registrado com sucesso! Id: ${id}`);
      navigate("/falecidos");
    } catch (error) {
      alert("Erro ao registrar o falecido!");
      console.error(error);
    }
  };

  return (
    <>
      <div className="px-6 py-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Cadastrar Novo Sepultamento</h1>
          <p className="text-slate-600 text-sm mt-1">Preencha os dados do falecido e informações do sepultamento</p>
        </div>
      </div>

      <form onSubmit={handleCreateFalecido} className="container px-6 pb-8">
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
            placeholder="Nome do falecido"
            value={nome}
            required
            className="flex h-8 w-full rounded-md border border-slate-300 bg-white px-2 py-1 text-xs ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 transition-all shadow-sm"
            onChange={(event) => setNome(event.target.value)}
          />
        </div>

        <div className="w-full p-2">
          <label
            htmlFor="dataFalecimento"
            className="text-sm font-medium leading-none text-slate-700"
          >
            Data de Falecimento *
          </label>
          <input
            type="datetime-local"
            name="dataFalecimento"
            id="dataFalecimento"
            value={dataFalecimento}
            max={maxDate}
            required
            className="flex h-8 w-full rounded-md border border-slate-300 bg-white px-2 py-1 text-xs ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 transition-all shadow-sm"
            onChange={(event) => setDataFalecimento(event.target.value)}
          />
        </div>

        <div className="w-full p-2">
          <label
            htmlFor="dataSepultamento"
            className="text-sm font-medium leading-none text-slate-700"
          >
            Data de Sepultamento *
          </label>
          <input
            type="datetime-local"
            name="dataSepultamento"
            id="dataSepultamento"
            value={dataSepultamento}
            min={dataFalecimento}
            required
            className="flex h-8 w-full rounded-md border border-slate-300 bg-white px-2 py-1 text-xs ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 transition-all shadow-sm"
            onChange={(event) => setDataSepultamento(event.target.value)}
          />
        </div>

        <div className="w-full p-2">
          <label
            htmlFor="localizacao"
            className="text-sm font-medium leading-none text-slate-700"
          >
            Localização *
          </label>
          <select
            name="localizacao"
            id="localizacao"
            value={localizacao}
            required
            className="flex h-8 w-full rounded-md border border-slate-300 bg-white px-2 py-1 text-xs ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 transition-all shadow-sm"
            onChange={(event) => setLocalizacao(event.target.value)}
          >
            <option value="">Selecione uma quadra</option>
            <option value="Quadra A">Quadra A</option>
            <option value="Quadra B">Quadra B</option>
            <option value="Quadra C">Quadra C</option>
            <option value="Quadra D">Quadra D</option>
          </select>
        </div>

        <div className="w-full p-2">
          <label
            htmlFor="responsavel"
            className="text-sm font-medium leading-none text-slate-700"
          >
            Responsável *
          </label>
          <input
            type="text"
            name="responsavel"
            id="responsavel"
            placeholder="Nome do responsável"
            value={responsavel}
            required
            className="flex h-8 w-full rounded-md border border-slate-300 bg-white px-2 py-1 text-xs ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 transition-all shadow-sm"
            onChange={(event) => setResponsavel(event.target.value)}
          />
        </div>

        <div className="w-full flex items-center justify-center gap-2 mt-4">
          <button
            type="submit"
            className="rounded-md bg-lime-900 px-5 py-2 text-sm font-medium text-white transition-all hover:bg-blue-800"
          >
            Cadastrar
          </button>
          <Link
            to="/falecidos"
            className="rounded-md bg-slate-900 px-5 py-2 text-sm font-medium text-white transition-all hover:bg-red-800"
          >
            Voltar
          </Link>
        </div>
      </form>
    </>
  );
};

export default CreateFalecido;
