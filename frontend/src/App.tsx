
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MobileLayout from "./components/layout/MobileLayout";
import PatrimonioPage from "./pages/PatrimonioPage";
import HoldingsPage from "./pages/HoldingsPage";
import CriarHoldingPage from "./pages/CriarHoldingPage";
import HoldingDetalhesPage from "./pages/HoldingDetalhesPage";
import DocumentScannerPage from "./pages/DocumentScannerPage";
import SucessorioPage from "./pages/SucessorioPage";
import DocumentosPage from "./pages/DocumentosPage";
import DocumentosConsultorPage from "./pages/DocumentosConsultorPage";
import ClientesPage from "./pages/ClientesPage";
import MetasPage from "./pages/MetasPage";
import ComunicacaoPage from "./pages/ComunicacaoPage";
import ConfiguracoesPage from "./pages/ConfiguracoesPage";
import LoginPage from "./pages/LoginPage";
import DashboardConsultorPage from "./pages/DashboardConsultorPage";
import AdicionarDocumentoPage from "./pages/AdicionarDocumentoPage";

const queryClient = new QueryClient();

// Simple auth check component
type ProtectedRouteProps = {
  element: React.ReactNode;
  allowedUserType?: "client" | "consultant" | "both";
};

const ProtectedRoute = ({ element, allowedUserType = "both" }: ProtectedRouteProps) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userType = localStorage.getItem("userType");
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  if (
    allowedUserType !== "both" && 
    userType !== allowedUserType
  ) {
    // Redirect clients to home and consultants to their dashboard
    if (userType === "client") {
      return <Navigate to="/" replace />;
    } else {
      return <Navigate to="/dashboard-consultor" replace />;
    }
  }
  
  return <>{element}</>;
};

const App = () => {
  const [checking, setChecking] = useState(true);
  
  useEffect(() => {
    // Check if the user is logged in
    setTimeout(() => setChecking(false), 500); // Simulating a check
  }, []);
  
  if (checking) {
    return <div className="h-screen flex items-center justify-center">Carregando...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public route for login */}
            <Route path="/login" element={<LoginPage />} />
            
            {/* Protected routes inside layout */}
            <Route element={<MobileLayout />}>
              {/* Client routes */}
              <Route path="/" element={<ProtectedRoute element={<Index />} allowedUserType="client" />} />
              <Route path="/patrimonio" element={<ProtectedRoute element={<PatrimonioPage />} allowedUserType="client" />} />
              <Route path="/holdings" element={<ProtectedRoute element={<HoldingsPage />} allowedUserType="client" />} />
              <Route path="/holdings/criar" element={<ProtectedRoute element={<CriarHoldingPage />} allowedUserType="client" />} />
              <Route path="/holdings/:id" element={<ProtectedRoute element={<HoldingDetalhesPage />} allowedUserType="client" />} />
              <Route path="/sucessorio" element={<ProtectedRoute element={<SucessorioPage />} allowedUserType="client" />} />
              <Route path="/documentos" element={<ProtectedRoute element={<DocumentosPage />} allowedUserType="client" />} />
              <Route path="/metas" element={<ProtectedRoute element={<MetasPage />} allowedUserType="client" />} />
              <Route path="/comunicacao" element={<ProtectedRoute element={<ComunicacaoPage />} allowedUserType="client" />} />
              <Route path="/configuracoes" element={<ProtectedRoute element={<ConfiguracoesPage />} allowedUserType="client" />} />
              
              {/* Consultant routes */}
              <Route path="/dashboard-consultor" element={<ProtectedRoute element={<DashboardConsultorPage />} allowedUserType="consultant" />} />
              <Route path="/clientes" element={<ProtectedRoute element={<ClientesPage />} allowedUserType="consultant" />} />
              <Route path="/documentos-consultor" element={<ProtectedRoute element={<DocumentosConsultorPage />} allowedUserType="consultant" />} />
              <Route path="/adicionar-documento" element={<ProtectedRoute element={<AdicionarDocumentoPage />} allowedUserType="consultant" />} />
              
              {/* Shared routes */}
              <Route path="/document-scanner" element={<ProtectedRoute element={<DocumentScannerPage />} />} />
              
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
