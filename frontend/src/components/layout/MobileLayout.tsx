
import { useState } from 'react';
import { Menu, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Link, Outlet, useLocation } from 'react-router-dom';
import MobileNavbar from './MobileNavbar';
import Sidebar from './Sidebar';
import ChatBot from '@/components/ChatBot';

const MobileLayout = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between bg-w1-teal text-white p-3 shadow-md">
        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-w1-teal/80">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72 sm:w-80">
              <Sidebar />
            </SheetContent>
          </Sheet>
          <Link to="/">
            <img src="/w1-logo.svg" alt="W1 Logo" className="h-8" />
          </Link>
        </div>
        
        <Sheet open={isChatOpen} onOpenChange={setIsChatOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white hover:bg-w1-teal/80">
              <MessageCircle className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="p-4 w-full sm:w-[400px]">
            <ChatBot onClose={() => setIsChatOpen(false)} />
          </SheetContent>
        </Sheet>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-4 pb-20 md:pb-4 max-w-6xl mx-auto w-full">
        <Outlet />
      </main>

      {/* Bottom navigation - only visible on mobile */}
      <div className="md:hidden">
        <MobileNavbar />
      </div>
    </div>
  );
};

export default MobileLayout;
