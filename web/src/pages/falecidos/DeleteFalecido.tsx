import { useEffect, useState } from "react";
import AppHeader from "../../components/AppHeader";
import api from "../../services/api";
import { Link, useNavigate, useParams } from "react-router-dom";

const DeleteFalecido = () => {
  // Hook: useState
  const [nome, setNome] = useState("");
  
  // Hook: react-router-dom
  const navigate = useNavigate();

  // Recuperar as informações do falecido:
  // ID do falecido -> recuperar as informações
  const { id } = useParams()

  useEffect(() => {

    api.get(`/api/falecidos/${id}`)
      .then(response => {
        setNome(response.data.nome)
      })
      .catch(error => {
        console.error(error)
        alert('Falecido inválido!')
        navigate('/falecidos')
      })

  }, [id, navigate])

  const handleDeleteFalecido = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    // Validações
    // ...
    if (!window.confirm("Confirma a exclusão do falecido?")) {
      return
    }

    const data = {
      id : parseInt(String(id)),
    };

    try {
      const response = await api.delete("/api/falecidos", {
        data
      });
      console.log(response);
      const { id } = response.data.falecido;
      alert(`Falecido excluído com sucesso! Id: ${id}`);
      navigate("/falecidos");
    } catch (error) {
      alert("Erro ao excluir o falecido!");
      console.error(error);
    }
  };

  return (
    <>
      <AppHeader title="Exclusão de falecido" />

      <form onSubmit={handleDeleteFalecido} className="container">
        <div className="w-full p-4">
          <label
            htmlFor="nome"
            className="text-xl font-medium leading-none text-slate-700"
          >
            Nome
          </label>
          <input
            type="text"
            name="nome"
            id="nome"
            placeholder="Nome do falecido"
            value={nome}
            disabled={true}
            className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 transition-all shadow-sm"
            onChange={(event) => setNome(event.target.value)}
          />
        </div>
        <div className="w-full flex items-center justify-center gap-2 mt-4">
          <button
            type="submit"
            className="rounded-md bg-red-900 px-5 py-2 text-sm font-medium text-white transition-all hover:bg-red-600"
          >
            Excluir
          </button>
          <Link
            to="/falecidos"
            className="rounded-md bg-slate-900 px-5 py-2 text-sm font-medium text-white transition-all hover:bg-blue-800"
          >
            Voltar
          </Link>
        </div>
      </form>
    </>
  );
};

export default DeleteFalecido;
