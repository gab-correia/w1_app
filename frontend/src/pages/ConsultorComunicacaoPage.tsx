
import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
  Bell, 
  Search
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription,
  DialogTrigger,
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

interface Cliente {
  id: number;
  nome: string;
  avatar: string;
  ultimaMensagem: {
    texto: string;
    timestamp: Date;
    lida: boolean;
    remetente?: 'cliente' | 'consultor';
  };
  mensagens: Mensagem[];
  reunioes: Reuniao[];
}

interface Reuniao {
  id: number;
  titulo: string;
  data: Date;
  duracao: number; // em minutos
  clienteId: number;
}

const ConsultorComunicacaoPage = () => {
  const [clientes, setClientes] = useState<Cliente[]>([
    {
      id: 1,
      nome: "João Paulo",
      avatar: "/profile-placeholder.jpg",
      ultimaMensagem: {
        texto: "Perfeito! Está agendado para quinta-feira às 15h.",
        timestamp: new Date(Date.now() - 86400000),
        lida: true,
        remetente: 'cliente'
      },
      mensagens: [
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
      ],
      reunioes: [
        {
          id: 1,
          titulo: "Revisão do Planejamento Patrimonial",
          data: new Date(2025, 4, 18, 15, 0),
          duracao: 60,
          clienteId: 1
        }
      ]
    },
    {
      id: 2,
      nome: "Maria Silva",
      avatar: "/profile-placeholder.jpg",
      ultimaMensagem: {
        texto: "Obrigada por enviar o relatório anual.",
        timestamp: new Date(Date.now() - 86400000 * 2),
        lida: true,
        remetente: 'cliente'
      },
      mensagens: [
        {
          id: 1,
          texto: "Bom dia, gostaria de solicitar o relatório anual da minha holding.",
          remetente: 'cliente',
          timestamp: new Date(Date.now() - 86400000 * 3),
          lida: true
        },
        {
          id: 2,
          texto: "Olá Maria, segue em anexo o relatório anual da sua holding.",
          remetente: 'consultor',
          timestamp: new Date(Date.now() - 86400000 * 3 + 3600000),
          lida: true,
          tipo: 'documento',
          nomeArquivo: "Relatório_Anual_2025.pdf"
        },
        {
          id: 3,
          texto: "Obrigada por enviar o relatório anual.",
          remetente: 'cliente',
          timestamp: new Date(Date.now() - 86400000 * 2),
          lida: true
        }
      ],
      reunioes: []
    },
    {
      id: 3,
      nome: "Pedro Oliveira",
      avatar: "/profile-placeholder.jpg",
      ultimaMensagem: {
        texto: "Aguardo seu feedback.",
        timestamp: new Date(Date.now() - 3600000 * 5),
        lida: false,
        remetente: 'cliente'
      },
      mensagens: [
        {
          id: 1,
          texto: "Olá, estou interessado em iniciar o processo de criação de uma holding patrimonial.",
          remetente: 'cliente',
          timestamp: new Date(Date.now() - 86400000),
          lida: true
        },
        {
          id: 2,
          texto: "Olá Pedro, vou preparar uma proposta com as melhores opções para seu perfil.",
          remetente: 'consultor',
          timestamp: new Date(Date.now() - 86400000 + 3600000),
          lida: true
        },
        {
          id: 3,
          texto: "Aguardo seu feedback.",
          remetente: 'cliente',
          timestamp: new Date(Date.now() - 3600000 * 5),
          lida: false
        }
      ],
      reunioes: [
        {
          id: 2,
          titulo: "Apresentação de Proposta",
          data: new Date(2025, 4, 20, 10, 0),
          duracao: 45,
          clienteId: 3
        }
      ]
    }
  ]);

  const [clienteAtivo, setClienteAtivo] = useState<Cliente | null>(clientes[0]);
  const [novaMensagem, setNovaMensagem] = useState('');
  const [pesquisaCliente, setPesquisaCliente] = useState('');
  const [notificacoes, setNotificacoes] = useState(1);
  const [showNotificacoes, setShowNotificacoes] = useState(false);
  const [anexoSelecionado, setAnexoSelecionado] = useState<File | null>(null);
  const [visualizandoReunioes, setVisualizandoReunioes] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const clientesFiltrados = pesquisaCliente 
    ? clientes.filter(cliente => 
        cliente.nome.toLowerCase().includes(pesquisaCliente.toLowerCase())
      )
    : clientes;

  const todasReunioes = clientes.flatMap(cliente => 
    cliente.reunioes.map(reuniao => ({
      ...reuniao,
      cliente: cliente.nome
    }))
  ).sort((a, b) => a.data.getTime() - b.data.getTime());

  const enviarMensagem = () => {
    if (!novaMensagem.trim() && !anexoSelecionado || !clienteAtivo) return;

    const novaMensagemObj: Mensagem = {
      id: clienteAtivo.mensagens.length + 1,
      texto: novaMensagem || (anexoSelecionado ? `Enviou um ${anexoSelecionado.type.startsWith('image/') ? 'imagem' : 'documento'}` : ''),
      remetente: 'consultor',
      timestamp: new Date(),
      lida: true
    };

    if (anexoSelecionado) {
      novaMensagemObj.tipo = anexoSelecionado.type.startsWith('image/') ? 'imagem' : 'documento';
      novaMensagemObj.anexo = URL.createObjectURL(anexoSelecionado);
      novaMensagemObj.nomeArquivo = anexoSelecionado.name;
    }

    const clientesAtualizados = clientes.map(cliente => {
      if (cliente.id === clienteAtivo.id) {
        return {
          ...cliente,
          mensagens: [...cliente.mensagens, novaMensagemObj],
          ultimaMensagem: {
            texto: novaMensagem || (anexoSelecionado ? `Enviou um ${anexoSelecionado.type.startsWith('image/') ? 'imagem' : 'documento'}` : ''),
            timestamp: new Date(),
            lida: true,
            remetente: 'consultor'
          }
        };
      }
      return cliente;
    });

    setClientes(clientesAtualizados);
    
    // Atualize o cliente ativo
    const novoClienteAtivo = clientesAtualizados.find(
      cliente => cliente.id === clienteAtivo.id
    );
    
    if (novoClienteAtivo) {
      setClienteAtivo(novoClienteAtivo);
    }
    
    setNovaMensagem('');
    setAnexoSelecionado(null);
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
        <h1 className="text-2xl font-bold text-w1-teal">Comunicação com Clientes</h1>
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
                      <p className="text-sm font-medium">Nova mensagem de Pedro Oliveira</p>
                      <p className="text-xs text-gray-500">Aguardo seu feedback.</p>
                      <p className="text-xs text-gray-400 mt-1">5 horas atrás</p>
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
          
          <Button 
            variant={visualizandoReunioes ? "default" : "outline"} 
            onClick={() => setVisualizandoReunioes(!visualizandoReunioes)}
          >
            <Calendar className="h-4 w-4 mr-1" />
            Reuniões
          </Button>
        </div>
      </div>

      {visualizandoReunioes ? (
        <Card>
          <CardContent className="p-4">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Próximas Reuniões</h2>
              <p className="text-muted-foreground text-sm">Agenda de reuniões com clientes</p>
            </div>
            
            <div className="space-y-4">
              {todasReunioes.length > 0 ? (
                todasReunioes.map((reuniao) => (
                  <div key={reuniao.id} className="p-4 border rounded-md">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{reuniao.titulo}</h3>
                        <p className="text-sm text-muted-foreground">
                          Cliente: {reuniao.cliente}
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
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    Não há reuniões agendadas
                  </p>
                </div>
              )}
            </div>
            
            <Button className="mt-4" onClick={() => setVisualizandoReunioes(false)}>
              Voltar para mensagens
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-3 h-[600px]">
            {/* Lista de clientes */}
            <div className="col-span-1 border-r overflow-y-auto">
              <div className="p-3 border-b">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Buscar cliente..." 
                    value={pesquisaCliente}
                    onChange={(e) => setPesquisaCliente(e.target.value)}
                    className="pl-8 h-9" 
                  />
                </div>
              </div>
              <div className="divide-y">
                {clientesFiltrados.map((cliente) => (
                  <div 
                    key={cliente.id}
                    className={`p-3 hover:bg-muted/50 cursor-pointer ${
                      clienteAtivo?.id === cliente.id ? 'bg-muted/50' : ''
                    }`}
                    onClick={() => setClienteAtivo(cliente)}
                  >
                    <div className="flex gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={cliente.avatar} alt={cliente.nome} />
                        <AvatarFallback>{cliente.nome.substr(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium truncate">{cliente.nome}</h3>
                          <span className="text-xs text-muted-foreground">
                            {formatarData(cliente.ultimaMensagem.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {cliente.ultimaMensagem.texto}
                        </p>
                        {!cliente.ultimaMensagem.lida && cliente.ultimaMensagem.remetente === 'cliente' && (
                          <span className="inline-block w-2 h-2 bg-w1-teal rounded-full mt-1"></span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Área de conversa */}
            <div className="col-span-2 flex flex-col h-full">
              {clienteAtivo ? (
                <>
                  {/* Cabeçalho da conversa */}
                  <div className="p-3 border-b flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={clienteAtivo.avatar} alt={clienteAtivo.nome} />
                        <AvatarFallback>{clienteAtivo.nome.substr(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{clienteAtivo.nome}</h3>
                        <p className="text-xs text-muted-foreground">Cliente desde 2023</p>
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
                            <DialogTitle>Agendar reunião com {clienteAtivo.nome}</DialogTitle>
                            <DialogDescription>
                              Escolha a data e hora para sua reunião com o cliente
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
                            <Button type="button" onClick={() => document.dispatchEvent(new CustomEvent('close-dialog'))}>
                              Fechar
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                  
                  {/* Mensagens */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {clienteAtivo.mensagens.map((mensagem) => (
                      <div 
                        key={mensagem.id}
                        className={`flex ${
                          mensagem.remetente === 'consultor' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg px-4 py-2 ${
                            mensagem.remetente === 'consultor'
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
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground">
                    Selecione um cliente para começar
                  </p>
                </div>
              )}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ConsultorComunicacaoPage;
