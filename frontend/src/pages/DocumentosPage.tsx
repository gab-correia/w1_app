
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { FileText, Upload, Eye, ArrowRight, X, Check } from "lucide-react";

// Mock data
const mockPendingDocuments = [
  { id: 1, name: "Escritura de imóveis", status: "pending", requestedBy: "Sistema", requestDate: "2023-05-10", message: "O documento da escritura da casa em Pinheiros ainda não foi enviada" },
  
];

const mockApprovedDocuments = [
  { id: 3, name: "RG", status: "approved", submittedDate: "2023-04-15", approvedDate: "2023-04-16" },
  { id: 4, name: "CPF", status: "approved", submittedDate: "2023-04-15", approvedDate: "2023-04-16" },
  { id: 5, name: "Certidão de Nascimento", status: "approved", submittedDate: "2023-04-20", approvedDate: "2023-04-21" },
  { id: 6, name: "Certidão de Casamento", status: "approved", submittedDate: "2023-04-22", approvedDate: "2023-04-25" },
];

const DocumentosPage = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };
  
  const handleUploadClick = (document: any) => {
    setSelectedDocument(document);
    setShowUploadDialog(true);
  };
  
  const handleViewClick = (document: any) => {
    setSelectedDocument(document);
    setShowViewDialog(true);
  };
  
  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            setShowUploadDialog(false);
            toast({
              title: "Documento enviado",
              description: "Seu documento foi enviado e está em análise."
            });
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-w1-teal">Meus Documentos</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="pending" className="relative">
            Pendentes
            {mockPendingDocuments.length > 0 && (
              <Badge className="ml-2 bg-amber-100 text-amber-800">
                {mockPendingDocuments.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="approved">Aprovados</TabsTrigger>
          <TabsTrigger value="all">Todos</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          {mockPendingDocuments.length > 0 ? (
            <div className="space-y-4">
              {mockPendingDocuments.map(doc => (
                <Card key={doc.id} className="border-amber-200">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-amber-100 p-2 rounded-full">
                          <FileText className="h-5 w-5 text-amber-800" />
                        </div>
                        <div>
                          <h3 className="font-medium">{doc.name}</h3>
                          <p className="text-sm text-gray-500">
                            Solicitado por {doc.requestedBy} em {formatDate(doc.requestDate)}
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                        Pendente
                      </Badge>
                    </div>
                    
                    <div className="mt-4 p-3 bg-amber-50 rounded-md text-sm">
                      <p className="text-amber-800">{doc.message}</p>
                    </div>
                    
                    <div className="mt-4 flex justify-end gap-3">
                      <Button variant="outline" size="sm" onClick={() => handleViewClick(doc)}>
                        <Eye className="h-4 w-4 mr-2" />
                        Ver detalhes
                      </Button>
                      <Button size="sm" className="bg-w1-teal hover:bg-w1-teal/90" onClick={() => handleUploadClick(doc)}>
                        <Upload className="h-4 w-4 mr-2" />
                        Enviar documento
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-xl font-medium text-gray-600">Nenhum documento pendente</h3>
              <p className="text-gray-500 mt-1">Todos os seus documentos foram aprovados.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="approved">
          <Card>
            <CardHeader>
              <CardTitle>Documentos Aprovados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="pb-3 font-medium">Nome</th>
                      <th className="pb-3 font-medium">Enviado em</th>
                      <th className="pb-3 font-medium">Aprovado em</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockApprovedDocuments.map(doc => (
                      <tr key={doc.id} className="border-b hover:bg-gray-50">
                        <td className="py-3">{doc.name}</td>
                        <td className="py-3">{formatDate(doc.submittedDate)}</td>
                        <td className="py-3">{formatDate(doc.approvedDate)}</td>
                        <td className="py-3">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                            Aprovado
                          </Badge>
                        </td>
                        <td className="py-3">
                          <Button variant="ghost" size="sm" onClick={() => handleViewClick(doc)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Ver
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Todos os Documentos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="pb-3 font-medium">Nome</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Data</th>
                      <th className="pb-3 font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...mockPendingDocuments, ...mockApprovedDocuments].map(doc => (
                      <tr key={doc.id} className="border-b hover:bg-gray-50">
                        <td className="py-3">{doc.name}</td>
                        <td className="py-3">
                          {doc.status === 'approved' ? (
                            <Badge className="bg-green-100 text-green-800">
                              Aprovado
                            </Badge>
                          ) : (
                            <Badge className="bg-amber-100 text-amber-800">
                              Pendente
                            </Badge>
                          )}
                        </td>
                        <td className="py-3">
                          {doc.status === 'approved' 
                            ? formatDate(doc.submittedDate) 
                            : formatDate(doc.requestDate)}
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" onClick={() => handleViewClick(doc)}>
                              <Eye className="h-4 w-4 mr-2" />
                              Ver
                            </Button>
                            {doc.status === 'pending' && (
                              <Button 
                                size="sm"
                                className="bg-w1-teal hover:bg-w1-teal/90"
                                onClick={() => handleUploadClick(doc)}
                              >
                                <Upload className="h-4 w-4 mr-2" />
                                Reenviar
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Upload Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        {selectedDocument && (
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Reenviar Documento</DialogTitle>
              <DialogDescription>
                Reenvie uma versão atualizada do documento "{selectedDocument.name}".
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              {!isUploading ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-500 mb-2">
                    Arraste seu arquivo aqui ou clique para selecionar
                  </p>
                  <p className="text-xs text-gray-400">
                    Formatos aceitos: PDF, JPG, PNG (máx. 10MB)
                  </p>
                  
                  <Button className="mt-4 bg-w1-teal hover:bg-w1-teal/90" onClick={simulateUpload}>
                    Selecionar arquivo
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-center">Enviando documento...</p>
                  <div className="w1-progress">
                    <div className="w1-progress-bar" style={{ width: `${uploadProgress}%` }}></div>
                  </div>
                  <p className="text-sm text-center">{uploadProgress}%</p>
                </div>
              )}
              
              <div className="mt-6 p-3 bg-gray-50 rounded-md text-sm">
                <p className="text-gray-600">
                  <span className="font-medium">Atenção:</span> Certifique-se de que seu documento esteja legível e contenha todas as páginas necessárias.
                </p>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowUploadDialog(false)} disabled={isUploading}>
                Cancelar
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
      
      {/* View Document Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        {selectedDocument && (
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Detalhes do Documento</DialogTitle>
            </DialogHeader>
            
            <div className="py-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">{selectedDocument.name}</h3>
                {selectedDocument.status === 'approved' ? (
                  <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                    <Check className="h-3 w-3" />
                    Aprovado
                  </Badge>
                ) : (
                  <Badge className="bg-amber-100 text-amber-800 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    Pendente
                  </Badge>
                )}
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-4 flex items-center justify-center h-64">
                  <div className="text-center">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Pré-visualização do documento</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="font-medium">
                    {selectedDocument.status === 'approved' ? 'Aprovado' : 'Pendente de aprovação'}
                  </p>
                </div>
                
                {selectedDocument.status === 'approved' ? (
                  <>
                    <div>
                      <p className="text-sm text-gray-500">Data de envio</p>
                      <p>{formatDate(selectedDocument.submittedDate)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Data de aprovação</p>
                      <p>{formatDate(selectedDocument.approvedDate)}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <p className="text-sm text-gray-500">Solicitado por</p>
                      <p>{selectedDocument.requestedBy}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Data da solicitação</p>
                      <p>{formatDate(selectedDocument.requestDate)}</p>
                    </div>
                    <div className="sm:col-span-2">
                      <p className="text-sm text-gray-500">Mensagem</p>
                      <p className="p-2 bg-amber-50 rounded mt-1 text-amber-800">{selectedDocument.message}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowViewDialog(false)}>
                Fechar
              </Button>
              {selectedDocument.status === 'pending' && (
                <Button 
                  className="bg-w1-teal hover:bg-w1-teal/90"
                  onClick={() => {
                    setShowViewDialog(false);
                    setTimeout(() => handleUploadClick(selectedDocument), 100);
                  }}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Reenviar documento
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default DocumentosPage;
