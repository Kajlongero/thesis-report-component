import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { App } from "./App.tsx";
import { AuthContextProvider } from "./context/AuthContext/index.tsx";

import "./index.css";

const client = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={client}>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </QueryClientProvider>
);
