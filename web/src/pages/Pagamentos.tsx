import { Fragment, useEffect, useState } from 'react'
import { DollarSign, AlertCircle, HelpCircle } from 'lucide-react'
import api from '../services/api'

interface Sepultamento {
  id: number
  nome: string
  data_sepultamento: string
  localizacao: string
  responsavel: string
  ativo: boolean
}

function Pagamentos() {
  const [sepultamentos, setSepultamentos] = useState<Sepultamento[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('todos')
  const [pagosIds, setPagosIds] = useState<number[]>([])
  const [totalRecebimentos, setTotalRecebimentos] = useState(0)
  const [pagamentosAtraso, setPagamentosAtraso] = useState(0)
  const [pagamentosPendentes, setPagamentosPendentes] = useState(0)

  useEffect(() => {
    // Recuperar pagos do localStorage e sincronizar estado
    const storedPagos = localStorage.getItem('pagamentosPagos')
    if (storedPagos) {
      try {
        const parsed = JSON.parse(storedPagos)
        if (Array.isArray(parsed)) {
          setPagosIds(parsed)
        }
      } catch (error) {
        console.error('Erro ao parsear pagamentos do localStorage:', error)
      }
    }
  }, [])

  useEffect(() => {
    api.get('/api/falecidos')
      .then((response) => {
        const dadosAtivos = response.data.filter((item: any) => item.ativo === true)
        setSepultamentos(dadosAtivos)
      })
      .catch((error) => {
        console.error('Erro ao buscar falecidos:', error)
      })
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  const getStatusFromDate = (dataCreacao: string) => {
    const hoje = new Date()
    const data = new Date(dataCreacao)
    const diasDiferenca = Math.floor((hoje.getTime() - data.getTime()) / (1000 * 60 * 60 * 24))
    
    // Se passou mais de 30 dias, marca como atraso
    if (diasDiferenca > 30) {
      return 'Atraso'
    }
    // Caso contrário, é pendente
    return 'Pendente'
  }

  // Recalcular contagens quando pagosIds muda
  useEffect(() => {
    if (sepultamentos.length === 0) return

    let atrasoCount = 0
    let pendenteCount = 0

    sepultamentos.forEach((sep) => {
      if (!pagosIds.includes(sep.id)) {
        const status = getStatusFromDate(sep.data_sepultamento)
        if (status === 'Atraso') atrasoCount++
        if (status === 'Pendente') pendenteCount++
      }
    })

    setPagamentosAtraso(atrasoCount)
    setPagamentosPendentes(pendenteCount)
  }, [pagosIds, sepultamentos])

  // Recalcular total de recebimentos baseado apenas nos pagos
  useEffect(() => {
    const valorPorSepultamento = 500
    const totalPago = pagosIds.length * valorPorSepultamento
    setTotalRecebimentos(totalPago)
  }, [pagosIds])

  const getActualStatus = (sepultamentoId: number, defaultStatus: string) => {
    if (pagosIds.includes(sepultamentoId)) {
      return 'Pago'
    }
    return defaultStatus
  }

  const handleRegistrarPagamento = (sepultamento: Sepultamento) => {
    const confirmed = window.confirm(`Registrar pagamento para ${sepultamento.nome}?`)
    if (confirmed && !pagosIds.includes(sepultamento.id)) {
      const novosPagos = [...pagosIds, sepultamento.id]
      setPagosIds(novosPagos)
      // Salvar no localStorage
      localStorage.setItem('pagamentosPagos', JSON.stringify(novosPagos))
    }
  }

  const filteredSepultamentos = sepultamentos.filter((sepultamento) => {
    const matchesSearch = sepultamento.nome.toLowerCase().includes(searchQuery.toLowerCase())
    const defaultStatus = getStatusFromDate(sepultamento.data_sepultamento)
    const actualStatus = getActualStatus(sepultamento.id, defaultStatus)
    const matchesStatus = statusFilter === 'todos' || actualStatus.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  return (
    <Fragment>
      <div className="px-6 py-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Gestão de Pagamentos</h1>
          <p className="text-slate-600 text-sm mt-1">Controle de taxas, vencimentos e histórico financeiro</p>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Card Total de Recebimentos */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-slate-600 text-sm font-medium mb-2">Total de Recebimentos</h3>
                <p className="text-3xl font-bold text-slate-900">R$ {totalRecebimentos.toLocaleString('pt-BR')}</p>
              </div>
              <DollarSign size={32} className="text-green-500 opacity-20" />
            </div>
          </div>

          {/* Card Pagamentos em Atraso */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-slate-600 text-sm font-medium mb-2">Pagamentos em Atraso</h3>
                <p className="text-3xl font-bold text-slate-900">{pagamentosAtraso}</p>
              </div>
              <AlertCircle size={32} className="text-red-500 opacity-20" />
            </div>
          </div>

          {/* Card Pagamentos Pendentes */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-slate-600 text-sm font-medium mb-2">Pagamentos Pendentes</h3>
                <p className="text-3xl font-bold text-slate-900">{pagamentosPendentes}</p>
              </div>
              <HelpCircle size={32} className="text-yellow-500 opacity-20" />
            </div>
          </div>
        </div>

        {/* Tabela de Sepultamentos */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-1">Lista de Pagamentos</h2>
          <p className="text-slate-600 text-xs mb-4">Gerencie todas as taxas e cobranças do cemitério</p>
          
          <div className="mb-6 flex items-center justify-between gap-4">
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
              <option value="pago">Status: Pago</option>
              <option value="pendente">Status: Pendente</option>
              <option value="atraso">Status: Atraso</option>
            </select>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-slate-800 text-white">
                <tr>
                  <th className="border border-slate-300 px-4 py-2 text-left">ID</th>
                  <th className="border border-slate-300 px-4 py-2 text-left">Nome</th>
                  <th className="border border-slate-300 px-4 py-2 text-left">Data Sepultamento</th>
                  <th className="border border-slate-300 px-4 py-2 text-left">Localização</th>
                  <th className="border border-slate-300 px-4 py-2 text-left">Responsável</th>
                  <th className="border border-slate-300 px-4 py-2 text-center">Valor</th>
                  <th className="border border-slate-300 px-4 py-2 text-center">Status</th>
                  <th className="border border-slate-300 px-4 py-2 text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredSepultamentos.map((sepultamento) => {
                  const defaultStatus = getStatusFromDate(sepultamento.data_sepultamento)
                  const actualStatus = getActualStatus(sepultamento.id, defaultStatus)
                  
                  const getStatusColor = (statusLabel: string) => {
                    switch(statusLabel) {
                      case 'Pago': return 'bg-green-100 text-green-800'
                      case 'Pendente': return 'bg-yellow-100 text-yellow-800'
                      case 'Atraso': return 'bg-red-100 text-red-800'
                      default: return 'bg-slate-100 text-slate-800'
                    }
                  }

                  const isPago = actualStatus === 'Pago'

                  return (
                    <tr key={sepultamento.id} className="hover:bg-slate-50 transition-colors">
                      <td className="border border-slate-300 px-4 py-2">{sepultamento.id}</td>
                      <td className="border border-slate-300 px-4 py-2 font-medium">{sepultamento.nome}</td>
                      <td className="border border-slate-300 px-4 py-2">{formatDate(sepultamento.data_sepultamento)}</td>
                      <td className="border border-slate-300 px-4 py-2">{sepultamento.localizacao || '-'}</td>
                      <td className="border border-slate-300 px-4 py-2">{sepultamento.responsavel || '-'}</td>
                      <td className="border border-slate-300 px-4 py-2 text-center font-semibold">R$ 500,00</td>
                      <td className="border border-slate-300 px-4 py-2 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(actualStatus)}`}>
                          {actualStatus}
                        </span>
                      </td>
                      <td className="border border-slate-300 px-4 py-2 text-center">
                        <button
                          onClick={() => handleRegistrarPagamento(sepultamento)}
                          disabled={isPago}
                          className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                            isPago 
                              ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                              : 'bg-blue-500 text-white hover:bg-blue-600'
                          }`}
                        >
                          {isPago ? 'Pago' : 'Registrar'}
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {sepultamentos.length === 0 && (
              <div className="text-center py-8 text-slate-500">
                Nenhum sepultamento cadastrado
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Pagamentos
