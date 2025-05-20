
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, ChevronRight, LockKeyhole, UserCircle2, Shield } from "lucide-react";

const ConfiguracoesPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-w1-teal">Configurações</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCircle2 className="h-5 w-5" /> Perfil
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center justify-center py-4">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src="/profile-placeholder.jpg" alt="Foto do perfil" />
                <AvatarFallback className="text-2xl bg-w1-mint text-w1-teal">JP</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm">Alterar foto</Button>
            </div>
            
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="nome">Nome completo</Label>
                <Input id="nome" defaultValue="João Paulo Silva" />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="joao.paulo@email.com" />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input id="telefone" type="tel" defaultValue="(11) 98765-4321" />
              </div>
              
              <Button>Salvar alterações</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LockKeyhole className="h-5 w-5" /> Segurança
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between py-2">
              <div>
                <h3 className="font-medium">Alterar senha</h3>
                <p className="text-sm text-muted-foreground">Atualize sua senha de acesso</p>
              </div>
              <Button variant="ghost">
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            
            <Separator className="my-3" />
            
            <div className="flex items-center justify-between py-2">
              <div>
                <h3 className="font-medium">Verificação em duas etapas</h3>
                <p className="text-sm text-muted-foreground">Adicione uma camada extra de segurança</p>
              </div>
              <Switch />
            </div>
            
            <Separator className="my-3" />
            
            <div className="flex items-center justify-between py-2">
              <div>
                <h3 className="font-medium">Sessões ativas</h3>
                <p className="text-sm text-muted-foreground">Gerencie seus dispositivos conectados</p>
              </div>
              <Button variant="ghost">
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" /> Notificações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-sm text-muted-foreground">Receber notificações por email</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Push</h3>
                  <p className="text-sm text-muted-foreground">Receber notificações no aplicativo</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">SMS</h3>
                  <p className="text-sm text-muted-foreground">Receber notificações por SMS</p>
                </div>
                <Switch />
              </div>
              
              <Separator className="my-2" />
              
              <div className="pt-2">
                <h3 className="font-medium mb-3">Notificar sobre:</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notif-docs">Documentos</Label>
                    <Switch id="notif-docs" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notif-mensagens">Mensagens</Label>
                    <Switch id="notif-mensagens" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notif-reunioes">Reuniões</Label>
                    <Switch id="notif-reunioes" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notif-holding">Atualizações de Holding</Label>
                    <Switch id="notif-holding" defaultChecked />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" /> Privacidade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Termos de Uso</h3>
                  <p className="text-sm text-muted-foreground">Leia os termos de uso da plataforma</p>
                </div>
                <Button variant="link">Ver</Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Política de Privacidade</h3>
                  <p className="text-sm text-muted-foreground">Como tratamos seus dados</p>
                </div>
                <Button variant="link">Ver</Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Excluir conta</h3>
                  <p className="text-sm text-muted-foreground">Remover sua conta permanentemente</p>
                </div>
                <Button variant="outline" className="text-destructive">
                  Excluir
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConfiguracoesPage;
