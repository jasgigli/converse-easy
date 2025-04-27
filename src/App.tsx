
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AuthWrapper from "./components/AuthWrapper";
import Index from "./pages/Index";
import Workspace from "./pages/Workspace";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import UpgradePro from "./pages/UpgradePro";
import { useUser } from "@clerk/clerk-react";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn, isLoaded } = useUser();
  
  if (!isLoaded) return null;
  
  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/workspace" element={
              <ProtectedRoute>
                <Workspace />
              </ProtectedRoute>
            } />
            <Route path="/sign-in/*" element={<AuthWrapper><Index /></AuthWrapper>} />
            <Route path="/sign-up/*" element={<AuthWrapper><Index /></AuthWrapper>} />
            <Route path="/upgrade/pro" element={
              <ProtectedRoute>
                <UpgradePro />
              </ProtectedRoute>
            } />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
