
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MoreVertical, Phone, Video, Calendar, Paperclip, Send } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface Mensagem {
  id: number;
  texto: string;
  remetente: 'cliente' | 'consultor';
  timestamp: Date;
  lida: boolean;
}

interface Conversa {
  id: number;
  consultor: {
    nome: string;
    avatar: string;
    cargo: string;
  };
  ultimaMensagem: {
    texto: string;
    timestamp: Date;
    lida: boolean;
  };
  mensagens: Mensagem[];
}

const ComunicacaoPage = () => {
  const [conversas, setConversas] = useState<Conversa[]>([
    {
      id: 1,
      consultor: {
        nome: "Ana Beatriz",
        avatar: "/profile-placeholder.jpg",
        cargo: "Consultora Patrimonial"
      },
      ultimaMensagem: {
        texto: "Os documentos para a constituição da holding foram enviados. Poderia confirmar o recebimento?",
        timestamp: new Date(Date.now() - 3600000),
        lida: false
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
      ]
    },
    {
      id: 2,
      consultor: {
        nome: "Ricardo Mendes",
        avatar: "/profile-placeholder.jpg",
        cargo: "Especialista em Holdings"
      },
      ultimaMensagem: {
        texto: "Analisei a documentação e tenho algumas recomendações. Quando puder, vamos agendar uma call.",
        timestamp: new Date(Date.now() - 86400000),
        lida: true
      },
      mensagens: [
        {
          id: 1,
          texto: "Boa tarde, Ricardo. Tenho algumas dúvidas sobre a estrutura da holding.",
          remetente: 'cliente',
          timestamp: new Date(Date.now() - 86400000 * 3),
          lida: true
        },
        {
          id: 2,
          texto: "Analisei a documentação e tenho algumas recomendações. Quando puder, vamos agendar uma call.",
          remetente: 'consultor',
          timestamp: new Date(Date.now() - 86400000),
          lida: true
        }
      ]
    }
  ]);

  const [conversaAtiva, setConversaAtiva] = useState<Conversa | null>(conversas[0]);
  const [novaMensagem, setNovaMensagem] = useState('');

  const enviarMensagem = () => {
    if (!novaMensagem.trim() || !conversaAtiva) return;

    const novaMensagemObj: Mensagem = {
      id: conversaAtiva.mensagens.length + 1,
      texto: novaMensagem,
      remetente: 'cliente',
      timestamp: new Date(),
      lida: true
    };

    const conversasAtualizadas = conversas.map(conversa => {
      if (conversa.id === conversaAtiva.id) {
        return {
          ...conversa,
          mensagens: [...conversa.mensagens, novaMensagemObj],
          ultimaMensagem: {
            texto: novaMensagem,
            timestamp: new Date(),
            lida: true
          }
        };
      }
      return conversa;
    });

    setConversas(conversasAtualizadas);
    
    // Atualize a conversa ativa
    const novaConversaAtiva = conversasAtualizadas.find(
      conversa => conversa.id === conversaAtiva.id
    );
    if (novaConversaAtiva) {
      setConversaAtiva(novaConversaAtiva);
    }
    
    setNovaMensagem('');
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
      <h1 className="text-2xl font-bold text-w1-teal">Comunicação</h1>

      <Tabs defaultValue="mensagens" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="mensagens" className="flex-1">Mensagens</TabsTrigger>
          <TabsTrigger value="reunioes" className="flex-1">Reuniões</TabsTrigger>
          <TabsTrigger value="documentos" className="flex-1">Documentos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="mensagens">
          <div className="mt-4">
            <Card>
              <div className="grid grid-cols-1 md:grid-cols-3 h-[600px]">
                {/* Lista de conversas */}
                <div className="col-span-1 border-r overflow-y-auto">
                  <div className="p-3 border-b">
                    <Input placeholder="Pesquisar conversas..." className="h-9" />
                  </div>
                  <div className="divide-y">
                    {conversas.map((conversa) => (
                      <div 
                        key={conversa.id}
                        className={`p-3 hover:bg-muted/50 cursor-pointer ${
                          conversaAtiva?.id === conversa.id ? 'bg-muted/50' : ''
                        }`}
                        onClick={() => setConversaAtiva(conversa)}
                      >
                        <div className="flex gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={conversa.consultor.avatar} alt={conversa.consultor.nome} />
                            <AvatarFallback>{conversa.consultor.nome.substr(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center">
                              <h3 className="font-medium truncate">{conversa.consultor.nome}</h3>
                              <span className="text-xs text-muted-foreground">
                                {formatarData(conversa.ultimaMensagem.timestamp)}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">
                              {conversa.ultimaMensagem.texto}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Área de conversa */}
                <div className="col-span-2 flex flex-col h-full">
                  {conversaAtiva ? (
                    <>
                      {/* Cabeçalho da conversa */}
                      <div className="p-3 border-b flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={conversaAtiva.consultor.avatar} alt={conversaAtiva.consultor.nome} />
                            <AvatarFallback>{conversaAtiva.consultor.nome.substr(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{conversaAtiva.consultor.nome}</h3>
                            <p className="text-xs text-muted-foreground">{conversaAtiva.consultor.cargo}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Video className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Calendar className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* Mensagens */}
                      <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {conversaAtiva.mensagens.map((mensagem) => (
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
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            enviarMensagem();
                          }}
                          className="flex gap-2"
                        >
                          <Button type="button" variant="ghost" size="icon">
                            <Paperclip className="h-4 w-4" />
                          </Button>
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
                        Selecione uma conversa para começar
                      </p>
                    </div>
                  )}
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
                <div className="p-4 border rounded-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Revisão do Planejamento Patrimonial</h3>
                      <p className="text-sm text-muted-foreground">Com Ana Beatriz - Consultora Patrimonial</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">Quinta, 18 Maio</p>
                      <p className="text-sm text-muted-foreground">15:00 - 16:00</p>
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
                
                <Button className="w-full">
                  <Calendar className="h-4 w-4 mr-1" />
                  Agendar Nova Reunião
                </Button>
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
                <p className="text-center text-muted-foreground py-4">
                  Nenhum documento foi compartilhado recentemente.
                </p>
                <Button className="w-full">Compartilhar Documento</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComunicacaoPage;
