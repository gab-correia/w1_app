import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, FileText } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import EstagioHolding from "@/components/dashboard/HoldingProgress";
import HoldingSimulator from "@/components/dashboard/HoldingSimulator";

const Home = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [patrimonioTotal, setPatrimonioTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const patrimonioAnterior = 900000; // Valor fixo de exemplo

  useEffect(() => {
    const fetchPatrimonioTotal = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`${API_URL}/api/patrimonios`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) throw new Error('Erro ao buscar patrimônio');
        
        const data = await response.json();
        const totalCalculado = data.reduce((acc: number, ativo: any) => 
          acc + parseFloat(ativo.valor), 0);
        
        setPatrimonioTotal(totalCalculado);

      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatrimonioTotal();
  }, []);

  const crescimentoPercentual = patrimonioAnterior > 0 
    ? ((patrimonioTotal - patrimonioAnterior) / patrimonioAnterior) * 100 
    : 0;

  const formatarValor = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(valor);
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        Carregando dados patrimoniais...
      </div>
    );
  }

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
            
            <div className="mt-4">
              <Link to="/patrimonio">
                <Button className="text-white border-white hover:bg-white/20 hover:text-white">
                  Ver detalhes
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Holding Progress Component */}
        <EstagioHolding />

        <div className="grid grid-cols-2 gap-4">
          <HoldingSimulator mode='home'/>
          
          <div className="grid grid-rows-2 gap-6">
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
      </div>
    </div>
  );
};

export default Home;
