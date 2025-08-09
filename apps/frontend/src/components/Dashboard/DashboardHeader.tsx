import { useContext, useState } from "react";
import { User, Moon, Sun } from "lucide-react";

import { Button } from "../Commons/Button";
import { SidebarTrigger } from "../AppSideBar/Trigger";
import { Avatar, AvatarFallback, AvatarImage } from "../Commons/Avatar";
import { AuthContext } from "../../context";

export const DashboardHeader = () => {
  const { user } = useContext(AuthContext);

  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="bg-card border-b border-border px-6 h-16">
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Management</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-muted-foreground hover:text-foreground"
          >
            {isDark ? (
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
            <span className="text-sm font-medium">
              {user && `${user.firstName} ${user.lastName}`}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
