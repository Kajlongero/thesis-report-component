import { NavLink, useLocation } from "react-router-dom";

import { useSidebar } from "../hooks/useSidebar";

import {
  Sidebar,
  SidebarMenu,
  SidebarHeader,
  SidebarContent,
  SidebarMenuItem,
} from "./ui/Sidebar";
import { type ProtectedLinks, protectedLinks } from "../utils/protected";
import { useAuth } from "../hooks/useAuth";

export function AppSidebar() {
  const { user } = useAuth();
  const { isOpen } = useSidebar();

  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    return currentPath.startsWith(path);
  };

  const renderMenuSection = (
    title: string,
    items: ProtectedLinks["category"]
  ) => (
    <div className="text-left px-4 py-2">
      {isOpen && (
        <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </h3>
      )}
      <div className="space-y-1">
        {protectedLinks.map((item) => {
          if (item.category === items)
            return (
              <NavLink key={item.name} to={item.path}>
                <SidebarMenuItem isActive={isActive(item.path)}>
                  {item.icon && <item.icon className="h-4 w-4 flex-shrink-0" />}
                  {isOpen && <span>{item.name}</span>}
                </SidebarMenuItem>
              </NavLink>
            );
        })}
      </div>
    </div>
  );

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-gradient-primary"></div>
          {isOpen && (
            <div>
              <h2 className="text-sm font-semibold text-foreground">
                Admin Panel
              </h2>
              <p className="text-xs text-muted-foreground">Reports System</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {renderMenuSection("Main", "MAIN")}
          {renderMenuSection("Management", "MANAGEMENT")}
          {renderMenuSection("Account", "HELP")}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
