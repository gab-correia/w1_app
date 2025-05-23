import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import HoldingSimulator from "@/components/dashboard/HoldingSimulator";


const Simulador = () => {
  const [simulationResults, setSimulationResults] = useState<{
    taxSavings: number;
    successionEfficiency: number;
  } | null>(null);

  const updateResults = () => {
    // Recupera os resultados atualizados do localStorage
    const results = localStorage.getItem("simulationResults");
    if (results) {
      setSimulationResults(JSON.parse(results));
    }
  };

  useEffect(() => {
    updateResults();
  }, []);

  if (!simulationResults) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">Nenhum resultado encontrado.</p>
      </div>
    );
  }

  return (
    <div className="grid-rows-2">
    
    <div className="mb-6">
    <HoldingSimulator mode="simulador" onUpdateResults={updateResults} />
    </div>

    {/*Cartão de resultados*/}
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-display text-w1-petroleum">
          Resultados da Simulação
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tributação */}
          <div className="p-4 bg-w1-light-gray rounded-lg">
            <h3 className="text-xl font-bold text-w1-petroleum">Otimização Tributária</h3>
            <p className="text-lg mt-1">
              Com base nas suas seleções, projetamos os seguintes benefícios fiscais:
            </p>
            <div className="mt-12 space-y-12">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">Economia Tributária Anual Estimada:</span>
                <span className="text-4xl font-semibold text-emerald-600">
                  R${simulationResults.taxSavings.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg">Projeção para 15 Anos:</span>
                <span className="text-lg font-semibold text-emerald-600">
                  R${(simulationResults.taxSavings * 15).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
          {/* Sucessão */}
          <div className="p-4 bg-w1-light-gray rounded-lg">
            <h3 className="text-xl font-bold text-w1-petroleum">Planejamento Sucessório</h3>
            <p className="text-lg mt-1">
              A estrutura de holding selecionada oferece as seguintes vantagens sucessórias:
            </p>
            <div className="mt-12 space-y-10">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">Classificação de Eficiência Sucessória:</span>
                <span className="text-2xl  font-bold text-w1-aqua">
                  {simulationResults.successionEfficiency}%
                </span>
            </div>
            <div className="mt-2 space-y-3">
            <span className="text-xl font-semibold">Vantagens sucessórias:</span>
              <ul className="mt-4 space-y-2 text-sm list-disc list-inside">
                <li>Processo de herança simplificado</li>
                <li>Redução de tempo e custos de inventário</li>
                <li>Estrutura de governança clara para gerações futuras</li>
                <li>Proteção contra fragmentação de ativos</li>
              </ul>
            </div>
            </div>
          </div>
        </div>
      </CardContent>
     
    </Card>
    </div>
  );
};

export default Simulador;