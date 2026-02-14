import { useEffect, useState } from "react";
import api from "../../services/api";
import { type FalecidoInterface } from "../../types/falecidos";
import { Link } from "react-router-dom";
import { CirclePlusIcon, Pencil, Trash2 } from "lucide-react";

const ListFalecidos = () => {
  const [falecidos, setFalecidos] = useState<FalecidoInterface[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");

  useEffect(() => {
    api.get("/api/falecidos").then((response) => {
      // console.log(response)
      setFalecidos(response.data);
    });
  }, []);

  const handleDeleteFalecido = async (id: number) => {
    if (!window.confirm("Confirma a exclusão do falecido?")) {
      return;
    }

    const data = { id };

    try {
      await api.delete("/api/falecidos", { data });
      alert(`Falecido excluído com sucesso! Id: ${id}`);
      setFalecidos(falecidos.filter(f => f.id !== id));
    } catch (error) {
      alert("Erro ao excluir o falecido!");
      console.error(error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const falecidosOrdenados = [...falecidos]
    .filter(f => {
      const matchesSearch = f.nome.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = 
        statusFilter === "todos" || 
        (statusFilter === "sim" && f.ativo === true) || 
        (statusFilter === "nao" && f.ativo === false);
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => a.id - b.id);

  return (
    <>
        <div className="flex items-center justify-between px-6 py-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Gerenciamento de Sepultamentos</h1>
            <p className="text-slate-600 text-sm mt-1">Cadastro e controle de falecidos e sepultamentos</p>
          </div>
          <Link
            to="/falecidos/create"
            className="rounded-md bg-lime-600 px-6 py-2 text-sm font-medium text-white transition-all hover:bg-lime-700 flex items-center gap-2 whitespace-nowrap"
          >
            <CirclePlusIcon size={18} />
            <span>Cadastrar</span>
          </Link>
        </div>

        <div className="px-6 py-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-1">Registros de Sepultamentos</h2>
            <p className="text-slate-600 text-xs mb-4">Lista completa de todos os sepultamentos cadastrados</p>
            
            <div className="flex items-center justify-between gap-4 mb-6">
              <input
                type="text"
                placeholder="Buscar por nome"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-md bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 w-64"
              />
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-md bg-white text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-600"
              >
                <option value="todos">Status: Todos</option>
                <option value="sim">Status: Sim</option>
                <option value="nao">Status: Não</option>
              </select>
            </div>
            <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-slate-800 text-white">
                <tr>
                  <th className="border border-slate-300 px-4 py-2 text-left">ID</th>
                  <th className="border border-slate-300 px-4 py-2 text-left">Nome</th>
                  <th className="border border-slate-300 px-4 py-2 text-left">Data Falecimento</th>
                  <th className="border border-slate-300 px-4 py-2 text-left">Data Sepultamento</th>
                  <th className="border border-slate-300 px-4 py-2 text-left">Localização</th>
                  <th className="border border-slate-300 px-4 py-2 text-left">Responsável</th>
                  <th className="border border-slate-300 px-4 py-2 text-center">Ativo</th>
                  <th className="border border-slate-300 px-4 py-2 text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {falecidosOrdenados.map((f) => (
                  <tr key={f.id} className="hover:bg-slate-100 transition-colors">
                    <td className="border border-slate-300 px-4 py-2">{f.id}</td>
                    <td className="border border-slate-300 px-4 py-2 font-medium">{f.nome}</td>
                    <td className="border border-slate-300 px-4 py-2">{formatDate(f.data_falecimento)}</td>
                    <td className="border border-slate-300 px-4 py-2">{formatDate(f.data_sepultamento)}</td>
                    <td className="border border-slate-300 px-4 py-2">{f.localizacao || "-"}</td>
                    <td className="border border-slate-300 px-4 py-2">{f.responsavel || "-"}</td>
                    <td className="border border-slate-300 px-4 py-2 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        f.ativo ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}>
                        {f.ativo ? "Sim" : "Não"}
                      </span>
                    </td>
                    <td className="border border-slate-300 px-4 py-2">
                      <div className="flex items-center justify-center gap-3">
                        <Link 
                          to={`/falecidos/${f.id}`}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          title="Editar"
                        >
                          <Pencil size={18} />
                        </Link>
                        <button
                          onClick={() => handleDeleteFalecido(f.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                          title="Excluir"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {falecidosOrdenados.length === 0 && (
              <div className="text-center py-8 text-slate-500">
                Nenhum falecido cadastrado
              </div>
            )}
            </div>
          </div>
        </div>
    </>
  );
};

export default ListFalecidos;
