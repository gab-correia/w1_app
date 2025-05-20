
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, UserPlus, ArrowRight, Eye, Upload, MessageCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

// Mock client data with document status
const mockClients = [
  { 
    id: 1, 
    name: "João Silva", 
    email: "joao.silva@exemplo.com", 
    phone: "(11) 98765-4321", 
    documents: 8, 
    pendingDocuments: 2,
    lastActive: "2023-05-16" 
  },
  { 
    id: 2, 
    name: "Maria Oliveira", 
    email: "maria.oliveira@exemplo.com", 
    phone: "(21) 98765-4321",
    documents: 12, 
    pendingDocuments: 0,
    lastActive: "2023-05-15" 
  },
  { 
    id: 3, 
    name: "Carlos Santos", 
    email: "carlos.santos@exemplo.com", 
    phone: "(31) 98765-4321",
    documents: 5, 
    pendingDocuments: 3,
    lastActive: "2023-05-10" 
  },
  { 
    id: 4, 
    name: "Ana Pereira", 
    email: "ana.pereira@exemplo.com", 
    phone: "(41) 98765-4321",
    documents: 15, 
    pendingDocuments: 1,
    lastActive: "2023-05-08" 
  },
  { 
    id: 5, 
    name: "Roberto Costa", 
    email: "roberto.costa@exemplo.com", 
    phone: "(51) 98765-4321",
    documents: 3, 
    pendingDocuments: 0,
    lastActive: "2023-05-05" 
  },
];

const ClientesPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [addClientDialog, setAddClientDialog] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [showClientDetails, setShowClientDetails] = useState(false);
  
  // Client form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  
  const filteredClients = mockClients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Format date to Brazilian format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };
  
  const handleAddClient = () => {
    if (!name || !email || !phone) {
      toast({
        variant: "destructive",
        title: "Erro ao adicionar cliente",
        description: "Por favor, preencha todos os campos obrigatórios.",
      });
      return;
    }
    
    toast({
      title: "Cliente adicionado",
      description: "O cliente foi adicionado com sucesso.",
    });
    
    setAddClientDialog(false);
    // Reset form
    setName("");
    setEmail("");
    setPhone("");
  };
  
  const handleViewClient = (client: any) => {
    setSelectedClient(client);
    setShowClientDetails(true);
  };
  
  const handleUploadRequest = (client: any) => {
    toast({
      title: "Solicitação enviada",
      description: `Solicitação enviada para ${client.name}.`,
    });
  };
  
  const handleStartChat = (client: any) => {
    toast({
      title: "Chat iniciado",
      description: `Iniciando conversa com ${client.name}.`,
    });
    // In a real app, this would open a chat interface
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-w1-teal">Clientes</h1>
          <p className="text-gray-500">Gerencie e visualize seus clientes</p>
        </div>
        
        <Button 
          className="bg-w1-teal hover:bg-w1-teal/90 flex items-center gap-2"
          onClick={() => setAddClientDialog(true)}
        >
          <UserPlus className="h-4 w-4" />
          Adicionar Cliente
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Lista de Clientes</CardTitle>
              <CardDescription>Total de {mockClients.length} clientes cadastrados</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar clientes..." 
                className="pl-8 w-full sm:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
                  <th className="text-left font-medium py-3 px-4 hidden sm:table-cell">Email</th>
                  <th className="text-left font-medium py-3 px-4 hidden md:table-cell">Documentos</th>
                  <th className="text-left font-medium py-3 px-4 hidden lg:table-cell">Última Atividade</th>
                  <th className="text-left font-medium py-3 px-4">Status</th>
                  <th className="text-left font-medium py-3 px-4">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map(client => (
                  <tr key={client.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{client.name}</td>
                    <td className="py-3 px-4 hidden sm:table-cell">{client.email}</td>
                    <td className="py-3 px-4 hidden md:table-cell">
                      {client.documents} 
                      {client.pendingDocuments > 0 && (
                        <Badge className="ml-2 bg-amber-100 text-amber-800 hover:bg-amber-200">
                          {client.pendingDocuments} pendente(s)
                        </Badge>
                      )}
                    </td>
                    <td className="py-3 px-4 hidden lg:table-cell">{formatDate(client.lastActive)}</td>
                    <td className="py-3 px-4">
                      {client.pendingDocuments > 0 ? (
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                          Pendente
                        </Badge>
                      ) : (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                          Em dia
                        </Badge>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8" 
                          onClick={() => handleViewClient(client)}
                          title="Ver detalhes"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleUploadRequest(client)}
                          title="Solicitar documentos"
                        >
                          <Upload className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleStartChat(client)}
                          title="Iniciar conversa"
                        >
                          <MessageCircle className="h-4 w-4" />
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
      
      {/* Add Client Dialog */}
      <Dialog open={addClientDialog} onOpenChange={setAddClientDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Cliente</DialogTitle>
            <DialogDescription>
              Preencha os dados abaixo para cadastrar um novo cliente.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome completo</Label>
              <Input
                id="name"
                placeholder="Nome do cliente"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                placeholder="(00) 00000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddClientDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddClient}>
              Adicionar Cliente
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Client Details Dialog */}
      <Dialog open={showClientDetails && !!selectedClient} onOpenChange={setShowClientDetails}>
        {selectedClient && (
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-xl">Detalhes do Cliente</DialogTitle>
            </DialogHeader>
            
            <div className="py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Informações Pessoais</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Nome</p>
                      <p className="font-medium">{selectedClient.name}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p>{selectedClient.email}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Telefone</p>
                      <p>{selectedClient.phone}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Última atividade</p>
                      <p>{formatDate(selectedClient.lastActive)}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    <Button className="w-full flex items-center justify-center gap-2" onClick={() => navigate(`/cliente/${selectedClient.id}/perfil`)}>
                      Ver perfil completo
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                    
                    <Button variant="outline" className="w-full" onClick={() => {
                      handleStartChat(selectedClient);
                      setShowClientDetails(false);
                    }}>
                      Iniciar conversa
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Documentos</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-500">Total de documentos</p>
                      <p className="font-medium">{selectedClient.documents}</p>
                    </div>
                    
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-500">Documentos pendentes</p>
                      <p className="font-medium text-amber-600">{selectedClient.pendingDocuments}</p>
                    </div>
                    
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-500">Status</p>
                      {selectedClient.pendingDocuments > 0 ? (
                        <Badge className="bg-amber-100 text-amber-800">Pendente</Badge>
                      ) : (
                        <Badge className="bg-green-100 text-green-800">Em dia</Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    <Button 
                      className="w-full bg-w1-teal hover:bg-w1-teal/90" 
                      onClick={() => {
                        navigate(`/cliente/${selectedClient.id}/documentos`);
                        setShowClientDetails(false);
                      }}
                    >
                      Ver documentos
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => {
                        handleUploadRequest(selectedClient);
                        setShowClientDetails(false);
                      }}
                    >
                      Solicitar novos documentos
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowClientDetails(false)}>
                Fechar
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default ClientesPage;
