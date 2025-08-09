import { NavLink } from "react-router-dom";
import { useContext } from "react";

import { SidebarContext } from "../../context";

import type { protectedLinks } from "../../lib/protected";

type SidebarMenuItemProps = {
  item: (typeof protectedLinks)[0];
};

export const SidebarMenuItem = ({ item }: SidebarMenuItemProps) => {
  const { open } = useContext(SidebarContext);

  return (
    <>
      {open ? (
        <NavLink
          to={item.path}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              isActive
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`
          }
        >
          {item.icon && <item.icon className="h-4 w-4 flex-shrink-0" />}
          <span className="font-medium">{item.name}</span>
        </NavLink>
      ) : (
        <div className="flex justify-center">
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              `flex items-center justify-center min-w-8 min-h-8 rounded-full text-sm transition-colors ${
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`
            }
          >
            {item.icon && <item.icon className="h-4 w-4 flex-shrink-0" />}
          </NavLink>
        </div>
      )}
    </>
  );
};
