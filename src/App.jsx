import { Routes, Route } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import { PlanProvider } from './contexts/PlanContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Questionnaire from './pages/Questionnaire';
import Results from './pages/Results';
import Plans from './pages/Plans';
import PlanDetail from './pages/PlanDetail';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

const App = () => {
  return (
    <AuthProvider>
      <PlanProvider>
        <div className="min-h-screen bg-background text-foreground page-transition">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/questionnaire" element={<Questionnaire />} />
              <Route path="/results" element={<Results />} />
              <Route path="/plans" element={<Plans />} />
              <Route path="/plan/:planId" element={<PlanDetail />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster />
        <Sonner />
      </PlanProvider>
    </AuthProvider>
  );
};

export default App;