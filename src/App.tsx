import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import CandidatesPage from "./pages/CandidatesPage";
import EmployersPage from "./pages/EmployersPage";
import JobsPage from "./pages/JobsPage";
import SchoolsPage from "./pages/SchoolsPage";
import ResourcesPage from "./pages/ResourcesPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import CandidateDashboard from "./pages/CandidateDashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import InstitutionDashboard from "./pages/InstitutionDashboard";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import PathfinderPage from "./pages/PathfinderPage";
import BadgesPage from "./pages/BadgesPage";
import CandidateOnboarding from "./pages/onboarding/CandidateOnboarding";
import EmployerOnboarding from "./pages/onboarding/EmployerOnboarding";
import InstitutionOnboarding from "./pages/onboarding/InstitutionOnboarding";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public */}
            <Route path="/" element={<Index />} />
            <Route path="/candidates" element={<CandidatesPage />} />
            <Route path="/employers" element={<EmployersPage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/schools" element={<SchoolsPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/pathfinder" element={<PathfinderPage />} />
            <Route path="/badges" element={<BadgesPage />} />

            {/* Auth */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />

            {/* Onboarding */}
            <Route path="/onboarding/candidate" element={
              <ProtectedRoute allowedRoles={['candidate']}>
                <CandidateOnboarding />
              </ProtectedRoute>
            } />
            <Route path="/onboarding/employer" element={
              <ProtectedRoute allowedRoles={['employer']}>
                <EmployerOnboarding />
              </ProtectedRoute>
            } />
            <Route path="/onboarding/institution" element={
              <ProtectedRoute allowedRoles={['institution']}>
                <InstitutionOnboarding />
              </ProtectedRoute>
            } />

            {/* Dashboards */}
            <Route path="/dashboard/candidate/*" element={
              <ProtectedRoute allowedRoles={['candidate']}>
                <CandidateDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/employer/*" element={
              <ProtectedRoute allowedRoles={['employer']}>
                <EmployerDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/institution/*" element={
              <ProtectedRoute allowedRoles={['institution']}>
                <InstitutionDashboard />
              </ProtectedRoute>
            } />
            <Route path="/candidate-dashboard/*" element={<CandidateDashboard />} />
            <Route path="/employer-dashboard/*" element={<EmployerDashboard />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
