import { useContext } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { AuthContext } from "./context";
import { AuthContextProvider } from "./context/AuthContext";

import { Loader } from "./components/Loaders/ScreenLoader";
import { LoginPage } from "./pages/Login";
import { RegisterPage } from "./pages/Register";

const client = new QueryClient();

function AuthenticatedLayout() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <div>
              <h1>Hola mundo</h1>
            </div>
          </>
        }
      />
    </Routes>
  );
}

function NotAuthenticatedLayout() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

function AppLayout() {
  const { user, hasRefreshedSession, isLoading } = useContext(AuthContext);

  if (isLoading && !hasRefreshedSession) return <Loader show={true} />;

  return (
    <div className="min-h-screen bg-background">
      <main className="flex-1 p-6">
        {user ? <AuthenticatedLayout /> : <NotAuthenticatedLayout />}
      </main>
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <AuthContextProvider>
          <ToastContainer />
          <AppLayout />
        </AuthContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
