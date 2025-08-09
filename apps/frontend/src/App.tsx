import { useContext } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { SidebarProvider } from "./context/SidebarContext";
import { AuthContextProvider } from "./context/AuthContext";
import { AuthContext, SidebarContext } from "./context";

import { Dashboard } from "./pages/Dashboard";
import { LoginPage } from "./pages/Login";
import { RegisterPage } from "./pages/Register";

import { Loader } from "./components/Loaders/ScreenLoader";
import { AppSideBar } from "./components/AppSideBar";
import { DashboardHeader } from "./components/Dashboard/DashboardHeader";

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
            <Route path="/dashboard" element={<Dashboard />} />
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
