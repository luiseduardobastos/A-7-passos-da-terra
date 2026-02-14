import { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Info } from 'lucide-react'
import api from './services/api'

function App() {
  const [totalSepultamentos, setTotalSepultamentos] = useState(0)
  const [vagasDisponiveis, setVagasDisponiveis] = useState(400)
  const [taxaOcupacao, setTaxaOcupacao] = useState(0)
  const [ultimosSepultamentos, setUltimosSepultamentos] = useState<any[]>([])
  const [ocupacaoQuadras, setOcupacaoQuadras] = useState({
    'Quadra A': 0,
    'Quadra B': 0,
    'Quadra C': 0,
    'Quadra D': 0
  })

  useEffect(() => {
    api.get('/api/falecidos')
      .then((response) => {
        // Filtrar apenas sepultamentos ativos
        const dadosAtivos = response.data.filter((item: any) => item.ativo === true)
        
        const total = dadosAtivos.length
        setTotalSepultamentos(total)
        setVagasDisponiveis(400 - total)
        setTaxaOcupacao(parseFloat(((total / 400) * 100).toFixed(2)))

        // Ordenar pela data de sepultamento (mais recentes primeiro)
        const ordenados = dadosAtivos
          .sort((a: any, b: any) => new Date(b.data_sepultamento).getTime() - new Date(a.data_sepultamento).getTime())
          .slice(0, 3)
        setUltimosSepultamentos(ordenados)

        // Calcular ocupação por quadra
        const quadras = ['Quadra A', 'Quadra B', 'Quadra C', 'Quadra D']
        const ocupacao: any = {}
        quadras.forEach(quadra => {
          const count = dadosAtivos.filter((item: any) => item.localizacao === quadra).length
          ocupacao[quadra] = parseFloat(((count / 100) * 100).toFixed(2))
        })
        setOcupacaoQuadras(ocupacao)
      })
      .catch((error) => {
        console.error('Erro ao buscar falecidos:', error)
      })
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  return (
    <Fragment>
      <div className="px-6 py-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 text-sm mt-1">Bem-vindo ao sistema de gerenciamento de cemitérios</p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Card Total de Sepultamentos */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <h3 className="text-slate-600 text-sm font-medium mb-2">Total de Sepultamentos</h3>
            <p className="text-3xl font-bold text-slate-900">{totalSepultamentos}</p>
          </div>

          {/* Card Vagas Disponíveis */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <h3 className="text-slate-600 text-sm font-medium mb-2">Vagas Disponíveis</h3>
            <p className="text-3xl font-bold text-slate-900">{vagasDisponiveis}</p>
          </div>

          {/* Card Taxa de Ocupação */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
            <h3 className="text-slate-600 text-sm font-medium mb-2">Taxa de Ocupação</h3>
            <p className="text-3xl font-bold text-slate-900">{taxaOcupacao}%</p>
          </div>
        </div>

        {/* Grid com 2 cards lado a lado */}
        <div className="mt-8 grid grid-cols-2 gap-6">
          {/* Card Últimos Sepultamentos */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-amber-700 flex flex-col">
            <h3 className="text-lg font-semibold text-slate-900">Sepultamentos Recentes</h3>
            <p className="text-slate-600 text-sm mb-4">Últimas movimentações no sistema</p>
          <div className="space-y-3 flex-1">
            {ultimosSepultamentos.length > 0 ? (
              ultimosSepultamentos.map((sepultamento) => (
                <Link key={sepultamento.id} to={`/falecidos/${sepultamento.id}`} className="block">
                  <div className="flex justify-between items-center py-4 border-b border-slate-200 last:border-b-0 hover:bg-slate-50 rounded px-2 transition-colors">
                    <div className="flex items-center gap-3 flex-1">
                      <Calendar className="text-blue-500 shrink-0" size={32} />
                      <div>
                        <p className="text-slate-900 font-medium">{sepultamento.nome}</p>
                        <p className="text-slate-600 text-sm">Sepultamento registrado</p>
                        <p className="text-slate-600 text-sm">{sepultamento.localizacao || 'Localização não informada'}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-right shrink-0 ml-4">
                      <p className="text-slate-900 font-medium">{formatDate(sepultamento.data_sepultamento)}</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-slate-600 text-center py-4">Nenhum sepultamento registrado</p>
            )}
          </div>
          <div className="mt-6 flex justify-center">
            <Link
              to="/falecidos"
              className="rounded-md bg-amber-700 px-6 py-2 text-sm font-medium text-white transition-all hover:bg-amber-800"
            >
              Ver todos os sepultamentos
            </Link>
          </div>
          </div>

          {/* Card Notificações */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-600 flex flex-col">
            <h3 className="text-lg font-semibold text-slate-900">Notificações</h3>
            <p className="text-slate-600 text-sm mb-4">Alertas e lembretes importantes</p>
            <div className="flex flex-col gap-3 flex-1">
              {Object.entries(ocupacaoQuadras).map(([quadra, ocupacao]) => (
                <div key={quadra} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 flex-1">
                  <Info className="text-blue-500 shrink-0" size={20} />
                  <p className="text-slate-700 text-sm">
                    <span className="font-medium">{quadra}</span> atingiu {ocupacao}% de ocupação
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-center">
              <Link
                to="/relatorios"
                className="rounded-md bg-purple-600 px-6 py-2 text-sm font-medium text-white transition-all hover:bg-purple-700"
              >
                Ver relatórios de ocupação
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default App
