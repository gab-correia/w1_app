
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface Holding {
  id: number;
  nome: string;
  tipo: string;
  status: 'ativa' | 'em_andamento' | 'pendente';
  socios: number;
  ativos: number;
  valorTotal: number;
}

const HoldingsPage = () => {
  const [holdings] = useState<Holding[]>([
    {
      id: 1,
      nome: "Família Silva Holdings",
      tipo: "Limitada",
      status: 'ativa',
      socios: 4,
      ativos: 12,
      valorTotal: 7500000,
    },
    {
      id: 2,
      nome: "JSP Participações",
      tipo: "S.A.",
      status: 'em_andamento',
      socios: 3,
      ativos: 5,
      valorTotal: 3200000,
    },
  ]);

  const getStatusBadge = (status: Holding['status']) => {
    switch (status) {
      case 'ativa':
        return <Badge className="bg-green-500">Ativa</Badge>;
      case 'em_andamento':
        return <Badge className="bg-amber-500">Em Andamento</Badge>;
      case 'pendente':
        return <Badge className="bg-gray-400">Pendente</Badge>;
      default:
        return null;
    }
  };

  const formatarValor = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(valor);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-w1-teal">Holdings</h1>
        <Link to="/holdings/criar">
          <Button size="sm" className="bg-w1-mint text-w1-teal hover:bg-w1-mint/80">
            <PlusCircle className="mr-1 h-4 w-4" />
            Nova Holding
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {holdings.length > 0 ? (
          holdings.map((holding) => (
            <Link to={`/holdings/${holding.id}`} key={holding.id}>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{holding.nome}</h3>
                      <p className="text-sm text-muted-foreground">{holding.tipo}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    {getStatusBadge(holding.status)}
                    <p className="font-semibold text-w1-teal">
                      {formatarValor(holding.valorTotal)}
                    </p>
                  </div>
                  
                  <div className="flex mt-2 gap-4 text-xs text-muted-foreground">
                    <span>{holding.socios} sócios</span>
                    <span>{holding.ativos} ativos</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Você ainda não possui holdings cadastradas.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HoldingsPage;
