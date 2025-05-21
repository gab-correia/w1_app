
import { useState } from "react";
import { 
  FileText, 
  FilePlus, 
  Users, 
  Upload,
  Search,
  User
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data for clients
const mockClients = [
  { id: 1, name: "João Silva", email: "joao.silva@exemplo.com", documents: 8, lastActive: "2023-05-16" },
  { id: 2, name: "Maria Oliveira", email: "maria.oliveira@exemplo.com", documents: 12, lastActive: "2023-05-15" },
  { id: 3, name: "Carlos Santos", email: "carlos.santos@exemplo.com", documents: 5, lastActive: "2023-05-10" },
  { id: 4, name: "Ana Pereira", email: "ana.pereira@exemplo.com", documents: 15, lastActive: "2023-05-08" },
  { id: 5, name: "Roberto Costa", email: "roberto.costa@exemplo.com", documents: 3, lastActive: "2023-05-05" },
];

// Mock data for document templates
const mockDocumentTemplates = [
  { id: 1, name: "Contrato Holding Familiar", type: "Jurídico", createdAt: "2023-04-10" },
  { id: 2, name: "Declaração de Bens", type: "Financeiro", createdAt: "2023-04-05" },
  { id: 3, name: "Procuração", type: "Jurídico", createdAt: "2023-03-22" },
  { id: 4, name: "Planejamento Sucessório", type: "Estratégico", createdAt: "2023-03-15" },
  { id: 5, name: "Relatório Patrimonial", type: "Financeiro", createdAt: "2023-02-28" },
];

const DashboardConsultorPage = () => {
  const navigate = useNavigate();
  const [searchClient, setSearchClient] = useState("");
  const [searchDocument, setSearchDocument] = useState("");
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [showProfileDialog, setShowProfileDialog] = useState(false);

  const filteredClients = mockClients.filter(client => 
    client.name.toLowerCase().includes(searchClient.toLowerCase()) ||
    client.email.toLowerCase().includes(searchClient.toLowerCase())
  );

  const filteredDocuments = mockDocumentTemplates.filter(doc => 
    doc.name.toLowerCase().includes(searchDocument.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchDocument.toLowerCase())
  );
  
  // Format date to Brazilian format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const handleViewProfile = (client: typeof mockClients[0]) => {
    setSelectedClient(client);
    setShowProfileDialog(true);
  };

  const handleViewFullProfile = () => {
    if (selectedClient) {
      navigate(`/cliente/${selectedClient.id}/perfil`);
      setShowProfileDialog(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-w1-teal">Dashboard do Consultor</h1>
          <p className="text-gray-500">Gerencie seus clientes e documentos</p>
        </div>
        
        <Button 
          className="bg-w1-teal hover:bg-w1-teal/90 flex items-center gap-2"
          onClick={() => navigate("/adicionar-documento")}
        >
          <FilePlus className="h-4 w-4" />
          Adicionar Modelo De Documento
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Resumo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <p className="text-gray-500 text-sm">Total de Clientes</p>
                <p className="text-2xl font-bold text-w1-teal">{mockClients.length}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <p className="text-gray-500 text-sm">Documentos Modelo</p>
                <p className="text-2xl font-bold text-w1-teal">{mockDocumentTemplates.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              <Button 
                variant="outline" 
                className="h-auto py-4 flex flex-col items-center justify-center gap-2"
                onClick={() => navigate("/clientes")}
              >
                <Users className="h-5 w-5 text-w1-teal" />
                <span>Ver Clientes</span>
              </Button>
             
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="clients">
        <TabsList className="mb-4">
          <TabsTrigger value="clients" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Seus Clientes</span>
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Documentos Modelo</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="clients">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>Clientes</CardTitle>
                  <CardDescription>Gerencie e visualize seus clientes</CardDescription>
                </div>
                <div className="relative">
                  <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Buscar clientes..." 
                    className="pl-8"
                    value={searchClient}
                    onChange={(e) => setSearchClient(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left font-medium py-3 px-4">Nome</th>
                      <th className="text-left font-medium py-3 px-4">Email</th>
                      <th className="text-left font-medium py-3 px-4">Documentos</th>
                      <th className="text-left font-medium py-3 px-4">Última Atividade</th>
                      <th className="text-left font-medium py-3 px-4">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredClients.map(client => (
                      <tr key={client.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{client.name}</td>
                        <td className="py-3 px-4">{client.email}</td>
                        <td className="py-3 px-4">{client.documents}</td>
                        <td className="py-3 px-4">{formatDate(client.lastActive)}</td>
                        <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                        <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleViewProfile(client)}
                              className="flex items-center gap-1"
                            >
                              <User className="h-4 w-4" />
                              Ver perfil
                        </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredClients.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    Nenhum cliente encontrado com esse critério de busca.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>Documentos Modelo</CardTitle>
                  <CardDescription>Documentos que você pode compartilhar com seus clientes</CardDescription>
                </div>
                <div className="relative">
                  <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Buscar documentos..." 
                    className="pl-8"
                    value={searchDocument}
                    onChange={(e) => setSearchDocument(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left font-medium py-3 px-4">Nome</th>
                      <th className="text-left font-medium py-3 px-4">Tipo</th>
                      <th className="text-left font-medium py-3 px-4">Data de Criação</th>
                      <th className="text-left font-medium py-3 px-4">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDocuments.map(doc => (
                      <tr key={doc.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{doc.name}</td>
                        <td className="py-3 px-4">{doc.type}</td>
                        <td className="py-3 px-4">{formatDate(doc.createdAt)}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => navigate(`/documento/${doc.id}`)}>
                              Visualizar
                            </Button>
                            <Button size="sm" onClick={() => navigate(`/compartilhar-documento/${doc.id}`)}>
                              Compartilhar
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredDocuments.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    Nenhum documento encontrado com esse critério de busca.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

    {/* Profile Dialog */}
    <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Perfil do Cliente</DialogTitle>
            <DialogDescription>
              Informações rápidas sobre o cliente
            </DialogDescription>
          </DialogHeader>
          
          {selectedClient && (
            <div className="flex flex-col items-center space-y-4 p-2">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/profile-placeholder.jpg" alt={selectedClient.name} />
                <AvatarFallback className="bg-w1-mint text-w1-teal text-xl">
                  {selectedClient.name.split(' ').map((n: string) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="text-center">
                <h3 className="text-lg font-medium">{selectedClient.name}</h3>
                <p className="text-sm text-gray-500">{selectedClient.email}</p>
              </div>
              
              <div className="w-full grid grid-cols-2 gap-3 pt-4">
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm text-gray-500">Documentos</p>
                  <p className="font-medium">{selectedClient.documents}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm text-gray-500">Última atividade</p>
                  <p className="font-medium">{formatDate(selectedClient.lastActive)}</p>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={() => setShowProfileDialog(false)}>
              Fechar
            </Button>{/* Profile Dialog */}
      <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Perfil do Cliente</DialogTitle>
            <DialogDescription>
              Informações rápidas sobre o cliente
            </DialogDescription>
          </DialogHeader>
          
          {selectedClient && (
            <div className="flex flex-col items-center space-y-4 p-2">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/profile-placeholder.jpg" alt={selectedClient.name} />
                <AvatarFallback className="bg-w1-mint text-w1-teal text-xl">
                  {selectedClient.name.split(' ').map((n: string) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="text-center">
                <h3 className="text-lg font-medium">{selectedClient.name}</h3>
                <p className="text-sm text-gray-500">{selectedClient.email}</p>
              </div>
              
              <div className="w-full grid grid-cols-2 gap-3 pt-4">
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm text-gray-500">Documentos</p>
                  <p className="font-medium">{selectedClient.documents}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm text-gray-500">Última atividade</p>
                  <p className="font-medium">{formatDate(selectedClient.lastActive)}</p>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={() => setShowProfileDialog(false)}>
              Fechar
            </Button>
            <Button 
              className="bg-w1-teal hover:bg-w1-teal/90"
              onClick={handleViewFullProfile}
            >
              Ver perfil completo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
            <Button 
              className="bg-w1-teal hover:bg-w1-teal/90"
              onClick={handleViewFullProfile}
            >
              Ver perfil completo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardConsultorPage;
