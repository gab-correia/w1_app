
import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const HoldingProgress: React.FC = () => {
  // Mock data for holding progress
  const holdingStages = [
    { 
      name: 'Planejamento Estratégico',
      complete: true,
      tasks: [
        { name: 'Definir objetivos', complete: true },
        { name: 'Levantamento patrimonial', complete: true },
        { name: 'Identificação de sócios', complete: true },
        { name: 'Agendamento de consultoria', complete: true },
      ] 
    },
    { 
      name: 'Estruturação Jurídica',
      complete: false,
      current: true,
      tasks: [
        { name: 'Escolha do tipo societário', complete: true },
        { name: 'Definição do regime tributário', complete: true },
        { name: 'Elaboração da minuta do contrato', complete: false },
        { name: 'Análise de implicações fiscais', complete: false },
      ] 
    },
    { 
      name: 'Coleta de Documentação',
      complete: false,
      tasks: [
        { name: 'Documentos dos sócios', complete: false },
        { name: 'Documentos dos bens', complete: false },
      ]
    },
    { 
      name: 'Registro e Formalização',
      complete: false,
      tasks: []
    },
    { 
      name: 'Integralização do Capital',
      complete: false,
      tasks: []
    },
    { 
      name: 'Gestão Contínua',
      complete: false,
      tasks: []
    },
  ];

  // Calculate overall progress
  const totalSteps = holdingStages.length;
  const completedSteps = holdingStages.filter(stage => stage.complete).length;
  const progressPercentage = Math.round((completedSteps / totalSteps) * 100);
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-w1-teal to-w1-teal/90 text-white">
        <CardTitle className="text-xl">Minha Holding</CardTitle>
        <Badge variant="outline" className="text-white border-white/50">Em progresso</Badge>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Progresso total</span>
            <span className="font-medium">{progressPercentage}%</span>
          </div>
          <div className="w1-progress">
            <div className="w1-progress-bar" style={{ width: `${progressPercentage}%` }}></div>
          </div>
        </div>

        <div className="space-y-6 mt-6">
          {holdingStages.map((stage, index) => (
            <div key={index} className={`flex ${stage.current ? 'animate-fade-in' : ''}`}>
              <div className="mr-4 flex flex-col items-center">
                {stage.complete ? (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                ) : stage.current ? (
                  <div className="h-6 w-6 rounded-full border-2 border-w1-mint bg-w1-mint/20 flex items-center justify-center">
                    <span className="text-xs font-medium text-w1-teal">{index + 1}</span>
                  </div>
                ) : (
                  <Circle className="h-6 w-6 text-gray-300" />
                )}
                {index < holdingStages.length - 1 && (
                  <div className="h-full w-0.5 bg-gray-200 my-1" />
                )}
              </div>
              
              <div className={`pb-6 ${stage.current ? 'opacity-100' : 'opacity-70'}`}>
                <h4 className="text-base font-medium mb-1 flex items-center">
                  {stage.name}
                  {stage.current && <Badge className="ml-2 bg-w1-mint text-w1-teal">Atual</Badge>}
                </h4>
                
                {stage.current && stage.tasks && (
                  <div className="mt-3 space-y-2">
                    {stage.tasks.map((task, taskIndex) => (
                      <div key={taskIndex} className="flex items-center gap-2 text-sm">
                        {task.complete ? (
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        ) : (
                          <Circle className="h-4 w-4 text-gray-300 flex-shrink-0" />
                        )}
                        <span className={task.complete ? 'line-through text-gray-400' : ''}>{task.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 flex justify-center">
          <Button className="bg-w1-mint text-w1-teal hover:bg-w1-mint/90">
            Continuar Processo
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HoldingProgress;
