import { cn } from "../../utils/cn";

import { useSidebar } from "../../hooks/useSidebar";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({
  className,
  children,
  ...props
}) => {
  const { isOpen } = useSidebar();

  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-40 h-screen flex flex-col border-r bg-background transition-all duration-300",
        isOpen ? "w-64" : "w-16",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  className,
  children,
  ...props
}) => (
  <div
    className={cn("flex h-[5.3rem] items-center border-b px-6", className)}
    {...props}
  >
    {children}
  </div>
);

interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const SidebarContent: React.FC<SidebarContentProps> = ({
  className,
  children,
  ...props
}) => (
  <div className={cn("flex-1 overflow-auto", className)} {...props}>
    {children}
  </div>
);

interface SidebarMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const SidebarMenu: React.FC<SidebarMenuProps> = ({
  className,
  children,
  ...props
}) => (
  <nav
    className={cn("flex flex-col space-y-1 gap-y-1 p-4", className)}
    {...props}
  >
    {children}
  </nav>
);

interface SidebarMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  isActive?: boolean;
}

export const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({
  className,
  children,
  isActive = false,
  ...props
}) => {
  const { isOpen } = useSidebar();

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer",
        isActive &&
          "bg-[#23242a] text-[#fafafa] dark:bg-[#f4f6fa] dark:text-[#6e7287]",
        !isOpen && "justify-center px-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface SidebarTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const SidebarTrigger: React.FC<SidebarTriggerProps> = ({
  className,
  children,
  ...props
}) => {
  const { toggle } = useSidebar();

  return (
    <button
      onClick={toggle}
      className={cn(
        "inline-flex items-center justify-center rounded-md p-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
