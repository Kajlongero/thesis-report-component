import { SidebarContext } from "..";
import { useSidebar } from "../../hooks/useSidebar";

interface SidebarProviderProps {
  children: React.ReactNode;
}

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const { open, setOpen } = useSidebar();

  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};
