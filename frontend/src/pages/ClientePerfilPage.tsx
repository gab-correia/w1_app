import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Building2, BarChart3, MessageCircle, CalendarCheck, PieChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Mock client data
interface Cliente {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  ultimaAtividade: string;
  avatar?: string;
  documentos: {
    total: number;
    pendentes: number;
  };
  holdings: Holding[];
  // Novo campo para consolidar patrimônio
  patrimonios?: PatrimonioAtivo[];
}

interface Holding {
  id: number;
  nome: string;
  tipo: string;
  status: 'ativa' | 'em_andamento' | 'pendente';
  socios: number;
  ativos: number;
  valorTotal: number;
}

interface PatrimonioAtivo {
  id: number;
  nome: string;
  tipo: string; // Ex: 'Imóveis', 'Investimentos', 'Veículos', etc.
  valor: number;
}

const mockClientes: Cliente[] = [
  {
    id: 1,
    nome: "João Silva",
    email: "joao.silva@exemplo.com",
    telefone: "(11) 98765-4321",
    ultimaAtividade: "2023-05-16",
    documentos: {
      total: 8,
      pendentes: 2
    },
    holdings: [
      {
        id: 1,
        nome: "Silva Participações",
        tipo: "Limitada",
        status: 'ativa',
        socios: 3,
        ativos: 7,
        valorTotal: 5400000,
      },
      {
        id: 2,
        nome: "JSP Investimentos",
        tipo: "S.A.",
        status: 'em_andamento',
        socios: 2,
        ativos: 4,
        valorTotal: 2100000,
      }
    ],
    patrimonios: [
      { id: 1, nome: "Apartamento Vila Mariana", tipo: "Imóveis", valor: 1200000 },
      { id: 2, nome: "Fundo XPTO", tipo: "Investimentos", valor: 900000 },
      { id: 3, nome: "Fazenda Boa Vista", tipo: "Imóveis", valor: 2500000 },
      { id: 4, nome: "Carro BMW", tipo: "Veículos", valor: 320000 },
      { id: 5, nome: "Conta Corrente Itaú", tipo: "Financeiro", valor: 80000 },
    ]
  },
  {
    id: 2,
    nome: "Maria Oliveira",
    email: "maria.oliveira@exemplo.com",
    telefone: "(21) 98765-4321",
    ultimaAtividade: "2023-05-15",
    documentos: {
      total: 12,
      pendentes: 0
    },
    holdings: [
      {
        id: 3,
        nome: "Oliveira Group",
        tipo: "Limitada",
        status: 'ativa',
        socios: 4,
        ativos: 9,
        valorTotal: 6800000,
      }
    ],
    patrimonios: [
      { id: 1, nome: "Casa Barra", tipo: "Imóveis", valor: 2100000 },
      { id: 2, nome: "Fundo Selic", tipo: "Investimentos", valor: 500000 },
      { id: 3, nome: "Carro Honda", tipo: "Veículos", valor: 90000 },
      { id: 4, nome: "Conta Corrente Bradesco", tipo: "Financeiro", valor: 35000 },
    ]
  },
  {
    id: 3,
    nome: "Carlos Santos",
    email: "carlos.santos@exemplo.com",
    telefone: "(31) 98765-4321",
    ultimaAtividade: "2023-05-10",
    documentos: {
      total: 5,
      pendentes: 3
    },
    holdings: [],
    patrimonios: []
  },
];

// Cores para os tipos de patrimônio
const CORES_PATRIMONIO: Record<string, string> = {
  "Imóveis": "#3B82F6",
  "Investimentos": "#10B981",
  "Veículos": "#F59E0B",
  "Financeiro": "#8B5CF6",
  "Outros": "#EC4899"
};

// Utilitário para agrupar e somar valores por tipo
const consolidarPorTipo = (ativos: PatrimonioAtivo[] = []) => {
  const mapa: Record<string, number> = {};
  ativos.forEach(a => {
    mapa[a.tipo] = (mapa[a.tipo] || 0) + a.valor;
  });
  return Object.entries(mapa).map(([tipo, valor]) => ({
    tipo,
    valor
  }));
};

const ClientePerfilPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [activeTab, setActiveTab] = useState("perfil");

  // Format date to Brazilian format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  // Format currency to Brazilian format
  const formatarValor = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(valor);
  };

  // Get status badge
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

  // Load client data
  useEffect(() => {
    if (!id) {
      navigate('/clientes');
      return;
    }
    const clienteData = mockClientes.find(c => c.id === parseInt(id));
    if (clienteData) {
      setCliente(clienteData);
    } else {
      navigate('/clientes');
    }
  }, [id, navigate]);

  if (!cliente) {
    return <div className="flex justify-center items-center h-96">Carregando...</div>;
  }

  // Dados consolidados do patrimônio
  const ativos = cliente.patrimonios || [];
  const patrimonioTotal = ativos.reduce((acc, a) => acc + a.valor, 0);
  const porTipo = consolidarPorTipo(ativos);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          onClick={() => navigate('/clientes')}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-bold text-w1-teal">Perfil do Cliente</h1>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          <Avatar className="h-24 w-24">
            <AvatarImage src={cliente.avatar || "/profile-placeholder.jpg"} alt={cliente.nome} />
            <AvatarFallback className="text-2xl bg-w1-mint text-w1-teal">
              {cliente.nome.split(' ').map(name => name[0]).join('')}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-2 flex-1">
            <h2 className="text-2xl font-bold">{cliente.nome}</h2>
            <div className="flex flex-col sm:flex-row gap-4 text-gray-500">
              <div className="flex items-center gap-2">
                <span>Email:</span>
                <span className="font-medium text-gray-700">{cliente.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Telefone:</span>
                <span className="font-medium text-gray-700">{cliente.telefone}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Button
              className="bg-w1-teal hover:bg-w1-teal/90 flex gap-2 items-center"
              onClick={() => navigate('/comunicacao-consultor')}
            >
              <MessageCircle className="h-4 w-4" />
              Enviar Mensagem
            </Button>
            <Button variant="outline">Agendar Reunião</Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="perfil" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="perfil" className="flex gap-2 items-center">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Resumo</span>
          </TabsTrigger>
          <TabsTrigger value="holdings" className="flex gap-2 items-center">
            <Building2 className="h-4 w-4" />
            <span className="hidden sm:inline">Holdings</span>
          </TabsTrigger>
          <TabsTrigger value="patrimonio" className="flex gap-2 items-center">
            <PieChart className="h-4 w-4" />
            <span className="hidden sm:inline">Patrimônio</span>
          </TabsTrigger>
          <TabsTrigger value="reunioes" className="flex gap-2 items-center">
            <CalendarCheck className="h-4 w-4" />
            <span className="hidden sm:inline">Reuniões</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="perfil" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Documentos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-w1-teal">
                    {cliente.documentos.total}
                  </div>
                  <p className="text-gray-500">Total de documentos</p>
                </div>
                <div className="mt-4 flex justify-center">
                  {cliente.documentos.pendentes > 0 ? (
                    <Badge className="bg-amber-100 text-amber-800">
                      {cliente.documentos.pendentes} pendentes
                    </Badge>
                  ) : (
                    <Badge className="bg-green-100 text-green-800">
                      Todos em dia
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Holdings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-w1-teal">
                    {cliente.holdings.length}
                  </div>
                  <p className="text-gray-500">Total de holdings</p>
                </div>
                <div className="mt-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setActiveTab("holdings")}
                  >
                    Ver detalhes
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Atividade</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-sm font-medium">Última atividade em</div>
                  <div className="text-xl font-bold text-w1-teal">
                    {formatDate(cliente.ultimaAtividade)}
                  </div>
                </div>
                <div className="mt-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate('/comunicacao-consultor')}
                  >
                    Ver histórico
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="holdings" className="mt-6 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Holdings</CardTitle>
                <CardDescription>
                  Lista de holdings do cliente {cliente.nome}
                </CardDescription>
              </div>
              <Button
                className="bg-w1-mint text-w1-teal hover:bg-w1-mint/80"
                onClick={() => navigate('/holdings/criar')}
              >
                Nova Holding
              </Button>
            </CardHeader>
            <CardContent>
              {cliente.holdings.length > 0 ? (
                <div className="space-y-4">
                  {cliente.holdings.map((holding) => (
                    <Card key={holding.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/holdings/${cliente.id}`)}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">{holding.nome}</h3>
                            <p className="text-sm text-muted-foreground">{holding.tipo}</p>
                          </div>
                          <ArrowLeft className="h-5 w-5 text-muted-foreground rotate-180" />
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
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    Este cliente ainda não possui holdings cadastradas.
                  </p>
                  <Button
                    className="bg-w1-mint text-w1-teal hover:bg-w1-mint/80"
                    onClick={() => navigate('/holdings/criar')}
                  >
                    Criar Holding
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patrimonio" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Dashboard Patrimonial</CardTitle>
              <CardDescription>
                Consolidação dos patrimônios do cliente {cliente.nome}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {ativos.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Nenhum patrimônio cadastrado para este cliente.
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="bg-green-50">
                      <CardHeader className="pb-2">
                        <CardDescription>Valor Total</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                          {formatarValor(patrimonioTotal)}
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-blue-50">
                      <CardHeader className="pb-2">
                        <CardDescription>Tipos de Ativos</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-xl font-bold text-blue-600">
                          {porTipo.length}
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-purple-50">
                      <CardHeader className="pb-2">
                        <CardDescription>Maior Ativo</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-xl font-bold text-purple-600">
                          {ativos.length > 0
                            ? ativos.reduce((a, b) => (a.valor > b.valor ? a : b)).nome
                            : "-"}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Gráfico de pizza simplificado */}
                  <div className="mb-8">
                    <h3 className="font-semibold mb-2">Composição Patrimonial</h3>
                    <div className="flex flex-wrap gap-4">
                      {porTipo.map((item) => (
                        <div key={item.tipo} className="flex items-center gap-2">
                          <span
                            className="inline-block w-4 h-4 rounded-full"
                            style={{ background: CORES_PATRIMONIO[item.tipo] || "#999" }}
                          />
                          <span className="text-sm">{item.tipo}</span>
                          <span className="text-xs text-gray-500">
                            ({((item.valor / patrimonioTotal) * 100).toFixed(1)}%)
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tabela detalhada */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2 px-3 text-left">Ativo</th>
                          <th className="py-2 px-3 text-left">Tipo</th>
                          <th className="py-2 px-3 text-right">Valor</th>
                          <th className="py-2 px-3 text-right">% do Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ativos.map((a) => (
                          <tr key={a.id} className="border-b hover:bg-gray-50">
                            <td className="py-2 px-3">{a.nome}</td>
                            <td className="py-2 px-3">{a.tipo}</td>
                            <td className="py-2 px-3 text-right">{formatarValor(a.valor)}</td>
                            <td className="py-2 px-3 text-right">
                              {((a.valor / patrimonioTotal) * 100).toFixed(2)}%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reunioes" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Reuniões</CardTitle>
              <CardDescription>
                Agenda de reuniões com {cliente.nome}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Nenhuma reunião agendada.
                </p>
                <Button className="mt-4">
                  Agendar Reunião
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientePerfilPage;
