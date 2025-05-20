
import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Users, 
  Building, 
  FileText, 
  PieChart, 
  BarChart4, 
  Settings 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Socio {
  id: number;
  nome: string;
  percentual: number;
}

interface Bem {
  id: number;
  tipo: string;
  descricao: string;
  valor: number;
}

const HoldingDetalhesPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  // Mock data - normalmente viria de uma API
  const holdingData = {
    id: Number(id) || 1,
    nome: id === "1" ? "Família Silva Holdings" : "JSP Participações",
    tipo: id === "1" ? "Limitada" : "S.A.",
    status: id === "1" ? "ativa" : "em_andamento",
    dataCriacao: id === "1" ? "15/03/2022" : "10/01/2023",
    cnpj: id === "1" ? "12.345.678/0001-90" : "98.765.432/0001-21",
    valorTotal: id === "1" ? 7500000 : 3200000,
    socios: [
      { id: 1, nome: "João Silva", percentual: id === "1" ? 40 : 50 },
      { id: 2, nome: "Maria Silva", percentual: id === "1" ? 30 : 30 },
      { id: 3, nome: "Pedro Silva", percentual: id === "1" ? 20 : 20 },
      { id: 4, nome: "Ana Silva", percentual: id === "1" ? 10 : 0 },
    ],
    bens: [
      { 
        id: 1, 
        tipo: "imovel", 
        descricao: "Apartamento em São Paulo", 
        valor: id === "1" ? 3500000 : 1800000 
      },
      { 
        id: 2, 
        tipo: "imovel", 
        descricao: "Casa de Praia", 
        valor: id === "1" ? 2000000 : 0 
      },
      { 
        id: 3, 
        tipo: "participacao", 
        descricao: "Participação Empresa XYZ", 
        valor: id === "1" ? 1500000 : 1000000 
      },
      { 
        id: 4, 
        tipo: "veiculo", 
        descricao: "Veículos de Luxo", 
        valor: id === "1" ? 500000 : 400000 
      },
    ],
    documentos: [
      { 
        id: 1, 
        nome: "Contrato Social", 
        data: id === "1" ? "15/03/2022" : "10/01/2023",
        status: "completo"
      },
      { 
        id: 2, 
        nome: "Certidão Negativa Débitos", 
        data: id === "1" ? "10/04/2023" : "05/03/2023",
        status: "completo"
      },
      { 
        id: 3, 
        nome: "Escrituras de Imóveis", 
        data: id === "1" ? "20/05/2022" : "15/02/2023",
        status: id === "1" ? "completo" : "pendente"
      },
    ]
  };
  
  const formatarValor = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(valor);
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ativa":
        return <Badge className="bg-green-500">Ativa</Badge>;
      case "em_andamento":
        return <Badge className="bg-amber-500">Em Andamento</Badge>;
      case "pendente":
        return <Badge className="bg-gray-400">Pendente</Badge>;
      default:
        return null;
    }
  };
  
  const getDocumentStatusBadge = (status: string) => {
    switch (status) {
      case "completo":
        return <Badge className="bg-green-500">Completo</Badge>;
      case "pendente":
        return <Badge className="bg-amber-500">Pendente</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/holdings")}
          className="h-8 w-8"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-w1-teal">{holdingData.nome}</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-muted-foreground">{holdingData.tipo}</span>
            {getStatusBadge(holdingData.status)}
          </div>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">CNPJ</p>
              <p className="font-medium">{holdingData.cnpj}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Data de Criação</p>
              <p className="font-medium">{holdingData.dataCriacao}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-muted-foreground">Patrimônio Total</p>
              <p className="font-bold text-xl text-w1-teal">{formatarValor(holdingData.valorTotal)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="socios" className="w-full">
        <TabsList className="grid grid-cols-5 h-auto">
          <TabsTrigger value="socios" className="flex flex-col items-center py-2">
            <Users className="h-4 w-4 mb-1" />
            <span className="text-xs">Sócios</span>
          </TabsTrigger>
          <TabsTrigger value="bens" className="flex flex-col items-center py-2">
            <Building className="h-4 w-4 mb-1" />
            <span className="text-xs">Bens</span>
          </TabsTrigger>
          <TabsTrigger value="documentos" className="flex flex-col items-center py-2">
            <FileText className="h-4 w-4 mb-1" />
            <span className="text-xs">Docs</span>
          </TabsTrigger>
          <TabsTrigger value="distribuicao" className="flex flex-col items-center py-2">
            <PieChart className="h-4 w-4 mb-1" />
            <span className="text-xs">Distrib.</span>
          </TabsTrigger>
          <TabsTrigger value="configuracoes" className="flex flex-col items-center py-2">
            <Settings className="h-4 w-4 mb-1" />
            <span className="text-xs">Config.</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="socios" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex justify-between items-center">
                <span>Quadro Societário</span>
                <Button size="sm" className="h-8">Editar</Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="divide-y">
                {holdingData.socios.map((socio: Socio) => (
                  <li key={socio.id} className="py-3 flex justify-between items-center">
                    <span>{socio.nome}</span>
                    <Badge variant="outline" className="font-medium">{socio.percentual}%</Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="bens" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex justify-between items-center">
                <span>Bens Integralizados</span>
                <Button size="sm" className="h-8">Adicionar</Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="divide-y">
                {holdingData.bens.filter((bem: Bem) => bem.valor > 0).map((bem: Bem) => (
                  <li key={bem.id} className="py-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{bem.descricao}</p>
                        <Badge variant="outline" className="capitalize text-xs mt-1">
                          {bem.tipo === 'imovel' ? 'Imóvel' : 
                           bem.tipo === 'veiculo' ? 'Veículo' : 
                           bem.tipo === 'participacao' ? 'Participação Societária' : bem.tipo}
                        </Badge>
                      </div>
                      <span className="font-semibold">{formatarValor(bem.valor)}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documentos" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex justify-between items-center">
                <span>Documentos</span>
                <Link to="/document-scanner">
                  <Button size="sm" className="h-8">Upload</Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="divide-y">
                {holdingData.documentos.map((doc: any) => (
                  <li key={doc.id} className="py-3 flex justify-between items-center">
                    <div>
                      <p className="font-medium">{doc.nome}</p>
                      <p className="text-xs text-muted-foreground">{doc.data}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getDocumentStatusBadge(doc.status)}
                      <Button variant="ghost" size="sm">
                        Ver
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="distribuicao" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Distribuição de Ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center py-4">
                <div className="w-48 h-48 rounded-full border-8 border-gray-200 relative">
                  {/* Gráfico de Pizza Simulado */}
                  <div className="absolute inset-0 rounded-full overflow-hidden">
                    <div className="absolute h-full w-1/2 bg-w1-teal origin-right" style={{ transform: 'rotate(0deg)' }}></div>
                    <div className="absolute h-full w-1/2 bg-w1-mint origin-right" style={{ transform: 'rotate(180deg)' }}></div>
                    <div className="absolute h-full w-1/3 bg-blue-500 origin-right" style={{ transform: 'rotate(270deg)' }}></div>
                    <div className="absolute h-full w-1/12 bg-gray-300 origin-right" style={{ transform: 'rotate(300deg)' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 space-y-2">
                {/* Legenda */}
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-w1-teal"></div>
                  <div className="flex-1">Imóveis</div>
                  <div className="font-medium">
                    {formatarValor(holdingData.bens.filter(b => b.tipo === 'imovel').reduce((sum, b) => sum + b.valor, 0))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-w1-mint"></div>
                  <div className="flex-1">Participações Societárias</div>
                  <div className="font-medium">
                    {formatarValor(holdingData.bens.filter(b => b.tipo === 'participacao').reduce((sum, b) => sum + b.valor, 0))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <div className="flex-1">Veículos</div>
                  <div className="font-medium">
                    {formatarValor(holdingData.bens.filter(b => b.tipo === 'veiculo').reduce((sum, b) => sum + b.valor, 0))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                  <div className="flex-1">Outros</div>
                  <div className="font-medium">
                    {formatarValor(holdingData.bens.filter(b => !['imovel', 'participacao', 'veiculo'].includes(b.tipo)).reduce((sum, b) => sum + b.valor, 0))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="configuracoes" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Configurações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full">Editar Dados Básicos</Button>
              <Button className="w-full" variant="outline">Alterar Quadro Societário</Button>
              <Button className="w-full" variant="outline">Gerenciar Notificações</Button>
              <Button className="w-full text-red-500 hover:bg-red-50" variant="outline">
                Arquivar Holding
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HoldingDetalhesPage;
