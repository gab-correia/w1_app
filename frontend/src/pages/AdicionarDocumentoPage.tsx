
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, File, FilePlus, PlusCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";

const documentTypes = [
  { id: "legal", label: "Documentos Jurídicos" },
  { id: "financial", label: "Documentos Financeiros" },
  { id: "holding", label: "Documentação de Holding" },
  { id: "succession", label: "Planejamento Sucessório" },
  { id: "other", label: "Outros" },
];

const AdicionarDocumentoPage = () => {
  const navigate = useNavigate();
  const [documentName, setDocumentName] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [description, setDescription] = useState("");
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [fileUploaded, setFileUploaded] = useState<File | null>(null);
  const [isTemplate, setIsTemplate] = useState(false);
  
  // Mock client data
  const mockClients = [
    { id: "1", name: "João Silva" },
    { id: "2", name: "Maria Oliveira" },
    { id: "3", name: "Carlos Santos" },
    { id: "4", name: "Ana Pereira" },
    { id: "5", name: "Roberto Costa" },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileUploaded(file);
    }
  };

  const handleClientToggle = (clientId: string) => {
    if (selectedClients.includes(clientId)) {
      setSelectedClients(selectedClients.filter(id => id !== clientId));
    } else {
      setSelectedClients([...selectedClients, clientId]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!documentName) {
      toast({
        title: "Erro ao adicionar documento",
        description: "O nome do documento é obrigatório.",
        variant: "destructive",
      });
      return;
    }
    
    if (!fileUploaded && !isTemplate) {
      toast({
        title: "Erro ao adicionar documento",
        description: "Por favor, faça o upload de um arquivo ou marque como modelo.",
        variant: "destructive",
      });
      return;
    }
    
    // Success state
    toast({
      title: "Documento adicionado com sucesso",
      description: isTemplate ? "O modelo foi salvo e está pronto para uso." : "O documento foi salvo e compartilhado com os clientes selecionados.",
    });
    
    setTimeout(() => {
      navigate("/dashboard-consultor");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="h-8 w-8"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold text-w1-teal">
          {isTemplate ? "Adicionar Modelo de Documento" : "Adicionar Documento"}
        </h1>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center gap-2">
              <Checkbox 
                id="is-template" 
                checked={isTemplate} 
                onCheckedChange={() => setIsTemplate(!isTemplate)} 
              />
              <Label htmlFor="is-template" className="font-medium cursor-pointer">
                Este é um modelo de documento (template)
              </Label>
            </div>
            
            <div className="grid gap-6">
              <div className="space-y-2">
                <Label htmlFor="document-name">Nome do Documento</Label>
                <Input 
                  id="document-name"
                  value={documentName}
                  onChange={(e) => setDocumentName(e.target.value)}
                  placeholder="Ex: Contrato de Holding Familiar"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="document-type">Tipo de Documento</Label>
                <select
                  id="document-type"
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                >
                  <option value="" disabled>Selecione um tipo</option>
                  {documentTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="document-description">Descrição</Label>
                <Textarea 
                  id="document-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descreva o documento e sua finalidade..."
                  rows={4}
                />
              </div>
              
              {!isTemplate && (
                <div className="space-y-2">
                  <Label>Compartilhar com Clientes</Label>
                  <div className="border rounded-md p-3 max-h-40 overflow-y-auto space-y-2">
                    {mockClients.map((client) => (
                      <div key={client.id} className="flex items-center gap-2">
                        <Checkbox 
                          id={`client-${client.id}`} 
                          checked={selectedClients.includes(client.id)}
                          onCheckedChange={() => handleClientToggle(client.id)} 
                        />
                        <Label htmlFor={`client-${client.id}`} className="cursor-pointer">
                          {client.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="space-y-4">
                <Label>Arquivo do Documento</Label>
                {!fileUploaded ? (
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                    <div className="flex flex-col items-center space-y-4">
                      <Upload className="h-10 w-10 text-gray-300" />
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Arraste e solte seu documento aqui ou
                        </p>
                        <div>
                          <label htmlFor="file-upload" className="cursor-pointer text-sm text-w1-teal font-medium">
                            Selecione um arquivo
                            <Input 
                              id="file-upload"
                              type="file"
                              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                              onChange={handleFileChange}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="border rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <File className="h-8 w-8 text-w1-teal" />
                      <div>
                        <p className="font-medium">{fileUploaded.name}</p>
                        <p className="text-sm text-gray-500">
                          {(fileUploaded.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setFileUploaded(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                {isTemplate && !fileUploaded && (
                  <div className="flex items-center justify-center mt-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="text-w1-teal"
                      onClick={() => navigate("/document-scanner")}
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Escanear documento
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-end gap-3 pt-4">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => navigate(-1)}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                className="bg-w1-teal hover:bg-w1-teal/90"
              >
                <FilePlus className="h-4 w-4 mr-2" />
                {isTemplate ? "Salvar Modelo" : "Adicionar Documento"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdicionarDocumentoPage;
