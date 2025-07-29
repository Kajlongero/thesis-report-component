import { Route, Routes, useLocation } from "react-router-dom";
import { LoginPage } from "../pages/Login";
import { RegisterPage } from "../pages/Register";
import { AppSidebar } from "../components/AppSideBar";
import { useSidebar } from "../hooks/useSidebar";
import { Dashboard } from "../pages/Dashboard";
import { ThemeToggle } from "../components/Themes/ToggleTheme";
import { DashboardHeader } from "../components/ui/Dashboard/Header";
import { Reports } from "../pages/Reports";
import Users from "../pages/Users";
import Analytics from "../pages/Analytics";
import Templates from "../pages/Templates";
import ApiKeys from "../pages/ApiKeys";
import Account from "../pages/Account";

export function AppRoutes() {
  const { isOpen } = useSidebar();

  const AUTH_ROUTES = [
    "/login",
    "/register",
    "/forgot-password",
    "/forgot-password/change",
  ];

  const location = useLocation();

  return (
    <>
      {AUTH_ROUTES.includes(location.pathname) ? (
        <>
          <ThemeToggle />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </>
      ) : (
        <div className="min-h-screen bg-background">
          <AppSidebar />
          <div
            className={`flex flex-col transition-all duration-300 ${
              isOpen ? "ml-64" : "ml-16"
            }`}
          >
            <DashboardHeader />
            <main className="flex-1 p-6">
              <Routes>
                <Route path="/users" element={<Users />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/api-keys" element={<ApiKeys />} />
                <Route path="/my-account" element={<Account />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/templates" element={<Templates />} />
              </Routes>
            </main>
          </div>
        </div>
      )}
    </>
  );
}
