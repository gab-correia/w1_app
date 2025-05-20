
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

const SucessorioPage = () => {
  const [showSimulatorDialog, setShowSimulatorDialog] = useState(false);
  const [showConsultDialog, setShowConsultDialog] = useState(false);
  
  const handleInitiatePlanning = () => {
    toast({
      title: "Processo iniciado",
      description: "O planejamento sucessório foi iniciado com sucesso!",
    });
  };
  
  const handleStartTestament = () => {
    toast({
      title: "Processo iniciado",
      description: "O processo de testamento foi iniciado.",
    });
  };
  
  const handleCheckInsurance = () => {
    toast({
      title: "Verificando",
      description: "Análise do seguro de vida em andamento.",
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-w1-teal">Planejamento Sucessório</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Planejamento de Herança e Sucessão</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            O planejamento sucessório é essencial para garantir a transmissão segura e eficiente do seu patrimônio, de acordo com seus desejos e com menor carga tributária.
          </p>
          
          <div className="mt-6 space-y-4">
            <Button className="w-full" onClick={handleInitiatePlanning}>
              Iniciar Planejamento Sucessório
            </Button>
            <Button variant="outline" className="w-full" onClick={() => setShowConsultDialog(true)}>
              Agendar Consulta com Especialista
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Testamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Status</span>
              <span className="text-red-500 font-medium">Não iniciado</span>
            </div>
            <Button variant="outline" className="w-full mt-4" onClick={handleStartTestament}>
              Iniciar
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Seguro de Vida</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Status</span>
              <span className="text-amber-500 font-medium">Em análise</span>
            </div>
            <Button variant="outline" className="w-full mt-4" onClick={handleCheckInsurance}>
              Conferir
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Simulador de Cenários Sucessórios</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Compare diferentes cenários de sucessão e entenda o impacto fiscal e patrimonial de cada um.
          </p>
          <Button className="w-full" onClick={() => setShowSimulatorDialog(true)}>
            Acessar Simulador
          </Button>
        </CardContent>
      </Card>
      
      {/* Simulator Dialog */}
      <Dialog open={showSimulatorDialog} onOpenChange={setShowSimulatorDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Simulador de Cenários Sucessórios</DialogTitle>
            <DialogDescription>
              Visualize e compare diferentes estratégias para a transferência de seu patrimônio.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Cenário 1: Herança Direta</h3>
                <p className="text-sm text-gray-600">Imposto estimado: 15-20% do patrimônio</p>
                <p className="text-sm text-gray-600">Tempo estimado: 2-3 anos para inventário</p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Cenário 2: Holding Familiar</h3>
                <p className="text-sm text-gray-600">Imposto estimado: 4-8% do patrimônio</p>
                <p className="text-sm text-gray-600">Tempo estimado: Imediato (sem inventário)</p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Cenário 3: Doação em vida</h3>
                <p className="text-sm text-gray-600">Imposto estimado: 2-4% do patrimônio</p>
                <p className="text-sm text-gray-600">Tempo estimado: Imediato</p>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSimulatorDialog(false)}>
              Fechar
            </Button>
            <Button onClick={() => {
              toast({
                title: "Simulação agendada",
                description: "Um consultor entrará em contato para detalhar os cenários."
              });
              setShowSimulatorDialog(false);
            }}>
              Agendar simulação detalhada
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Consultant Dialog */}
      <Dialog open={showConsultDialog} onOpenChange={setShowConsultDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Agendar Consulta Especializada</DialogTitle>
            <DialogDescription>
              Escolha uma data e horário para conversar com um especialista em planejamento sucessório.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="justify-start">
                Hoje, 14:00
              </Button>
              <Button variant="outline" className="justify-start">
                Hoje, 16:30
              </Button>
              <Button variant="outline" className="justify-start">
                Amanhã, 10:00
              </Button>
              <Button variant="outline" className="justify-start">
                Amanhã, 15:00
              </Button>
              <Button variant="outline" className="justify-start">
                Sexta, 11:00
              </Button>
              <Button variant="outline" className="justify-start">
                Sexta, 14:30
              </Button>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConsultDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={() => {
              toast({
                title: "Consulta agendada",
                description: "Consulta agendada com sucesso!"
              });
              setShowConsultDialog(false);
            }}>
              Confirmar Agendamento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SucessorioPage;
