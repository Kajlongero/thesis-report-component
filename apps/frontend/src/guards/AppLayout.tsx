import { Outlet } from "react-router-dom";
import { useContext } from "react";

import { SidebarContext } from "../context";

import { AppSideBar } from "../components/AppSideBar";
import { DashboardHeader } from "../components/Dashboard/DashboardHeader";

export function AppLayout() {
  const { open } = useContext(SidebarContext);

  return (
    <>
      <AppSideBar />
      <div
        className={`flex flex-col transition-all duration-300 ${
          open ? "ml-64" : "ml-16"
        }`}
      >
        <DashboardHeader />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </>
  );
}
