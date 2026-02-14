import { Fragment, useEffect, useState } from 'react'
import api from '../services/api'

function Mapa() {
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
          <h1 className="text-2xl font-bold text-slate-900">Mapa do Cemitério</h1>
          <p className="text-slate-600 text-sm mt-1">Visualização e gerenciamento de quadras, setores e vagas</p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {Object.entries(ocupacaoQuadras).map(([quadra, dados]) => {
            const getBorderColor = (quadraName: string) => {
              switch(quadraName) {
                case 'Quadra A': return 'border-blue-500'
                case 'Quadra B': return 'border-green-500'
                case 'Quadra C': return 'border-orange-500'
                case 'Quadra D': return 'border-purple-600'
                default: return 'border-slate-300'
              }
            }
            
            return (
            <div key={quadra} className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${getBorderColor(quadra)} flex flex-col`}>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-slate-900">{quadra}</h3>
                <p className="text-slate-600 text-sm mt-1">
                  {dados.count} de 100 vagas ocupadas
                </p>
              </div>

              <div className="space-y-3 flex-1">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-900 font-medium">Ocupação</span>
                    <span className="text-slate-600 text-sm font-semibold">
                      {dados.percentage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-4">
                    <div 
                      className="bg-amber-700 h-4 rounded-full transition-all duration-300" 
                      style={{ width: `${dados.percentage}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-900 font-medium">Vagas Disponíveis</span>
                    <span className="text-slate-600 text-sm font-semibold">
                      {(100 - dados.count)} vagas
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-4">
                    <div 
                      className="bg-green-500 h-4 rounded-full transition-all duration-300" 
                      style={{ width: `${100 - dados.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-500">
                  Atualizado em tempo real
                </p>
              </div>
            </div>
            )
          })}
        </div>
      </div>
    </Fragment>
  )
}

export default Mapa
