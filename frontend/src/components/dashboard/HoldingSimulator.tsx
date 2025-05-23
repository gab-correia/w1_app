import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useLocalStorage from "@/hooks/useLocalStorage";
import { useNavigate } from 'react-router-dom'

interface HoldingSimulatorProps {
    mode: "home" | "simulador";
    onUpdateResults?: () => void;
  }

const HoldingSimulator:React.FC<HoldingSimulatorProps> = ({ mode, onUpdateResults}) => {
    const navigate = useNavigate();
    const [holdingType, setHoldingType] = useLocalStorage("holdingType", "llc");
    const [taxRegime, setTaxRegime] = useLocalStorage("taxRegime", "actual");
    const [assetsValue, setAssetsValue] = useLocalStorage("assetsValue", 5000000);
    const [familyMembers, setFamilyMembers] = useLocalStorage("familyMembers", 3);

  // Cálculos
  const calculateTaxSavings = () => {
    const baseRate = holdingType === "llc" ? 0.18 : 0.22;
    const taxRegimeMultiplier = taxRegime === "actual" ? 1 : 0.85;
    return assetsValue * baseRate * taxRegimeMultiplier * 0.25;
  };

  const calculateSuccessionEfficiency = () => {
    const baseEfficiency = holdingType === "llc" ? 82 : 76;
    return baseEfficiency - (familyMembers > 3 ? (familyMembers - 3) * 2 : 0);
  };

  // Salva os resultados calculados no localStorage ao clicar
  const handleSaveResults = () => {
  localStorage.setItem(
    "simulationResults",
    JSON.stringify({
      taxSavings: calculateTaxSavings(),
      successionEfficiency: calculateSuccessionEfficiency()
    })
  );
    console.log('Navegar')
    navigate('/simulador'); 
  };


  const handleSaveResultsSimulador = () => {
    localStorage.setItem(
      "simulationResults",
      JSON.stringify({
        taxSavings: calculateTaxSavings(),
        successionEfficiency: calculateSuccessionEfficiency()
      })
    );

    if (onUpdateResults) {
        onUpdateResults();
      }
  };

  return (
    <div className="space-y-6">
      <Card className="w-full  mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-display text-w1-petroleum">
            Simulador de Estrutura de Holding
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
        
          <Tabs defaultValue="structure" className="w-full">
            <TabsContent value="structure" className="space-y-4 pt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Tipo de Holding</label>
                <Select value={holdingType} onValueChange={setHoldingType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de holding" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="llc">Sociedade Limitada (LTDA)</SelectItem>
                    <SelectItem value="corporation">Sociedade Anônima (S.A.)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Regime Tributário</label>
                <Select value={taxRegime} onValueChange={setTaxRegime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o regime tributário" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="actual">Lucro Real</SelectItem>
                    <SelectItem value="presumed">Lucro Presumido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Valor Total dos Ativos</label>
                  <span className="text-sm">R${assetsValue.toLocaleString()}</span>
                </div>
                <Slider
                  defaultValue={[assetsValue]}
                  max={10000000}
                  step={100000}
                  onValueChange={value => setAssetsValue(value[0])}
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>R$1M</span>
                  <span>R$10M</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Membros da Família</label>
                  <span className="text-sm">{familyMembers}</span>
                </div>
                <Slider
                  defaultValue={[familyMembers]}
                  max={10}
                  min={1}
                  step={1}
                  onValueChange={value => setFamilyMembers(value[0])}
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>1</span>
                  <span>10</span>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="taxation" className="pt-4">
              <div className="text-sm text-gray-600 italic">
                Ajuste os parâmetros da estrutura para visualizar os benefícios fiscais potenciais.
              </div>
            </TabsContent>
            <TabsContent value="succession" className="pt-4">
              <div className="text-sm text-gray-600 italic">
                Ajuste os parâmetros da estrutura para visualizar os benefícios sucessórios potenciais.
              </div>
            </TabsContent>
                
          </Tabs>
          
          {mode === "home" ? (
            <div className="flex justify-center items-center">
                <Button
                    className="text-white"
                    onClick={handleSaveResults}>
                    Acessar simulação
                </Button>
            </div>
                ) : (
                <div className="flex justify-end ">
                    <Button
                        className="text-white"
                        onClick={handleSaveResultsSimulador}>
                        Atualizar resultados
                    </Button>
                </div>
            )}
        </CardContent>
      </Card> 
    </div>
  );
};

export default HoldingSimulator;
