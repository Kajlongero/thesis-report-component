export const SidebarHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`flex items-center border-b border-border p-4`}>
      {children}
    </div>
  );
};
