
import React from 'react';
import { ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PatrimonyOverview: React.FC = () => {
  // Mock data - in a real app, this would come from an API
  const patrimonyData = {
    total: 1000000,
    increase: 5.7,
    income: 15000,
    expenses: 7500,
    distribution: [
      { category: 'Renda Fixa', percentage: 45, color: '#0D2D3B' },
      { category: 'Renda Variável', percentage: 25, color: '#3AC7B1' },
      { category: 'Imóveis', percentage: 20, color: '#A8E7DB' },
      { category: 'Outros', percentage: 10, color: '#DADADA' },
    ]
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <CardHeader className="bg-w1-teal text-white">
          <CardTitle className="text-xl">Patrimônio Total</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-3xl font-bold">{formatCurrency(patrimonyData.total)}</h3>
              <div className="flex items-center gap-2 mt-1 text-sm">
                <span className="flex items-center text-green-600 font-medium">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  {patrimonyData.increase}%
                </span>
                <span className="text-w1-gray-darker">último mês</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 md:w-2/3">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <span className="text-sm text-gray-500">Entradas</span>
                  <ArrowUpRight className="h-4 w-4 text-green-600" />
                </div>
                <p className="text-lg font-semibold mt-1">{formatCurrency(patrimonyData.income)}</p>
                <p className="text-xs text-gray-500">neste mês</p>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <span className="text-sm text-gray-500">Saídas</span>
                  <ArrowDownRight className="h-4 w-4 text-red-600" />
                </div>
                <p className="text-lg font-semibold mt-1">{formatCurrency(patrimonyData.expenses)}</p>
                <p className="text-xs text-gray-500">neste mês</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-500 mb-3">Distribuição de Ativos</h4>
            <div className="h-4 w-full flex rounded-full overflow-hidden">
              {patrimonyData.distribution.map((item, index) => (
                <div 
                  key={index}
                  className="h-full transition-all duration-500"
                  style={{ 
                    width: `${item.percentage}%`, 
                    backgroundColor: item.color 
                  }}
                ></div>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-3">
              {patrimonyData.distribution.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-gray-600">{item.category} ({item.percentage}%)</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatrimonyOverview;
