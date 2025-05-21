
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface AdicionarAtivoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdicionar: (ativo: { categoria: string; nome: string; valor: number }) => void;
  categorias: string[];
}

const AdicionarAtivoModal: React.FC<AdicionarAtivoModalProps> = ({
  isOpen,
  onClose,
  onAdicionar,
  categorias
}) => {
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [valor, setValor] = useState("");

  const formatarValorParaExibicao = (valor: string) => {
    // Remove todos os caracteres não numéricos
    const numeroLimpo = valor.replace(/\D/g, "");
    
    // Converte para número e divide por 100 para obter o valor em reais
    const numero = parseInt(numeroLimpo || "0") / 100;
    
    // Formata como moeda
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(numero);
  };

  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Armazena apenas os dígitos
    const numeroLimpo = e.target.value.replace(/\D/g, "");
    
    // Atualiza o valor exibido formatado
    e.target.value = numeroLimpo ? formatarValorParaExibicao(numeroLimpo) : "";
    
    // Armazena o valor limpo no estado
    setValor(numeroLimpo);
  };

  const handleSubmit = () => {
    if (!nome) {
      toast({
        title: "Erro",
        description: "O nome do ativo é obrigatório",
        variant: "destructive",
      });
      return;
    }

    if (!categoria) {
      toast({
        title: "Erro",
        description: "Selecione uma categoria",
        variant: "destructive",
      });
      return;
    }

    if (!valor) {
      toast({
        title: "Erro",
        description: "Informe o valor do ativo",
        variant: "destructive",
      });
      return;
    }

    const valorNumerico = parseInt(valor) / 100;

    onAdicionar({
      nome,
      categoria,
      valor: valorNumerico,
    });

    // Limpar os campos
    setNome("");
    setCategoria("");
    setValor("");

    toast({
      title: "Sucesso",
      description: "Ativo adicionado com sucesso",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-w1-teal">Adicionar Novo Ativo</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome do Ativo</Label>
            <Input 
              id="nome" 
              value={nome} 
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Apartamento São Paulo"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="categoria">Categoria</Label>
            <Select value={categoria} onValueChange={setCategoria}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {categorias.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="valor">Valor</Label>
            <Input 
              id="valor" 
              onChange={handleValorChange}
              placeholder="R$ 0,00"
              value={valor ? formatarValorParaExibicao(valor) : ""}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="mr-2">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} className="bg-w1-mint text-w1-teal hover:bg-w1-mint/80">
            Adicionar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdicionarAtivoModal;
