
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import AdicionarAtivoModal from "@/components/patrimonio/AdicionarAtivoModal";

const PatrimonioPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patrimonioTotal, setPatrimonioTotal] = useState(12500000);
  
  const [categorias, setCategorias] = useState([
    { nome: "Imóveis", valor: 7500000, porcentagem: 60 },
    { nome: "Investimentos", valor: 3000000, porcentagem: 24 },
    { nome: "Empresas", valor: 1500000, porcentagem: 12 },
    { nome: "Outros Ativos", valor: 500000, porcentagem: 4 },
  ]);
  
  const formatarValor = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(valor);
  };

  const handleAdicionarAtivo = (novoAtivo: {
    categoria: string;
    nome: string;
    valor: number;
  }) => {
    // Encontrar a categoria correspondente
    const categoriaIndex = categorias.findIndex(cat => cat.nome === novoAtivo.categoria);
    
    if (categoriaIndex >= 0) {
      // Atualizar o valor da categoria
      const novasCategorias = [...categorias];
      novasCategorias[categoriaIndex].valor += novoAtivo.valor;
      
      // Calcular o novo total
      const novoTotal = novasCategorias.reduce((total, cat) => total + cat.valor, 0);
      
      // Atualizar as porcentagens
      novasCategorias.forEach(cat => {
        cat.porcentagem = Math.round((cat.valor / novoTotal) * 100);
      });
      
      // Atualizar o estado
      setPatrimonioTotal(novoTotal);
      setCategorias(novasCategorias);
    }
    
    // Fechar o modal
    setIsModalOpen(false);
  };

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
                  {categoria.porcentagem}%
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
