// MobileLayout.tsx
import { useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Link, Outlet, useLocation } from 'react-router-dom';
import MobileNavbar from './MobileNavbar';
import Sidebar from './Sidebar';
import ChatBot from '@/components/ChatBot';
import Header from '@/components/layout/Header';

const MobileLayout = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onToggleChat={() => setIsChatOpen(!isChatOpen)}
      />

      {/* Sidebar Sheet */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="p-0 w-72 sm:w-80">
          <Sidebar />
        </SheetContent>
      </Sheet>

      {/* Chat Sheet */}
      <Sheet open={isChatOpen} onOpenChange={setIsChatOpen}>
        <SheetContent side="right" className="p-4 w-full sm:w-[400px]">
          <ChatBot onClose={() => setIsChatOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <main className="flex-1 p-10 pb-4 max-w-8xl md:pb-4 mx-auto w-full">
        <Outlet />
      </main>

      {/* Bottom navigation */}
      <div className="md:hidden">
        <MobileNavbar />
      </div>
    </div>
  );
};

export default MobileLayout;
