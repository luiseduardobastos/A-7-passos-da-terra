import { Fragment, useEffect, useState } from 'react'
import api from '../services/api'

function Relatorios() {
  const [totalSepultamentos, setTotalSepultamentos] = useState(0)
  const [sepultamentosMes, setSepultamentosMes] = useState(0)
  const [sepultamentosAno, setSepultamentosAno] = useState(0)
  const [sepultamentosUltimosMeses, setSepultamentosUltimosMeses] = useState<Array<{
    label: string
    count: number
    percentage: number
  }>>([])
  const [ocupacaoQuadras, setOcupacaoQuadras] = useState<{
    [key: string]: { count: number; percentage: number }
  }>({
    'Quadra A': { count: 0, percentage: 0 },
    'Quadra B': { count: 0, percentage: 0 },
    'Quadra C': { count: 0, percentage: 0 },
    'Quadra D': { count: 0, percentage: 0 }
  })

  useEffect(() => {
    api.get('/api/falecidos')
      .then((response) => {
        // Filtrar apenas sepultamentos ativos
        const dadosAtivos = response.data.filter((item: any) => item.ativo === true)
        
        const total = dadosAtivos.length
        setTotalSepultamentos(total)

        // Calcular sepultamentos do mês atual
        const dataAtual = new Date()
        const mesAtual = dataAtual.getMonth()
        const anoAtual = dataAtual.getFullYear()
        
        const sepultamentosMesAtual = dadosAtivos.filter((item: any) => {
          const dataSepultamento = new Date(item.data_sepultamento)
          return dataSepultamento.getMonth() === mesAtual && dataSepultamento.getFullYear() === anoAtual
        }).length
        setSepultamentosMes(sepultamentosMesAtual)

        // Calcular sepultamentos do ano atual
        const sepultamentosAnoAtual = dadosAtivos.filter((item: any) => {
          const dataSepultamento = new Date(item.data_sepultamento)
          return dataSepultamento.getFullYear() === anoAtual
        }).length
        setSepultamentosAno(sepultamentosAnoAtual)

        // Calcular sepultamentos dos últimos 3 meses (cumulativo)
        const nomesMeses = [
          'Janeiro',
          'Fevereiro',
          'Março',
          'Abril',
          'Maio',
          'Junho',
          'Julho',
          'Agosto',
          'Setembro',
          'Outubro',
          'Novembro',
          'Dezembro'
        ]
        const ultimosMeses = Array.from({ length: 3 }, (_, index) => {
          const dataBase = new Date(anoAtual, mesAtual - index, 1)
          const mes = dataBase.getMonth()
          const ano = dataBase.getFullYear()
          
          // Calcular cumulativo: contar todos os sepultamentos até o final deste mês
          const cumulativo = dadosAtivos.filter((item: any) => {
            const dataSepultamento = new Date(item.data_sepultamento)
            const itemDate = new Date(dataSepultamento.getFullYear(), dataSepultamento.getMonth(), 1)
            const refDate = new Date(ano, mes, 1)
            return itemDate <= refDate
          }).length
          
          // Contar apenas do mês atual para exibição
          const count = dadosAtivos.filter((item: any) => {
            const dataSepultamento = new Date(item.data_sepultamento)
            return dataSepultamento.getMonth() === mes && dataSepultamento.getFullYear() === ano
          }).length

          return {
            label: `${nomesMeses[mes]} ${ano}`,
            count,
            percentage: (cumulativo / 400) * 100
          }
        })
        setSepultamentosUltimosMeses(ultimosMeses)

        // Calcular ocupação por quadra
        const quadras = ['Quadra A', 'Quadra B', 'Quadra C', 'Quadra D']
        const ocupacao: any = {}
        quadras.forEach(quadra => {
          const count = dadosAtivos.filter((item: any) => item.localizacao === quadra).length
          const percentage = (count / 100) * 100
          ocupacao[quadra] = { count, percentage }
        })
        setOcupacaoQuadras(ocupacao)
      })
      .catch((error) => {
        console.error('Erro ao buscar falecidos:', error)
      })
  }, [])



  return (
    <Fragment>
      <div className="px-6 py-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Relatórios</h1>
          <p className="text-slate-600 text-sm mt-1">Análise detalhada e estatística do cemitério</p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Card Total de Sepultamentos */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <h3 className="text-slate-600 text-sm font-medium mb-2">Total de Sepultamentos</h3>
            <p className="text-3xl font-bold text-slate-900">{totalSepultamentos}</p>
          </div>

          {/* Card Sepultamentos Este Mês */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <h3 className="text-slate-600 text-sm font-medium mb-2">Sepultamentos Este Mês</h3>
            <p className="text-3xl font-bold text-slate-900">{sepultamentosMes}</p>
          </div>

          {/* Card Sepultamentos Este Ano */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
            <h3 className="text-slate-600 text-sm font-medium mb-2">Sepultamentos Este Ano</h3>
            <p className="text-3xl font-bold text-slate-900">{sepultamentosAno}</p>
          </div>
        </div>

        {/* Grid com 2 cards lado a lado */}
        <div className="mt-8 grid grid-cols-2 gap-6">
          {/* Card Ocupação por Quadra */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-amber-700 flex flex-col">
            <h3 className="text-lg font-semibold text-slate-900">Ocupação por Quadra</h3>
            <p className="text-slate-600 text-sm mb-4">Distribuição de vagas ocupadas e disponíveis</p>
            <div className="space-y-6 flex-1">
              {Object.entries(ocupacaoQuadras).map(([quadra, dados]) => (
                <div key={quadra}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-900 font-medium">{quadra}</span>
                    <span className="text-slate-600 text-sm">
                      {dados.count}/100 ({dados.percentage.toFixed(0)}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div 
                      className="bg-blue-600 h-3 rounded-full transition-all duration-300" 
                      style={{ width: `${dados.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card Sepultamentos por Mês */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-600 flex flex-col">
            <h3 className="text-lg font-semibold text-slate-900">Sepultamentos por Mês</h3>
            <p className="text-slate-600 text-sm mb-4">Últimos 3 meses</p>
            <div className="flex flex-col gap-3 flex-1">
              {sepultamentosUltimosMeses.map((item) => (
                <div key={item.label} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center justify-between">
                    <p className="text-slate-900 font-medium">{item.label}</p>
                    <p className="text-slate-600 text-sm">
                      {item.percentage.toFixed(2)}% ocupação
                    </p>
                  </div>
                  <p className="text-slate-700 text-sm mt-1">{item.count} sepultamentos</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Relatorios
