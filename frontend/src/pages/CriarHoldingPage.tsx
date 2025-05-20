import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const CriarHoldingPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nome: "",
    tipo: "limitada",
    objetivo: "",
    socios: [],
    bens: [],
  });

  const handleNext = () => {
    if (step === 1 && !formData.nome) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, preencha o nome da holding",
        variant: "destructive",
      });
      return;
    }

    if (step < 5) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    } else {
      toast({
        title: "Holding criada com sucesso!",
        description: "Você será redirecionado para a página de holdings",
      });
      setTimeout(() => navigate("/holdings"), 2000);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    } else {
      navigate("/holdings");
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepDadosBasicos formData={formData} setFormData={setFormData} />;
      case 2:
        return <StepObjetivos formData={formData} setFormData={setFormData} />;
      case 3:
        return <StepSocios formData={formData} setFormData={setFormData} />;
      case 4:
        return <StepBens formData={formData} setFormData={setFormData} />;
      case 5:
        return <StepRevisao formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 pb-10">
      <div>
        <Button
          variant="ghost"
          onClick={() => navigate("/holdings")}
          className="mb-2 pl-0"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Voltar para Holdings
        </Button>
        <h1 className="text-2xl font-bold text-w1-teal">Criar Nova Holding</h1>
      </div>

      <Progress value={(step / 5) * 100} className="h-2" />

      <div className="flex justify-between text-sm text-muted-foreground">
        <span className={step >= 1 ? "font-medium text-w1-teal" : ""}>Dados Básicos</span>
        <span className={step >= 2 ? "font-medium text-w1-teal" : ""}>Objetivos</span>
        <span className={step >= 3 ? "font-medium text-w1-teal" : ""}>Sócios</span>
        <span className={step >= 4 ? "font-medium text-w1-teal" : ""}>Bens</span>
        <span className={step >= 5 ? "font-medium text-w1-teal" : ""}>Revisão</span>
      </div>

      <Card className="mt-6">
        {renderStep()}
      </Card>

      <div className="flex gap-3 justify-between">
        <Button variant="outline" onClick={handleBack}>
          {step === 1 ? "Cancelar" : "Voltar"}
        </Button>
        <Button onClick={handleNext}>
          {step === 5 ? "Finalizar" : "Continuar"}
          {step !== 5 && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

interface StepProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const StepDadosBasicos = ({ formData, setFormData }: StepProps) => {
  return (
    <>
      <CardHeader>
        <CardTitle>Dados Básicos da Holding</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="nome">Nome da Holding</Label>
          <Input
            id="nome"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            placeholder="Ex: Família Silva Holdings"
          />
        </div>
        
        <div className="space-y-2">
          <Label>Tipo de Holding</Label>
          <RadioGroup
            value={formData.tipo}
            onValueChange={(value) => setFormData({ ...formData, tipo: value })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="limitada" id="limitada" />
              <Label htmlFor="limitada">Limitada (LTDA)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sa" id="sa" />
              <Label htmlFor="sa">Sociedade Anônima (S.A.)</Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </>
  );
};

const StepObjetivos = ({ formData, setFormData }: StepProps) => {
  return (
    <>
      <CardHeader>
        <CardTitle>Objetivos da Holding</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Selecione os principais objetivos da sua holding familiar:
        </p>
        
        <div className="space-y-2">
          <div className="flex items-start gap-3 p-3 border rounded-md cursor-pointer hover:bg-muted/50 transition-colors">
            <input 
              type="checkbox" 
              id="obj1"
              className="mt-1"
              checked={formData.objetivo === "sucessao"}
              onChange={() => setFormData({ ...formData, objetivo: "sucessao" })}
            />
            <div>
              <Label htmlFor="obj1" className="font-medium cursor-pointer">Planejamento Sucessório</Label>
              <p className="text-sm text-muted-foreground">
                Facilitar a sucessão familiar e transmissão de patrimônio, evitando conflitos e reduzindo custos.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 border rounded-md cursor-pointer hover:bg-muted/50 transition-colors">
            <input 
              type="checkbox" 
              id="obj2" 
              className="mt-1"
              checked={formData.objetivo === "tributario"}
              onChange={() => setFormData({ ...formData, objetivo: "tributario" })}
            />
            <div>
              <Label htmlFor="obj2" className="font-medium cursor-pointer">Planejamento Tributário</Label>
              <p className="text-sm text-muted-foreground">
                Otimizar a carga tributária sobre o patrimônio e rendimentos da família.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 border rounded-md cursor-pointer hover:bg-muted/50 transition-colors">
            <input 
              type="checkbox" 
              id="obj3" 
              className="mt-1"
              checked={formData.objetivo === "protecao"}
              onChange={() => setFormData({ ...formData, objetivo: "protecao" })}
            />
            <div>
              <Label htmlFor="obj3" className="font-medium cursor-pointer">Proteção Patrimonial</Label>
              <p className="text-sm text-muted-foreground">
                Blindar o patrimônio familiar contra riscos de negócios e pessoais.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </>
  );
};

const StepSocios = ({ formData, setFormData }: StepProps) => {
  const [nome, setNome] = useState("");
  const [percentual, setPercentual] = useState("");
  
  const adicionarSocio = () => {
    if (nome && percentual) {
      setFormData({
        ...formData,
        socios: [...(formData.socios || []), { nome, percentual }],
      });
      setNome("");
      setPercentual("");
    }
  };

  const removerSocio = (index: number) => {
    const novosSocios = [...formData.socios];
    novosSocios.splice(index, 1);
    setFormData({ ...formData, socios: novosSocios });
  };

  return (
    <>
      <CardHeader>
        <CardTitle>Sócios da Holding</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-3">
              <Label htmlFor="nomeSocio">Nome do Sócio</Label>
              <Input
                id="nomeSocio"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Nome completo"
              />
            </div>
            <div className="col-span-1">
              <Label htmlFor="percentual">Percentual (%)</Label>
              <Input
                id="percentual"
                value={percentual}
                onChange={(e) => setPercentual(e.target.value)}
                placeholder="Ex: 25"
              />
            </div>
            <div className="flex items-end">
              <Button onClick={adicionarSocio} className="w-full" variant="outline">
                Adicionar
              </Button>
            </div>
          </div>
        </div>

        {formData.socios && formData.socios.length > 0 ? (
          <div className="space-y-2">
            <Label>Sócios adicionados</Label>
            <div className="space-y-2">
              {formData.socios.map((socio: any, index: number) => (
                <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-md">
                  <div>
                    <p className="font-medium">{socio.nome}</p>
                    <p className="text-sm text-muted-foreground">{socio.percentual}%</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removerSocio(index)}
                    className="text-destructive h-8"
                  >
                    Remover
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-4">
            Nenhum sócio adicionado ainda.
          </p>
        )}
      </CardContent>
    </>
  );
};

const StepBens = ({ formData, setFormData }: StepProps) => {
  const [tipo, setTipo] = useState("imovel");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  
  const adicionarBem = () => {
    if (descricao && valor) {
      setFormData({
        ...formData,
        bens: [...(formData.bens || []), { tipo, descricao, valor }],
      });
      setDescricao("");
      setValor("");
    }
  };

  const removerBem = (index: number) => {
    const novosBens = [...formData.bens];
    novosBens.splice(index, 1);
    setFormData({ ...formData, bens: novosBens });
  };

  return (
    <>
      <CardHeader>
        <CardTitle>Bens a Serem Integralizados</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="tipoBem">Tipo de Bem</Label>
            <select
              id="tipoBem"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="imovel">Imóvel</option>
              <option value="veiculo">Veículo</option>
              <option value="investimento">Investimento</option>
              <option value="participacao">Participação Societária</option>
              <option value="outro">Outro</option>
            </select>
          </div>
          
          <div>
            <Label htmlFor="descricaoBem">Descrição</Label>
            <Input
              id="descricaoBem"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Ex: Apartamento na Rua X"
            />
          </div>
          
          <div>
            <Label htmlFor="valorBem">Valor Estimado (R$)</Label>
            <Input
              id="valorBem"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              placeholder="Ex: 500000"
            />
          </div>
          
          <Button onClick={adicionarBem} className="w-full">
            Adicionar Bem
          </Button>
        </div>

        {formData.bens && formData.bens.length > 0 ? (
          <div className="space-y-2">
            <Label>Bens adicionados</Label>
            <div className="space-y-2">
              {formData.bens.map((bem: any, index: number) => (
                <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-md">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="capitalize">
                        {bem.tipo}
                      </Badge>
                      <p className="font-medium">{bem.descricao}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      R$ {parseFloat(bem.valor).toLocaleString('pt-BR')}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removerBem(index)}
                    className="text-destructive h-8"
                  >
                    Remover
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-4">
            Nenhum bem adicionado ainda.
          </p>
        )}
      </CardContent>
    </>
  );
};

const StepRevisao = ({ formData }: { formData: any }) => {
  const getTipoObjetivo = (objetivo: string) => {
    switch (objetivo) {
      case "sucessao": return "Planejamento Sucessório";
      case "tributario": return "Planejamento Tributário";
      case "protecao": return "Proteção Patrimonial";
      default: return objetivo;
    }
  };
  
  const calcularValorTotal = () => {
    if (!formData.bens || formData.bens.length === 0) return 0;
    return formData.bens.reduce((total: number, bem: any) => {
      return total + parseFloat(bem.valor || 0);
    }, 0);
  };

  return (
    <>
      <CardHeader>
        <CardTitle>Revisão de Dados</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-medium text-sm text-muted-foreground">Dados Básicos</h3>
          <div className="mt-2 space-y-2">
            <div className="flex justify-between">
              <span>Nome:</span>
              <span className="font-medium">{formData.nome}</span>
            </div>
            <div className="flex justify-between">
              <span>Tipo:</span>
              <span className="font-medium">
                {formData.tipo === "limitada" ? "Limitada (LTDA)" : "Sociedade Anônima (S.A.)"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Objetivo Principal:</span>
              <span className="font-medium">{getTipoObjetivo(formData.objetivo)}</span>
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="font-medium text-sm text-muted-foreground">Sócios</h3>
          <div className="mt-2 space-y-2">
            {formData.socios && formData.socios.length > 0 ? (
              formData.socios.map((socio: any, index: number) => (
                <div key={index} className="flex justify-between">
                  <span>{socio.nome}</span>
                  <span className="font-medium">{socio.percentual}%</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">Nenhum sócio adicionado</p>
            )}
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="font-medium text-sm text-muted-foreground">Bens a Integralizar</h3>
          <div className="mt-2 space-y-2">
            {formData.bens && formData.bens.length > 0 ? (
              <>
                {formData.bens.map((bem: any, index: number) => (
                  <div key={index} className="flex justify-between">
                    <span>{bem.descricao}</span>
                    <span className="font-medium">
                      R$ {parseFloat(bem.valor).toLocaleString('pt-BR')}
                    </span>
                  </div>
                ))}
                <div className="pt-2 mt-2 border-t flex justify-between">
                  <span>Valor Total:</span>
                  <span className="font-bold text-w1-teal">
                    R$ {calcularValorTotal().toLocaleString('pt-BR')}
                  </span>
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">Nenhum bem adicionado</p>
            )}
          </div>
        </div>
        
        <div className="bg-muted p-4 rounded-md flex gap-3 items-center">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
          <p className="text-sm">
            Ao finalizar, os dados serão enviados para análise e um de nossos consultores entrará em contato para prosseguir com a abertura da holding.
          </p>
        </div>
      </CardContent>
    </>
  );
};

export default CriarHoldingPage;
