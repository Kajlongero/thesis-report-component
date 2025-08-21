import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { SidebarProvider } from "./context/SidebarContext";
import { AuthContextProvider } from "./context/AuthContext";
import { PlaceholdersProvider } from "./context/PlaceholdersContext";

import { AppLayout } from "./guards/AppLayout";

import { AuthGuard } from "./guards/AuthGuard";
import { RoleGuard } from "./guards/RoleGuard";

import { NotFound } from "./pages/NotFound";
import { LoginPage } from "./pages/Login";
import { LogoutPage } from "./pages/Logout";
import { AccountPage } from "./pages/Account";
import { LandingPage } from "./pages/Landing";
import { ReportsPage } from "./pages/Reports";
import { RegisterPage } from "./pages/Register";
import { TemplatesPage } from "./pages/Templates";
import { DashboardPage } from "./pages/Dashboard";
import { CreateTemplatePage } from "./pages/CreateTemplate";
import { UpdateTemplatePage } from "./pages/UpdateTemplate";
import { QuillProvider } from "./context/QuillContext";

const client = new QueryClient();

export function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <AuthContextProvider>
          <PlaceholdersProvider>
            <SidebarProvider>
              <ToastContainer />
              <QuillProvider>
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
                      <Route path="/logout" element={<LogoutPage />} />
                      <Route element={<RoleGuard />}>
                        <Route path="/templates" element={<TemplatesPage />} />
                        <Route
                          path="/templates/create"
                          element={<CreateTemplatePage />}
                        />
                        <Route
                          path="/templates/:id"
                          element={<UpdateTemplatePage />}
                        />
                      </Route>
                    </Route>
                  </Route>
                  <Route path="/" element={<LandingPage />} />
                  <Route
                    path="*"
                    element={<NotFound path="/" title="Home" />}
                  />
                </Routes>
              </QuillProvider>
            </SidebarProvider>
          </PlaceholdersProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
