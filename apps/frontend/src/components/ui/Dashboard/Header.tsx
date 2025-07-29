import { useState } from "react";
import { Bell, User, Moon, Sun, Menu } from "lucide-react";

import { Badge } from "../Badge";
import { Button } from "../Button";
import { SidebarTrigger } from "../Sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "../Avatar";
import { useTheme } from "../../../hooks/useTheme";

export const DashboardHeader = () => {
  const { toggleTheme, setTheme, theme } = useTheme();

  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger>
            <Menu className="h-4 w-4" />
          </SidebarTrigger>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Admin Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Reports Management Panel
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-muted-foreground hover:text-foreground cursor-pointer"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          <div className="flex items-center gap-2 text-foreground">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback className="bg-primary text-primary-foreground">
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">Admin User</span>
          </div>
        </div>
      </div>
    </header>
  );
};
