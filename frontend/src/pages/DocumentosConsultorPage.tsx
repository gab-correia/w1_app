
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Search, FileText, Eye, Share2, FilePlus, Check } from "lucide-react";

// Mock data for documents
const mockDocuments = [
  { id: 1, name: "Contrato de Holding Familiar", type: "Contrato", createdAt: "2023-04-15", createdBy: "Sistema", clientsShared: 3 },
  { id: 2, name: "Declaração de Imposto de Renda", type: "Declaração", createdAt: "2023-04-10", createdBy: "João Consultor", clientsShared: 8 },
  { id: 3, name: "Procuração", type: "Legal", createdAt: "2023-03-22", createdBy: "Maria Consultora", clientsShared: 2 },
  { id: 4, name: "Planejamento Sucessório", type: "Planejamento", createdAt: "2023-03-15", createdBy: "Sistema", clientsShared: 5 },
  { id: 5, name: "Relatório Patrimonial", type: "Relatório", createdAt: "2023-02-28", createdBy: "João Consultor", clientsShared: 7 },
];

// Mock data for clients
const mockClients = [
  { id: 1, name: "João Silva", email: "joao.silva@exemplo.com" },
  { id: 2, name: "Maria Oliveira", email: "maria.oliveira@exemplo.com" },
  { id: 3, name: "Carlos Santos", email: "carlos.santos@exemplo.com" },
  { id: 4, name: "Ana Pereira", email: "ana.pereira@exemplo.com" },
  { id: 5, name: "Roberto Costa", email: "roberto.costa@exemplo.com" },
];

const DocumentosConsultorPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [selectedClients, setSelectedClients] = useState<number[]>([]);
  const [shareMessage, setShareMessage] = useState("");
  
  // Filter documents based on search and tabs
  const filteredDocuments = mockDocuments.filter(doc => 
    (doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     doc.type.toLowerCase().includes(searchTerm.toLowerCase())) && 
    (selectedTab === "all" || doc.type.toLowerCase() === selectedTab.toLowerCase())
  );
  
  // Format date to Brazilian format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };
  
  const handleViewDocument = (document: any) => {
    setSelectedDocument(document);
    setShowViewDialog(true);
  };
  
  const handleShareDocument = (document: any) => {
    setSelectedDocument(document);
    setSelectedClients([]);
    setShareMessage("");
    setShowShareDialog(true);
  };
  
  const handleShareSubmit = () => {
    if (selectedClients.length === 0) {
      toast({
        variant: "destructive",
        title: "Erro ao compartilhar",
        description: "Por favor, selecione pelo menos um cliente.",
      });
      return;
    }
    
    const selectedClientNames = mockClients
      .filter(client => selectedClients.includes(client.id))
      .map(client => client.name)
      .join(", ");
    
    toast({
      title: "Documento compartilhado",
      description: `O documento foi compartilhado com ${selectedClientNames}.`,
    });
    
    setShowShareDialog(false);
  };
  
  const toggleClientSelection = (clientId: number) => {
    if (selectedClients.includes(clientId)) {
      setSelectedClients(selectedClients.filter(id => id !== clientId));
    } else {
      setSelectedClients([...selectedClients, clientId]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-w1-teal">Documentos</h1>
          <p className="text-gray-500">Gerencie e compartilhe documentos com seus clientes</p>
        </div>
        
        <Button 
          className="bg-w1-teal hover:bg-w1-teal/90 flex items-center gap-2"
          onClick={() => window.location.href = "/adicionar-documento"}
        >
          <FilePlus className="h-4 w-4" />
          Adicionar Documento
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full sm:w-auto">
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="contrato">Contratos</TabsTrigger>
            <TabsTrigger value="declaração">Declarações</TabsTrigger>
            <TabsTrigger value="legal">Legal</TabsTrigger>
            <TabsTrigger value="planejamento">Planejamento</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar documentos..." 
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <TabsContent value="all" className="mt-0 p-0">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Documentos disponíveis</CardTitle>
            <CardDescription>
              Documentos que você pode visualizar e compartilhar com clientes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left font-medium py-3 px-4">Nome</th>
                    <th className="text-left font-medium py-3 px-4">Tipo</th>
                    <th className="text-left font-medium py-3 px-4">Criado em</th>
                    <th className="text-left font-medium py-3 px-4">Compartilhamentos</th>
                    <th className="text-left font-medium py-3 px-4">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDocuments.map(doc => (
                    <tr key={doc.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{doc.name}</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="bg-gray-100">
                          {doc.type}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">{formatDate(doc.createdAt)}</td>
                      <td className="py-3 px-4">
                        <Badge>{doc.clientsShared} cliente(s)</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="flex items-center gap-1"
                            onClick={() => handleViewDocument(doc)}
                          >
                            <Eye className="h-4 w-4" />
                            <span className="hidden sm:inline">Visualizar</span>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="flex items-center gap-1 text-w1-teal border-w1-teal hover:bg-w1-mint/10"
                            onClick={() => handleShareDocument(doc)}
                          >
                            <Share2 className="h-4 w-4" />
                            <span className="hidden sm:inline">Compartilhar</span>
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
      
      {/* View Document Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        {selectedDocument && (
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Visualizar Documento</DialogTitle>
              <DialogDescription>
                {selectedDocument.name}
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-4 flex items-center justify-center h-96">
                  <div className="text-center">
                    <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg text-gray-500 font-medium">{selectedDocument.name}</p>
                    <p className="text-gray-400 mt-2">Visualização do documento</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Tipo</p>
                  <p className="font-medium">{selectedDocument.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Data de criação</p>
                  <p className="font-medium">{formatDate(selectedDocument.createdAt)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Criado por</p>
                  <p className="font-medium">{selectedDocument.createdBy}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Compartilhado com</p>
                  <p className="font-medium">{selectedDocument.clientsShared} cliente(s)</p>
                </div>
              </div>
            </div>
            
            <DialogFooter className="sm:justify-between">
              <Button 
                variant="outline"
                onClick={() => setShowViewDialog(false)}
              >
                Fechar
              </Button>
              <Button 
                className="bg-w1-teal hover:bg-w1-teal/90"
                onClick={() => {
                  setShowViewDialog(false);
                  setTimeout(() => handleShareDocument(selectedDocument), 100);
                }}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Compartilhar
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
      
      {/* Share Document Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        {selectedDocument && (
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Compartilhar Documento</DialogTitle>
              <DialogDescription>
                Compartilhe "{selectedDocument.name}" com seus clientes
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4 space-y-4">
              <div>
                <Label className="text-base font-medium">Selecione os clientes</Label>
                <div className="mt-3 border rounded-md max-h-60 overflow-y-auto">
                  {mockClients.map(client => (
                    <div 
                      key={client.id}
                      className="flex items-center space-x-2 p-3 hover:bg-gray-50 border-b last:border-b-0"
                    >
                      <Checkbox 
                        id={`client-${client.id}`} 
                        checked={selectedClients.includes(client.id)}
                        onCheckedChange={() => toggleClientSelection(client.id)}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label htmlFor={`client-${client.id}`} className="text-sm font-medium">
                          {client.name}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {client.email}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-2 text-sm text-gray-500 flex items-center justify-between">
                  <span>{selectedClients.length} cliente(s) selecionado(s)</span>
                  {selectedClients.length > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-auto p-0 text-w1-teal"
                      onClick={() => setSelectedClients([])}
                    >
                      Limpar seleção
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="share-message">Mensagem (opcional)</Label>
                <textarea
                  id="share-message"
                  className="w-full min-h-[100px] p-3 rounded-md border border-input bg-transparent text-sm shadow-sm"
                  placeholder="Adicione uma mensagem personalizada ao compartilhar o documento..."
                  value={shareMessage}
                  onChange={(e) => setShareMessage(e.target.value)}
                />
              </div>
            </div>
            
            <DialogFooter className="sm:justify-between">
              <Button 
                variant="outline"
                onClick={() => setShowShareDialog(false)}
              >
                Cancelar
              </Button>
              <Button 
                className="bg-w1-teal hover:bg-w1-teal/90"
                onClick={handleShareSubmit}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Compartilhar
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default DocumentosConsultorPage;
