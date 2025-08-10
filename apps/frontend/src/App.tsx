import { useContext } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { SidebarProvider } from "./context/SidebarContext";
import { AuthContextProvider } from "./context/AuthContext";
import { AuthContext, SidebarContext } from "./context";

import { LoginPage } from "./pages/Login";
import { AccountPage } from "./pages/Account";
import { ReportsPage } from "./pages/Reports";
import { RegisterPage } from "./pages/Register";
import { DashboardPage } from "./pages/Dashboard";

import { Loader } from "./components/Loaders/ScreenLoader";
import { AppSideBar } from "./components/AppSideBar";
import { DashboardHeader } from "./components/Dashboard/DashboardHeader";
import { TemplatesPage } from "./pages/Templates";
import { NotFound } from "./pages/NotFound";
import { RoleGuard } from "./guards/RoleGuard";

const client = new QueryClient();

function AuthenticatedLayout() {
  const { open } = useContext(SidebarContext);

  return (
    <>
      <AppSideBar />
      <div
        className={`flex flex-col transition-all duration-300 ${
          open ? "ml-64" : "ml-16"
        }`}
      >
        <DashboardHeader />
        <main className="flex-1 p-6">
          <Routes>
            <Route element={<RoleGuard />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/templates" element={<TemplatesPage />} />
              <Route path="/my-account" element={<AccountPage />} />
            </Route>
            <Route
              path="*"
              element={<NotFound title="Dashboard" path="/dashboard" />}
            />
          </Routes>
        </main>
      </div>
    </>
  );
}

function NotAuthenticatedLayout() {
  return (
    <>
      <main className="flex-1 p-6">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="*"
            element={<NotFound title="the login" path="/login" />}
          />
        </Routes>
      </main>
    </>
  );
}

function AppLayout() {
  const { user, hasRefreshedSession, isLoading } = useContext(AuthContext);

  if (isLoading && !hasRefreshedSession) return <Loader show={true} />;

  return (
    <div className="min-h-screen bg-background">
      {user ? <AuthenticatedLayout /> : <NotAuthenticatedLayout />}
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <AuthContextProvider>
          <SidebarProvider>
            <ToastContainer />
            <AppLayout />
          </SidebarProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
