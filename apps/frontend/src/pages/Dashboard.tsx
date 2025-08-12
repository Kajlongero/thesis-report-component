import { Clock, Users, FileText, TrendingUp, CheckCircle } from "lucide-react";

import { StatsCard } from "../components/Dashboard/StatsCard";
import { ReportsChart } from "../components/Dashboard/ReportsChart";
import { RecentReports } from "../components/Dashboard/RecentReports";

import { useFetchQuery } from "../hooks/useFetchQuery";

import type { Reports } from "../types/reports";
import type { Dashboard } from "../types/dashboard";
import { useContext } from "react";
import { AuthContext } from "../context";

export function DashboardPage() {
  const { user } = useContext(AuthContext);

  const { data: dashboardData, isLoading: dashboarDataIsLoading } =
    useFetchQuery<Dashboard>({
      tx: "DashboardData",
      fnName: "get-dashboard-data",
    });

  const { data, isLoading } = useFetchQuery<Reports[]>({
    tx: "GetAllReports",
    fnName: "get-recent-reports-dashboard",
    params: { limit: 4 },
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        <StatsCard
          title="Total Reports"
          value={dashboardData?.data.totalReports as number}
          change="+12% from last month"
          changeType="positive"
          icon={FileText}
          loading={dashboarDataIsLoading}
          variant="gradient"
        />
        {user && user.role !== "USER" && (
          <StatsCard
            title="Active Users"
            value={dashboardData?.data.activeUsers as number}
            change="+8% from last month"
            changeType="positive"
            icon={Users}
            loading={dashboarDataIsLoading}
          />
        )}
        <StatsCard
          title="Pending Reports"
          value={dashboardData?.data.pendingReports as number}
          change="-5% from last week"
          changeType="positive"
          icon={Clock}
          loading={dashboarDataIsLoading}
        />
        <StatsCard
          title="Response Time"
          value={dashboardData?.data.avgResponseTime as string}
          change="avg. first response"
          changeType="neutral"
          icon={TrendingUp}
          loading={dashboarDataIsLoading}
        />
        <StatsCard
          title="Resolved Reports"
          value={dashboardData?.data.resolvedReports as number}
          change="92.5% resolution rate"
          changeType="positive"
          icon={CheckCircle}
          loading={dashboarDataIsLoading}
        />
      </div>

      <ReportsChart />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentReports
          data={data && data.data ? (data?.data as Reports[]) : []}
          loading={isLoading}
        />
      </div>
    </div>
  );
}
