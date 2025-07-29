import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ThemeProvider } from "./context/ThemeContext.tsx";
import { AuthContextProvider } from "./context/AuthContext.tsx";

import App from "./App.tsx";

import "./index.css";

const client = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={client}>
      <AuthContextProvider>
        <ThemeProvider>
          <ToastContainer />
          <App />
        </ThemeProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
