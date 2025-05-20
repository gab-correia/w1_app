
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, BarChart3, Building2, Users, FileText, Target, MessageCircle, Settings } from 'lucide-react';

interface NavigationProps {
  isSidebarOpen: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ isSidebarOpen }) => {
  const navItems = [
    { icon: <Home className="h-5 w-5" />, label: 'Dashboard', path: '/', active: true },
    { icon: <BarChart3 className="h-5 w-5" />, label: 'Meu Patrimônio', path: '/patrimonio' },
    { icon: <Building2 className="h-5 w-5" />, label: 'Holdings', path: '/holdings' },
    { icon: <Users className="h-5 w-5" />, label: 'Sucessório', path: '/sucessorio' },
    { icon: <FileText className="h-5 w-5" />, label: 'Documentos', path: '/documentos' },
    { icon: <Target className="h-5 w-5" />, label: 'Metas', path: '/metas' },
    { icon: <MessageCircle className="h-5 w-5" />, label: 'Comunicação', path: '/comunicacao' },
    { icon: <Settings className="h-5 w-5" />, label: 'Configurações', path: '/configuracoes' },
  ];

  return (
    <nav className={`fixed inset-y-0 left-0 z-10 flex flex-col bg-w1-teal text-white transition-all duration-300 ease-in-out ${
      isSidebarOpen ? 'w-64' : 'w-0 md:w-16'
    } overflow-hidden`}>
      <div className="flex items-center justify-center h-16 border-b border-white/10">
        {isSidebarOpen && (
          <img src="/w1-logo.svg" alt="W1 Logo" className="h-8 animate-fade-in" />
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`w1-nav-item ${item.active ? 'w1-nav-item-active' : 'w1-nav-item-inactive'}`}
              >
                {item.icon}
                {isSidebarOpen && <span className="animate-slide-in">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="p-4 border-t border-white/10">
        {isSidebarOpen ? (
          <div className="flex items-center gap-3 animate-slide-in">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-sm">Conectado</span>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
