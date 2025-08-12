import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { SidebarProvider } from "./context/SidebarContext";
import { AuthContextProvider } from "./context/AuthContext";

import { AppLayout } from "./guards/AppLayout"; // Un nuevo layout para la UI autenticada

import { AuthGuard } from "./guards/AuthGuard";
import { RoleGuard } from "./guards/RoleGuard";

import { NotFound } from "./pages/NotFound";
import { LoginPage } from "./pages/Login";
import { AccountPage } from "./pages/Account";
import { ReportsPage } from "./pages/Reports";
import { RegisterPage } from "./pages/Register";
import { TemplatesPage } from "./pages/Templates";
import { DashboardPage } from "./pages/Dashboard";
import { LandingPage } from "./pages/Landing";

const client = new QueryClient();

export function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <AuthContextProvider>
          <SidebarProvider>
            <ToastContainer />
            <Routes>
              <Route element={<AuthGuard isPrivate={false} />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </Route>
              <Route element={<AuthGuard isPrivate={true} />}>
                <Route element={<AppLayout />}>
                  <Route path="/reports" element={<ReportsPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/my-account" element={<AccountPage />} />
                  <Route element={<RoleGuard />}>
                    <Route path="/templates" element={<TemplatesPage />} />
                  </Route>
                </Route>
              </Route>
              <Route path="/" element={<LandingPage />} />
              <Route path="*" element={<NotFound path="/" title="Home" />} />
            </Routes>
          </SidebarProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
