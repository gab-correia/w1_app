import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot } from 'lucide-react';

interface ChatMessage {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatBotProps {
  onClose: () => void;
}

const ChatBot = ({ onClose }: ChatBotProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      text: "Olá! Eu sou o Gabriel, seu assistente virtual. Como posso ajudar você hoje?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newUserMessage: ChatMessage = {
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputText("");
    setIsLoading(true);

    // Respostas automáticas para perguntas específicas
    const normalizedInput = inputText.toLowerCase();

    if (normalizedInput.includes('onde posso encontrar')) {
      const botReply: ChatMessage = {
        text: "Olá! Para comprovar a titularidade dos imóveis, você pode acessar o cartório de registro da sua cidade. Acessando esse link voce pode verificar o cartório: https://cartorio.net/",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botReply]);
      setIsLoading(false);  
      return;
    }

    if (normalizedInput.includes('me atualize sobre as notícias') || normalizedInput.includes('me atualize')) {
      const botReply: ChatMessage = {
        text: "Claro! Recentemente, o setor imobiliário brasileiro apresentou uma valorização média de 7,5% ao ano, especialmente em áreas urbanas de médio porte, impulsionada pela demanda por imóveis residenciais e comerciais. Além disso, a regulamentação sobre investimentos internacionais foi flexibilizada com a Resolução CMN nº 5.059/2023, permitindo que investidores locais possam alocar até 50% de seus ativos em fundos no exterior, sem necessidade de autorização prévia do Banco Central.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botReply]);
      setIsLoading(false);
      return;
    }

    // Se não for uma pergunta específica, faz a chamada ao Flowise
    fetch("http://localhost:3001/api/v1/prediction/88f7a3c1-4677-4cc7-94be-964628fd7722", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: inputText }),
    })
      .then((res) => res.json())
      .then((data) => {
        const botReply: ChatMessage = {
          text: data.text || "Desculpe, não consegui entender sua pergunta.",
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botReply]);
      })
      .catch((error) => {
        console.error("Erro ao chamar a API do Flowise:", error);
        setMessages((prev) => [
          ...prev,
          {
            text: "Ocorreu um erro ao se comunicar com a IA. Tente novamente mais tarde.",
            isUser: false,
            timestamp: new Date(),
          },
        ]);
      })
      .finally(() => setIsLoading(false));
};


  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between border-b p-3">
        <div className="flex items-center gap-2">
          <div className="bg-w1-mint/20 p-1.5 rounded-full">
            <Bot className="h-5 w-5 text-w1-teal" />
          </div>
          <h3 className="font-medium">Gabriel - Assistente Virtual</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          Fechar
        </Button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.isUser
                  ? 'bg-w1-teal text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <span
                className={`text-xs mt-1 block ${
                  message.isUser ? 'text-white/70' : 'text-gray-500'
                }`}
              >
                {formatTime(message.timestamp)}
              </span>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg px-4 py-2 text-gray-800 flex items-center">
              <div className="flex space-x-1">
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0ms' }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: '150ms' }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: '300ms' }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border-t p-4">
        <div className="flex gap-2">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Digite sua mensagem..."
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1"
          />
          <Button
            size="icon"
            className="bg-w1-teal hover:bg-w1-teal/90"
            onClick={handleSend}
            disabled={!inputText.trim() || isLoading}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
