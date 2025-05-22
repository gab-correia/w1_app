import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Phone, 
  Video, 
  Calendar, 
  Paperclip, 
  Send, 
  Image, 
  File,
  Bell
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter, 
  DialogTrigger,
  DialogDescription,
  DialogClose
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

interface Mensagem {
  id: number;
  texto: string;
  remetente: 'cliente' | 'consultor';
  timestamp: Date;
  lida: boolean;
  tipo?: 'texto' | 'imagem' | 'documento';
  anexo?: string;
  nomeArquivo?: string;
}

interface Consultor {
  id: number;
  nome: string;
  avatar: string;
  cargo: string;
  disponivel: boolean;
}

interface Reuniao {
  id: number;
  titulo: string;
  data: Date;
  duracao: number; // em minutos
  consultorId: number;
}

const ComunicacaoPage = () => {
  // Estado para o consultor designado ao cliente
  const [consultor] = useState<Consultor>({
    id: 1,
    nome: "Ana Beatriz",
    avatar: "/profile-placeholder.jpg",
    cargo: "Consultora Patrimonial",
    disponivel: true
  });

  // Estado para as mensagens
  const [mensagens, setMensagens] = useState<Mensagem[]>([
    {
      id: 1,
      texto: "Bom dia! Tudo bem? Gostaria de agendar uma reunião para discutirmos o planejamento patrimonial.",
      remetente: 'cliente',
      timestamp: new Date(Date.now() - 86400000 * 2),
      lida: true
    },
    {
      id: 2,
      texto: "Olá, claro! Podemos agendar para esta semana. Quinta-feira às 15h seria um bom horário?",
      remetente: 'consultor',
      timestamp: new Date(Date.now() - 86400000 * 2 + 7200000),
      lida: true
    },
    {
      id: 3,
      texto: "Perfeito! Está agendado para quinta-feira às 15h.",
      remetente: 'cliente',
      timestamp: new Date(Date.now() - 86400000),
      lida: true
    },
    {
      id: 4,
      texto: "Os documentos para a constituição da holding foram enviados. Poderia confirmar o recebimento?",
      remetente: 'consultor',
      timestamp: new Date(Date.now() - 3600000),
      lida: false
    }
  ]);

  const [reunioes, setReunioes] = useState<Reuniao[]>([
    {
      id: 1,
      titulo: "Revisão do Planejamento Patrimonial",
      data: new Date(2025, 4, 18, 15, 0),
      duracao: 60,
      consultorId: 1
    }
  ]);

  const [novaMensagem, setNovaMensagem] = useState('');
  const [notificacoes, setNotificacoes] = useState(2);
  const [showNotificacoes, setShowNotificacoes] = useState(false);
  const [anexoSelecionado, setAnexoSelecionado] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const enviarMensagem = () => {
    if (!novaMensagem.trim() && !anexoSelecionado) return;

    const novaMensagemObj: Mensagem = {
      id: mensagens.length + 1,
      texto: novaMensagem || (anexoSelecionado ? `Enviou um ${anexoSelecionado.type.startsWith('image/') ? 'imagem' : 'documento'}` : ''),
      remetente: 'cliente',
      timestamp: new Date(),
      lida: true
    };

    if (anexoSelecionado) {
      novaMensagemObj.tipo = anexoSelecionado.type.startsWith('image/') ? 'imagem' : 'documento';
      novaMensagemObj.anexo = URL.createObjectURL(anexoSelecionado);
      novaMensagemObj.nomeArquivo = anexoSelecionado.name;
    }

    setMensagens([...mensagens, novaMensagemObj]);
    setNovaMensagem('');
    setAnexoSelecionado(null);

    // Simular resposta do consultor após 2 segundos
    setTimeout(() => {
      const resposta: Mensagem = {
        id: mensagens.length + 2,
        texto: "Recebi sua mensagem. Vou analisar e retorno em breve.",
        remetente: 'consultor',
        timestamp: new Date(),
        lida: false
      };
      setMensagens(prev => [...prev, resposta]);
      setNotificacoes(prev => prev + 1);
    }, 2000);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setAnexoSelecionado(file);
      toast({
        title: "Arquivo selecionado",
        description: `${file.name} foi anexado e está pronto para envio.`
      });
    }
  };

  const selecionarArquivo = (tipo: 'imagem' | 'documento') => {
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute('accept', tipo === 'imagem' ? 'image/*' : '.pdf,.doc,.docx,.txt');
      fileInputRef.current.click();
    }
  };

  const limparNotificacoes = () => {
    setNotificacoes(0);
    setShowNotificacoes(false);
  };

  const formatarData = (data: Date) => {
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    });
  };

  const formatarHora = (data: Date) => {
    return data.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-w1-teal">Comunicação</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => setShowNotificacoes(!showNotificacoes)}
            >
              <Bell className="h-5 w-5" />
              {notificacoes > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {notificacoes}
                </span>
              )}
            </Button>
            {showNotificacoes && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg z-50 border">
                <div className="p-3 border-b flex justify-between items-center">
                  <h3 className="font-medium">Notificações</h3>
                  <Button variant="ghost" size="sm" onClick={limparNotificacoes}>
                    Limpar
                  </Button>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notificacoes > 0 ? (
                    <div className="p-3 border-b hover:bg-gray-50">
                      <p className="text-sm font-medium">Nova mensagem de Ana Beatriz</p>
                      <p className="text-xs text-gray-500">Recebi sua mensagem. Vou analisar e retorno em breve.</p>
                      <p className="text-xs text-gray-400 mt-1">Agora</p>
                    </div>
                  ) : (
                    <div className="p-3 text-center text-gray-500 text-sm">
                      Sem notificações
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Tabs defaultValue="mensagens" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="mensagens" className="flex-1">Mensagens</TabsTrigger>
          <TabsTrigger value="reunioes" className="flex-1">Reuniões</TabsTrigger>
          <TabsTrigger value="documentos" className="flex-1">Documentos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="mensagens">
          <div className="mt-4">
            <Card>
              <div className="grid grid-cols-1 h-[600px]">
                {/* Área de conversa */}
                <div className="flex flex-col h-full">
                  {/* Cabeçalho da conversa */}
                  <div className="p-3 border-b flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={consultor.avatar} alt={consultor.nome} />
                        <AvatarFallback>{consultor.nome.substr(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{consultor.nome}</h3>
                        <p className="text-xs text-muted-foreground">{consultor.cargo}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Calendar className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Agendar reunião com {consultor.nome}</DialogTitle>
                            <DialogDescription>
                              Escolha a data e hora para sua reunião com o consultor
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="py-4">
                            <iframe 
                              src="https://calendly.com/example/30min" 
                              width="100%" 
                              height="600px" 
                              frameBorder="0"
                              title="Calendly"
                            ></iframe>
                          </div>
                          
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button type="button">
                                Fechar
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                  
                  {/* Mensagens */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {mensagens.map((mensagem) => (
                      <div 
                        key={mensagem.id}
                        className={`flex ${
                          mensagem.remetente === 'cliente' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg px-4 py-2 ${
                            mensagem.remetente === 'cliente'
                              ? 'bg-w1-teal text-white rounded-tr-none'
                              : 'bg-gray-100 text-gray-800 rounded-tl-none'
                          }`}
                        >
                          {mensagem.tipo === 'imagem' && (
                            <img 
                              src={mensagem.anexo} 
                              alt="Imagem anexada" 
                              className="mb-2 rounded-md max-w-full" 
                            />
                          )}
                          
                          {mensagem.tipo === 'documento' && (
                            <div className="flex items-center gap-2 mb-2 p-2 bg-white/20 rounded-md">
                              <File className="h-5 w-5" />
                              <span className="text-sm truncate">{mensagem.nomeArquivo}</span>
                            </div>
                          )}
                          
                          <p>{mensagem.texto}</p>
                          <p className="text-xs opacity-70 mt-1 text-right">
                            {formatarHora(mensagem.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Área de digitação */}
                  <div className="p-3 border-t">
                    {anexoSelecionado && (
                      <div className="mb-2 p-2 bg-gray-100 rounded-md flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          {anexoSelecionado.type.startsWith('image/') ? (
                            <Image className="h-4 w-4" />
                          ) : (
                            <File className="h-4 w-4" />
                          )}
                          <span className="text-sm truncate">{anexoSelecionado.name}</span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setAnexoSelecionado(null)}
                        >
                          &times;
                        </Button>
                      </div>
                    )}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        enviarMensagem();
                      }}
                      className="flex gap-2"
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                      <div className="flex gap-1">
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon"
                          onClick={() => selecionarArquivo('imagem')}
                        >
                          <Image className="h-4 w-4" />
                        </Button>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon"
                          onClick={() => selecionarArquivo('documento')}
                        >
                          <Paperclip className="h-4 w-4" />
                        </Button>
                      </div>
                      <Input
                        value={novaMensagem}
                        onChange={(e) => setNovaMensagem(e.target.value)}
                        placeholder="Digite sua mensagem..."
                        className="flex-1"
                      />
                      <Button type="submit">
                        <Send className="h-4 w-4 mr-1" />
                        Enviar
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="reunioes">
          <div className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Próximas Reuniões</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {reunioes.map((reuniao) => (
                  <div key={reuniao.id} className="p-4 border rounded-md">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{reuniao.titulo}</h3>
                        <p className="text-sm text-muted-foreground">
                          Com {consultor.nome} - {consultor.cargo}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {reuniao.data.toLocaleDateString('pt-BR', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long'
                          })}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {reuniao.data.toLocaleTimeString('pt-BR', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })} - {
                            new Date(reuniao.data.getTime() + reuniao.duracao * 60000)
                              .toLocaleTimeString('pt-BR', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })
                          }
                        </p>
                      </div>
                    </div>
                    <Separator className="my-3" />
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" size="sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        Reagendar
                      </Button>
                      <Button size="sm">
                        <Video className="h-4 w-4 mr-1" />
                        Entrar
                      </Button>
                    </div>
                  </div>
                ))}
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <Calendar className="h-4 w-4 mr-1" />
                      Agendar Nova Reunião
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Agendar reunião com {consultor.nome}</DialogTitle>
                      <DialogDescription>
                        Escolha a data e hora para sua reunião com o consultor
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="py-4">
                      <iframe 
                        src="https://calendly.com/example/30min" 
                        width="100%" 
                        height="600px" 
                        frameBorder="0"
                        title="Calendly"
                      ></iframe>
                    </div>
                    
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="button">
                          Fechar
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="documentos">
          <div className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Documentos Compartilhados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  <div className="p-3 border rounded-md flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <File className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">Contrato_Holding_v1.pdf</p>
                        <p className="text-xs text-gray-500">Enviado por Ana Beatriz • 2 dias atrás</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Baixar</Button>
                  </div>
                  
                  <div className="p-3 border rounded-md flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <File className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium">Relatório_Patrimonial_2025.xlsx</p>
                        <p className="text-xs text-gray-500">Enviado por Ana Beatriz • 1 semana atrás</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Baixar</Button>
                  </div>
                </div>
                
                <Button className="w-full" onClick={() => selecionarArquivo('documento')}>
                  Compartilhar Documento
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComunicacaoPage;
