import { useContext } from "react";
import { AuthContext, SidebarContext } from "../../context";

import { protectedLinks } from "../../lib/protected";
import { SidebarMenuItem } from "./MenuItem";
import type { Roles } from "../../types/roles";

type SidebarMenuSectionProps = {
  title: (typeof protectedLinks)[0]["category"];
};

const SidebarMenuSection = ({ title }: SidebarMenuSectionProps) => {
  const { user } = useContext(AuthContext);
  const { open } = useContext(SidebarContext);

  const uRole = user && user.role;

  const elements = protectedLinks.filter(
    (elem) => elem.category === title && elem.roles.includes(uRole as Roles)
  );

  return (
    <>
      {elements.length > 1 && (
        <>
          <div className={`px-4 py-3 ${!open ? "px-2" : ""}`}>
            {open && (
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {title}
              </h3>
            )}
          </div>
          <ul className="space-y-1">
            {elements.map((elem) => {
              return (
                <SidebarMenuItem
                  item={elem}
                  key={`sidebar-${elem.category}-${elem.name}-${elem.id}`}
                />
              );
            })}
          </ul>
        </>
      )}
    </>
  );
};

export const SidebarMenuList = () => {
  return (
    <nav className={`flex-1 space-y-1 p-4`}>
      <section className={``}>
        <SidebarMenuSection title="MAIN" />
        <SidebarMenuSection title="MANAGEMENT" />
        <SidebarMenuSection title="MY ACCOUNT" />
      </section>
    </nav>
  );
};
