
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLoginPage from "./pages/AdminLoginPage";
import NotFound from "./pages/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";
import CategoriesPage from "./pages/CategoriesPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import AdminCustomersPage from "./pages/AdminCustomersPage";
import AdminSettingsPage from "./pages/AdminSettingsPage";
import AdminHomepageEditorPage from "./pages/AdminHomepageEditorPage";
import AuthPage from "./pages/AuthPage";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/categories/:category" element={<CategoriesPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin" element={
                <ProtectedAdminRoute>
                  <AdminDashboard />
                </ProtectedAdminRoute>
              } />
              <Route path="/admin/orders" element={
                <ProtectedAdminRoute>
                  <AdminOrdersPage />
                </ProtectedAdminRoute>
              } />
              <Route path="/admin/customers" element={
                <ProtectedAdminRoute>
                  <AdminCustomersPage />
                </ProtectedAdminRoute>
              } />
              <Route path="/admin/settings" element={
                <ProtectedAdminRoute>
                  <AdminSettingsPage />
                </ProtectedAdminRoute>
              } />
              <Route path="/admin/homepage" element={
                <ProtectedAdminRoute>
                  <AdminHomepageEditorPage />
                </ProtectedAdminRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
