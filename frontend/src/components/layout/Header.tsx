
import React, { useState } from 'react';
import { Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="sticky top-0 z-20 bg-white border-b py-3 px-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="hidden md:block">
          <img src="/w1-logo.svg" alt="W1 Logo" className="h-8" />
        </div>
      </div>

      <div className="flex-1 flex justify-center max-w-md mx-4">
        {showSearch ? (
          <div className="w-full animate-fade-in">
            <Input
              placeholder="Pesquisar..."
              className="w-full"
              autoFocus
              onBlur={() => setShowSearch(false)}
            />
          </div>
        ) : (
          <div className="md:flex items-center hidden">
            <h1 className="text-lg font-medium text-w1-teal">Dashboard</h1>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowSearch(!showSearch)}
        >
          <Search className="h-5 w-5" />
        </Button>
        <Avatar className="h-9 w-9">
          <AvatarImage src="/profile-placeholder.jpg" alt="Usuário" />
          <AvatarFallback className="bg-w1-mint text-w1-teal">JP</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
