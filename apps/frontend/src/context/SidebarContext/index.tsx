import { useState } from "react";

import { SidebarContext } from "..";

interface SidebarProviderProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export const SidebarProvider = ({
  children,
  defaultOpen = true,
}: SidebarProviderProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};
