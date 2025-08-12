import { useContext } from "react";

import { SidebarContext } from "../../context";

import { SidebarHeader } from "./Header";
import { SidebarMenuList } from "./MenuList";

export const AppSideBar = () => {
  const { open } = useContext(SidebarContext);

  return (
    <div
      className={`fixed left-0 top-0 z-40 h-screen transition-transform ${
        open ? "w-64" : "w-16"
      }`}
    >
      <div className="h-full bg-background border-r border-border">
        <SidebarHeader>
          <div className="flex items-center justify-center gap-2 h-16">
            <div className="h-8 w-8 rounded bg-gradient-primary"></div>
            {open && (
              <div>
                <h2 className="text-sm font-semibold text-foreground">Admin</h2>
                <p className="text-xs text-muted-foreground">RepCom</p>
              </div>
            )}
          </div>
        </SidebarHeader>
        <div className={`flex h-full flex-col`}>
          <SidebarMenuList />
        </div>
      </div>
    </div>
  );
};
