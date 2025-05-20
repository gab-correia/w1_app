
import { Home, Briefcase, Wallet } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const MobileNavbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 bg-white border-t shadow-lg">
      <div className="flex justify-around items-center h-16 px-2">
        <NavItem
          icon={<Wallet className="w-6 h-6" />}
          label="Patrimônio"
          to="/patrimonio"
          isActive={isActive('/patrimonio')}
        />
        <NavItem
          icon={<Home className="w-6 h-6" />}
          label="Home"
          to="/"
          isActive={isActive('/')}
        />
        <NavItem
          icon={<Briefcase className="w-6 h-6" />}
          label="Holdings"
          to="/holdings"
          isActive={isActive('/holdings')}
        />
      </div>
    </nav>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  isActive: boolean;
}

const NavItem = ({ icon, label, to, isActive }: NavItemProps) => {
  return (
    <Link
      to={to}
      className={`flex flex-col items-center justify-center px-3 py-1 rounded-lg transition-colors ${
        isActive ? 'text-w1-teal font-medium' : 'text-gray-500'
      }`}
    >
      <div className={`mb-1 ${isActive ? 'text-w1-teal' : 'text-gray-500'}`}>
        {icon}
      </div>
      <span className="text-xs">{label}</span>
    </Link>
  );
};

export default MobileNavbar;
