import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import AdicionarAtivoModal from "@/components/patrimonio/AdicionarAtivoModal";

interface Categoria {
  nome: string;
  valor: number;
  porcentagem: number;
}

const CATEGORIAS_PADRAO = ["Imóveis", "Ações", "Outros"];

const PatrimonioPage = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { clienteId } = useParams<{ clienteId: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patrimonioTotal, setPatrimonioTotal] = useState(0);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatrimonios = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(
          `${API_URL}/api/patrimonios?clienteId=${clienteId}`,
          { headers: { 'Authorization': `Bearer ${token}` } }
        );
        
        if (!response.ok) throw new Error('Erro ao carregar dados');
        
        const ativos = await response.json();
        const { total, categoriasProcessadas } = processarDados(ativos);
        
        setPatrimonioTotal(total);
        setCategorias(categoriasProcessadas);
      } catch (error) {
        console.error('Erro:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatrimonios();
  }, [clienteId]);

  const processarDados = (ativos: any[]) => {
    const categoriasMap = new Map<string, number>();
    let total = 0;

    ativos.forEach((ativo) => {
      const nome = formatarCategoria(ativo.categoria);
      const valor = parseFloat(ativo.valor);
      categoriasMap.set(nome, (categoriasMap.get(nome) || 0) + valor);
      total += valor;
    });

    const categoriasProcessadas = CATEGORIAS_PADRAO.map(nome => ({
      nome,
      valor: categoriasMap.get(nome) || 0,
      porcentagem: total > 0 ? ((categoriasMap.get(nome) || 0) / total) * 100 : 0
    }));

    return { total, categoriasProcessadas };
  };

  const formatarCategoria = (categoria: string) => {
    const lower = categoria.toLowerCase();
    if (lower.includes('imóve') || lower.includes('imove')) return 'Imóveis';
    if (lower.includes('ação') || lower.includes('acoes')) return 'Ações';
    return 'Outros';
  };

  const handleAdicionarAtivo = async (novoAtivo: {
    categoria: string;
    nome: string;
    valor: number;
  }) => {
    const token = localStorage.getItem('token');
    const categoriaFormatada = formatarCategoria(novoAtivo.categoria);
    const novoValor = novoAtivo.valor;

    // Estado anterior para rollback
    const estadoAnterior = {
      categorias: [...categorias],
      total: patrimonioTotal
    };

    // Atualização otimista
    setCategorias(prev => {
      const novasCategorias = prev.map(cat => 
        cat.nome === categoriaFormatada 
          ? { ...cat, valor: cat.valor + novoValor }
          : cat
      );
      
      const novoTotal = patrimonioTotal + novoValor;
      setPatrimonioTotal(novoTotal);
      
      return novasCategorias.map(cat => ({
        ...cat,
        porcentagem: (cat.valor / novoTotal) * 100
      }));
    });

    try {
      await fetch(`${API_URL}/api/patrimonios`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...novoAtivo,
          clienteId,
          categoria: novoAtivo.categoria.toLowerCase()
        })
      });
    } catch (error) {
      console.error('Erro:', error);
      // Rollback em caso de erro
      setCategorias(estadoAnterior.categorias);
      setPatrimonioTotal(estadoAnterior.total);
    } finally {
      setIsModalOpen(false);
    }
  };

  const formatarValor = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(valor);
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
        categorias={CATEGORIAS_PADRAO}
      />
    </div>
  );
};

export default PatrimonioPage;
