
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, CheckCircle, Circle, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Meta {
  id: number;
  titulo: string;
  descricao: string;
  progresso: number;
  dataLimite: string;
  status: 'pendente' | 'em_andamento' | 'concluida';
}

const MetasPage = () => {
  const metas: Meta[] = [
    {
      id: 1,
      titulo: "Constituir Holding Familiar",
      descricao: "Finalizar a constituição da holding para proteção patrimonial",
      progresso: 75,
      dataLimite: "31/12/2023",
      status: 'em_andamento'
    },
    {
      id: 2,
      titulo: "Diversificar Investimentos",
      descricao: "Alocar capital em diferentes classes de ativos",
      progresso: 40,
      dataLimite: "30/06/2024",
      status: 'em_andamento'
    },
    {
      id: 3,
      titulo: "Elaborar Testamento",
      descricao: "Finalizar testamento e registrar em cartório",
      progresso: 0,
      dataLimite: "31/03/2024",
      status: 'pendente'
    },
    {
      id: 4,
      titulo: "Atualizar Plano de Aposentadoria",
      descricao: "Revisar e ajustar plano de aposentadoria",
      progresso: 100,
      dataLimite: "15/11/2023",
      status: 'concluida'
    }
  ];

  const getStatusIcon = (status: Meta['status']) => {
    switch (status) {
      case 'pendente':
        return <Circle className="h-5 w-5 text-gray-400" />;
      case 'em_andamento':
        return <Clock className="h-5 w-5 text-amber-500" />;
      case 'concluida':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };
  
  const getStatusText = (status: Meta['status']) => {
    switch (status) {
      case 'pendente':
        return "Pendente";
      case 'em_andamento':
        return "Em andamento";
      case 'concluida':
        return "Concluída";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-w1-teal">Metas e Objetivos</h1>
        <Button size="sm" className="bg-w1-mint text-w1-teal hover:bg-w1-mint/80">
          <PlusCircle className="mr-1 h-4 w-4" />
          Nova Meta
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Visão Geral</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold">4</p>
              <p className="text-sm text-muted-foreground">Total de Metas</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-amber-500">2</p>
              <p className="text-sm text-muted-foreground">Em Andamento</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-500">1</p>
              <p className="text-sm text-muted-foreground">Concluídas</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {metas.map((meta) => (
          <Card key={meta.id} className={meta.status === 'concluida' ? 'bg-muted/50' : ''}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                {getStatusIcon(meta.status)}
                <div className="flex-1">
                  <h3 className="font-medium">{meta.titulo}</h3>
                  <p className="text-sm text-muted-foreground">{meta.descricao}</p>
                </div>
                <Button variant="outline" size="sm">
                  Detalhes
                </Button>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Progresso: {meta.progresso}%</span>
                  <span className="text-muted-foreground">
                    {getStatusText(meta.status)}
                  </span>
                </div>
                <Progress value={meta.progresso} />
                <p className="text-xs text-muted-foreground text-right">
                  Data limite: {meta.dataLimite}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MetasPage;
