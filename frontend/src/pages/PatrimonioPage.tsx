import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import AdicionarAtivoModal from "@/components/patrimonio/AdicionarAtivoModal";

interface Categoria {
  nome: string;
  valor: number;
  porcentagem: number;
}

const PatrimonioPage = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patrimonioTotal, setPatrimonioTotal] = useState(0);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);

  // Função para decodificar o token JWT
  const decodeToken = (token: string) => {
    try {
      const payloadBase64 = token.split('.')[1];
      const decodedPayload = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(decodedPayload);
    } catch (error) {
      console.error('Erro ao decodificar token:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchPatrimonios = async () => {
      const token = localStorage.getItem('token');
      
      try {
        const response = await fetch(`${API_URL}/api/patrimonios`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!response.ok) throw new Error('Erro ao carregar dados');
        
        const ativos = await response.json();
        
        const categoriasMap = new Map<string, number>();
        let total = 0;

        ativos.forEach((ativo: { categoria: string; valor: string }) => {
          const nome = formatarNomeCategoria(ativo.categoria);
          const valor = parseFloat(ativo.valor);
          
          categoriasMap.set(nome, (categoriasMap.get(nome) || 0) + valor);
          total += valor;
        });

        const categoriasProcessadas = Array.from(categoriasMap).map(([nome, valor]) => ({
          nome,
          valor,
          porcentagem: (valor / total) * 100
        }));

        setPatrimonioTotal(total);
        setCategorias(categoriasProcessadas);
        
      } catch (error) {
        console.error('Erro:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatrimonios();
  }, []);

  const formatarNomeCategoria = (categoria: string) => {
    return categoria
      .toLowerCase()
      .split(' ')
      .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
      .join(' ')
      .replace('Imoveis', 'Imóveis');
  };

  const formatarValor = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(valor);
  };

  const handleAdicionarAtivo = async (novoAtivo: {
    categoria: string;
    nome: string;
    valor: number;
  }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token de autenticação não encontrado');

      // Decodifica o token para obter o ID do cliente
      const decodedToken = decodeToken(token);
      const clienteId = decodedToken?.sub; // Ajuste conforme estrutura do seu token

      if (!clienteId) throw new Error('ID do cliente não encontrado no token');

      await fetch(`${API_URL}/api/patrimonios`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...novoAtivo,
          categoria: novoAtivo.categoria.toLowerCase(),
          clienteId // ID do cliente incluído no payload
        })
      });

      // Atualização otimista do estado
      setCategorias(prev => {
        const novasCategorias = [...prev];
        const categoriaExistente = novasCategorias.find(c => c.nome === novoAtivo.categoria);
        
        if (categoriaExistente) {
          categoriaExistente.valor += novoAtivo.valor;
          const novoTotal = novasCategorias.reduce((acc, cat) => acc + cat.valor, 0);
          setPatrimonioTotal(novoTotal);
          
          novasCategorias.forEach(cat => {
            cat.porcentagem = (cat.valor / novoTotal) * 100;
          });
        }
        
        return novasCategorias;
      });

    } catch (error) {
      console.error('Erro ao adicionar ativo:', error);
    } finally {
      setIsModalOpen(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Carregando dados patrimoniais...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-w1-teal">Meu Patrimônio</h1>
        <Button 
          size="sm" 
          className="bg-w1-mint text-w1-teal hover:bg-w1-mint/80"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircle className="mr-1 h-4 w-4" />
          Adicionar Ativo
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Patrimônio Total</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-w1-teal">
            {formatarValor(patrimonioTotal)}
          </p>
        </CardContent>
      </Card>

      <h2 className="text-xl font-semibold mt-6">Distribuição por Categoria</h2>

      <div className="space-y-4">
        {categorias.map((categoria) => (
          <Card key={categoria.nome}>
            <CardContent className="pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{categoria.nome}</span>
                <span className="text-sm text-muted-foreground">
                  {categoria.porcentagem.toFixed(1)}%
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-w1-mint rounded-full"
                  style={{ width: `${categoria.porcentagem}%` }}
                />
              </div>
              <p className="mt-2 text-lg font-semibold">
                {formatarValor(categoria.valor)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <AdicionarAtivoModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onAdicionar={handleAdicionarAtivo}
        categorias={categorias.map(cat => cat.nome)}
      />
    </div>
  );
};

export default PatrimonioPage;
