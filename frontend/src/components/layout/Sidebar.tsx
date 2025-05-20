
import { LogOut, Home, Briefcase, Wallet, FileText, Target, MessageCircle, Settings, Users, Upload, BarChart3, FilePlus, UserPlus } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType");
  const isConsultant = userType === "consultant";
  
  // Client menu items
  const clientMenuItems = [
    { icon: <Home className="h-5 w-5" />, label: 'Dashboard', path: '/' },
    { icon: <Wallet className="h-5 w-5" />, label: 'Meu Patrimônio', path: '/patrimonio' },
    { icon: <Briefcase className="h-5 w-5" />, label: 'Holdings', path: '/holdings' },
    { icon: <Users className="h-5 w-5" />, label: 'Sucessório', path: '/sucessorio' },
    { icon: <FileText className="h-5 w-5" />, label: 'Documentos', path: '/documentos' },
    { icon: <Target className="h-5 w-5" />, label: 'Metas', path: '/metas' },
    { icon: <MessageCircle className="h-5 w-5" />, label: 'Comunicação', path: '/comunicacao' },
    { icon: <Settings className="h-5 w-5" />, label: 'Configurações', path: '/configuracoes' },
  ];
  
  // Consultant menu items
  const consultantMenuItems = [
    { icon: <Home className="h-5 w-5" />, label: 'Dashboard', path: '/dashboard-consultor' },
    { icon: <Users className="h-5 w-5" />, label: 'Clientes', path: '/clientes' },
    { icon: <FileText className="h-5 w-5" />, label: 'Documentos', path: '/documentos-consultor' },
    { icon: <FilePlus className="h-5 w-5" />, label: 'Adicionar Doc', path: '/adicionar-documento' },
    { icon: <Upload className="h-5 w-5" />, label: 'Digitalizar', path: '/document-scanner' },
    { icon: <BarChart3 className="h-5 w-5" />, label: 'Relatórios', path: '/relatorios' },
    { icon: <Settings className="h-5 w-5" />, label: 'Configurações', path: '/configuracoes' },
  ];
  
  const menuItems = isConsultant ? consultantMenuItems : clientMenuItems;

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userType");
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/profile-placeholder.jpg" alt="Foto do perfil" />
            <AvatarFallback className="bg-w1-mint text-w1-teal">
              {isConsultant ? "CN" : "JP"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-gray-900">
              {isConsultant ? "Consultor W1" : "João Paulo"}
            </span>
            <span className="text-xs text-gray-500">
              {isConsultant ? "Especialista financeiro" : "Cliente desde 2023"}
            </span>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-w1-teal text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t">
        <Button 
          variant="outline" 
          className="w-full flex items-center gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-300" 
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          <span>Sair</span>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
