
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, FileText, Target, Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import HoldingProgress from "@/components/dashboard/HoldingProgress";
import PatrimonyOverview from "@/components/dashboard/PatrimonyOverview";

const Index = () => {
  const patrimonioTotal = 12500000;
  const patrimonioAnterior = 11800000;
  const crescimentoPercentual = ((patrimonioTotal - patrimonioAnterior) / patrimonioAnterior) * 100;
  
  const formatarValor = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(valor);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-w1-teal">Dashboard</h1>

      <div className="space-y-4">
        <Card className="bg-gradient-to-br from-w1-teal to-w1-teal/90 text-white">
          <CardContent className="p-6">
            <h2 className="text-lg font-medium mb-3">Patrimônio Total</h2>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold">{formatarValor(patrimonioTotal)}</p>
              <p className={`text-sm ${crescimentoPercentual >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                {crescimentoPercentual >= 0 ? '+' : ''}{crescimentoPercentual.toFixed(1)}%
              </p>
            </div>
            <p className="text-sm mt-1 text-white/80">vs. mês anterior</p>
            
            <div className="mt-4">
              <Link to="/patrimonio">
                <Button variant="outline" className="text-white border-white hover:bg-white/20 hover:text-white">
                  Ver detalhes
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Holding Progress Component */}
        <HoldingProgress />

        {/* Patrimony Overview Component with distribution chart */}
        <PatrimonyOverview />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Briefcase className="h-5 w-5 text-blue-600" />
                  </div>
                  <h2 className="font-medium">Holdings</h2>
                </div>
                <Link to="/holdings">
                  <Button variant="ghost" size="sm">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              
              <div>
                <div className="flex justify-between items-center text-sm mb-1">
                  <span>Família Silva Holdings</span>
                  <span className="text-green-600">Ativa</span>
                </div>
                <Progress value={100} className="h-2" />
                
                <div className="flex justify-between items-center text-sm mb-1 mt-3">
                  <span>JSP Participações</span>
                  <span className="text-amber-600">75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                  <h2 className="font-medium">Sucessório</h2>
                </div>
                <Link to="/sucessorio">
                  <Button variant="ghost" size="sm">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              
              <div>
                <div className="flex justify-between items-center text-sm mb-1">
                  <span>Planejamento Sucessório</span>
                  <span className="text-amber-600">40%</span>
                </div>
                <Progress value={40} className="h-2" />
                
                <div className="flex justify-between items-center text-sm mb-1 mt-3">
                  <span>Documentação</span>
                  <span className="text-red-600">15%</span>
                </div>
                <Progress value={15} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <Target className="h-5 w-5 text-amber-600" />
                </div>
                <h2 className="font-medium">Metas e Objetivos</h2>
              </div>
              <Link to="/metas">
                <Button variant="ghost" size="sm">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center text-sm mb-1">
                  <span>Constituir Holding Familiar</span>
                  <span>75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center text-sm mb-1">
                  <span>Diversificar Investimentos</span>
                  <span>40%</span>
                </div>
                <Progress value={40} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center text-sm mb-1">
                  <span>Elaborar Testamento</span>
                  <span>0%</span>
                </div>
                <Progress value={0} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-green-600" />
                </div>
                <h2 className="font-medium">Documentos Recentes</h2>
              </div>
              <Link to="/documentos">
                <Button variant="ghost" size="sm">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 hover:bg-muted/50 rounded-md">
                <span>Contrato Social - Família Silva Holdings</span>
                <span className="text-xs text-muted-foreground">12/04/2023</span>
              </div>
              <div className="flex justify-between items-center p-2 hover:bg-muted/50 rounded-md">
                <span>Declaração de Imposto de Renda 2023</span>
                <span className="text-xs text-muted-foreground">30/05/2023</span>
              </div>
              <div className="flex justify-between items-center p-2 hover:bg-muted/50 rounded-md">
                <span>Escritura do Imóvel - Apartamento</span>
                <span className="text-xs text-muted-foreground">15/01/2022</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
