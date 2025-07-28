import { SidebarProvider } from "./context/SidebarContext";
import { AppRoutes } from "./routes";

function App() {
  return (
    <SidebarProvider>
      <AppRoutes />
    </SidebarProvider>
  );
}

export default App;
