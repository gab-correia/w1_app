
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn, UserRound, Users, UserPlus } from "lucide-react";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Client login state
  const [clientEmail, setClientEmail] = useState("");
  const [clientPassword, setClientPassword] = useState("");
  
  // Consultant login state
  const [consultantEmail, setConsultantEmail] = useState("");
  const [consultantPassword, setConsultantPassword] = useState("");

  // Registration state
  const [showClientRegister, setShowClientRegister] = useState(false);
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const handleClientLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      
      // Simple validation
      if (!clientEmail || !clientPassword) {
        toast({
          variant: "destructive",
          title: "Erro no login",
          description: "Por favor, preencha todos os campos.",
        });
        return;
      }
      
      // Mock successful login - In a real app, this would verify credentials
      localStorage.setItem("userType", "client");
      localStorage.setItem("isLoggedIn", "true");
      
      toast({
        title: "Login bem-sucedido",
        description: "Bem-vindo de volta!",
      });
      
      navigate("/");
    }, 1000);
  };

  const handleConsultantLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      
      // Simple validation
      if (!consultantEmail || !consultantPassword) {
        toast({
          variant: "destructive",
          title: "Erro no login",
          description: "Por favor, preencha todos os campos.",
        });
        return;
      }
      
      // Mock successful login - In a real app, this would verify credentials
      localStorage.setItem("userType", "consultant");
      localStorage.setItem("isLoggedIn", "true");
      
      toast({
        title: "Login bem-sucedido",
        description: "Bem-vindo consultor!",
      });
      
      navigate("/dashboard-consultor");
    }, 1000);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate registration process
    setTimeout(() => {
      setIsLoading(false);
      
      // Simple validation
      if (!registerName || !registerEmail || !registerPassword) {
        toast({
          variant: "destructive",
          title: "Erro no cadastro",
          description: "Por favor, preencha todos os campos.",
        });
        return;
      }
      
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Você pode fazer login agora.",
      });
      
      // Reset form and go back to login
      setShowClientRegister(false);
      setRegisterName("");
      setRegisterEmail("");
      setRegisterPassword("");
    }, 1000);
  };

  const handleRequestAccess = () => {
    toast({
      title: "Solicitação enviada",
      description: "Entraremos em contato em breve para concluir seu acesso.",
    });
  };

  const handleForgotPassword = () => {
    const email = clientEmail || consultantEmail;
    if (!email) {
      toast({
        variant: "destructive",
        title: "Email necessário",
        description: "Por favor, informe seu email para recuperação de senha.",
      });
      return;
    }
    
    toast({
      title: "Email de recuperação enviado",
      description: "Verifique sua caixa de entrada para redefinir sua senha.",
    });
  };
  
  // Show registration form or login form
  if (showClientRegister) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <img src="/w1-logo.svg" alt="W1 Consultoria" className="h-12 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-w1-teal">W1 Consultoria Patrimonial</h1>
            <p className="text-gray-600">Crie sua conta para acessar nossos serviços</p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Cadastro de Cliente</CardTitle>
              <CardDescription>
                Preencha o formulário abaixo para criar sua conta.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleRegister}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-name">Nome completo</Label>
                  <Input 
                    id="register-name"
                    type="text"
                    placeholder="Seu nome completo"
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input 
                    id="register-email"
                    type="email"
                    placeholder="seu.email@exemplo.com"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    autoComplete="email"
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Senha</Label>
                  <div className="relative">
                    <Input 
                      id="register-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Crie uma senha segura"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      disabled={isLoading}
                    />
                    <Button 
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-4">
                <Button type="submit" className="w-full bg-w1-teal hover:bg-w1-teal/90" disabled={isLoading}>
                  {isLoading ? (
                    <span className="flex items-center gap-2">Processando...</span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <UserPlus className="h-4 w-4" />
                      Finalizar cadastro
                    </span>
                  )}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => setShowClientRegister(false)}
                  disabled={isLoading}
                >
                  Voltar ao login
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    );
  }

  // Regular login screen
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/w1-logo.svg" alt="W1 Consultoria" className="h-12 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-w1-teal">W1 Consultoria Patrimonial</h1>
          <p className="text-gray-600">Faça login para acessar sua conta</p>
        </div>

        <Tabs defaultValue="client" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="client" className="flex items-center gap-2">
              <UserRound className="h-4 w-4" />
              <span>Cliente</span>
            </TabsTrigger>
            <TabsTrigger value="consultant" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Consultor</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="client">
            <Card>
              <CardHeader>
                <CardTitle>Login de Cliente</CardTitle>
                <CardDescription>
                  Acesse sua área exclusiva para gerenciar seus ativos e holdings.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleClientLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="client-email">Email</Label>
                    <Input 
                      id="client-email"
                      type="email"
                      placeholder="seu.email@exemplo.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      autoComplete="email"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client-password">Senha</Label>
                    <div className="relative">
                      <Input 
                        id="client-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Sua senha"
                        value={clientPassword}
                        onChange={(e) => setClientPassword(e.target.value)}
                        autoComplete="current-password"
                        disabled={isLoading}
                      />
                      <Button 
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex-col gap-4">
                  <Button type="submit" className="w-full bg-w1-teal hover:bg-w1-teal/90" disabled={isLoading}>
                    {isLoading ? (
                      <span className="flex items-center gap-2">Entrando...</span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <LogIn className="h-4 w-4" />
                        Entrar
                      </span>
                    )}
                  </Button>
                  <div className="flex items-center justify-between w-full text-sm">
                    <Button 
                      type="button" 
                      variant="link" 
                      size="sm" 
                      className="p-0 h-auto text-w1-teal" 
                      onClick={handleForgotPassword}
                    >
                      Esqueceu sua senha?
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-1"
                      onClick={() => setShowClientRegister(true)}
                    >
                      <UserPlus className="h-4 w-4" />
                      Cadastrar
                    </Button>
                  </div>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="consultant">
            <Card>
              <CardHeader>
                <CardTitle>Login de Consultor</CardTitle>
                <CardDescription>
                  Acesse para gerenciar seus clientes e documentações.
                </CardDescription>
                <Badge className="bg-w1-teal hover:bg-w1-teal/90 mt-2">Acesso Profissional</Badge>
              </CardHeader>
              <form onSubmit={handleConsultantLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="consultant-email">Email</Label>
                    <Input 
                      id="consultant-email"
                      type="email"
                      placeholder="consultor@w1consultoria.com.br"
                      value={consultantEmail}
                      onChange={(e) => setConsultantEmail(e.target.value)}
                      autoComplete="email"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="consultant-password">Senha</Label>
                    <div className="relative">
                      <Input 
                        id="consultant-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Sua senha"
                        value={consultantPassword}
                        onChange={(e) => setConsultantPassword(e.target.value)}
                        autoComplete="current-password"
                        disabled={isLoading}
                      />
                      <Button 
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex-col gap-4">
                  <Button type="submit" className="w-full bg-w1-teal hover:bg-w1-teal/90" disabled={isLoading}>
                    {isLoading ? (
                      <span className="flex items-center gap-2">Entrando...</span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <LogIn className="h-4 w-4" />
                        Entrar como Consultor
                      </span>
                    )}
                  </Button>
                  <div className="flex items-center justify-between w-full text-sm">
                    <Button 
                      type="button" 
                      variant="link" 
                      size="sm" 
                      className="p-0 h-auto text-w1-teal" 
                      onClick={handleForgotPassword}
                    >
                      Esqueceu sua senha?
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-1 border-w1-teal text-w1-teal hover:bg-w1-mint/10"
                      onClick={handleRequestAccess}
                    >
                      <UserPlus className="h-4 w-4" />
                      Solicitar acesso
                    </Button>
                  </div>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LoginPage;
