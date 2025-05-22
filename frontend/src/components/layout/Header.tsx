import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Bell, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onToggleSidebar: () => void;
  onToggleChat: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, onToggleChat }) => {
  const [notificacoes, setNotificacoes] = useState(1);
  const [showNotificacoes, setShowNotificacoes] = useState(false);

  // Ref para o dropdown de notificações
  const notificacoesRef = useRef<HTMLDivElement>(null);

  // Hook para fechar o dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        notificacoesRef.current &&
        !notificacoesRef.current.contains(event.target as Node)
      ) {
        setShowNotificacoes(false);
      }
    }
    if (showNotificacoes) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotificacoes]);

  const limparNotificacoes = () => {
    setNotificacoes(0);
    setShowNotificacoes(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-w1-teal text-white p-3 shadow-md flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="text-white hover:bg-w1-teal/80"
        >
          <Menu className="h-6 w-6" />
        </Button>
        <Link to="/">
          <img src="/W1_White.png" alt="W1 Logo" className="h-8" />
        </Link>
      </div>

      <div className="flex items-center gap-2">
        {/* Bell com Dropdown */}
        <div className="relative" ref={notificacoesRef}>
          <Button
            variant="ghost"
            size="icon"
            className="relative text-white hover:bg-w1-teal/80"
            onClick={() => setShowNotificacoes((v) => !v)}
          >
            <Bell className="h-5 w-5" />
            {notificacoes > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {notificacoes}
              </span>
            )}
          </Button>
          {showNotificacoes && (
            <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-lg shadow-lg z-50 border text-gray-900">
              <div className="p-3 border-b flex justify-between items-center">
                <h3 className="font-medium">Notificações</h3>
                <Button variant="ghost" size="sm" onClick={limparNotificacoes}>
                  Limpar
                </Button>
              </div>
              <div className="max-h-72 overflow-y-auto">
                {notificacoes > 0 ? (
                  <div className="p-3 border-b hover:bg-gray-50">
                    <p className="text-sm font-medium">Nova mensagem de Pedro Oliveira</p>
                    <p className="text-xs text-gray-500">Aguardo seu feedback.</p>
                    <p className="text-xs text-gray-400 mt-1">5 horas atrás</p>
                  </div>
                ) : (
                  <div className="p-3 text-center text-gray-500 text-sm">
                    Sem notificações
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Chat */}
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-w1-teal/80"
          onClick={onToggleChat}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
