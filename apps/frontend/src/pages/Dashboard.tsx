import { StatsCard } from "../components/Dashboard/StatsCard";
import { RecentUsers } from "../components/Dashboard/RecentUsers";
import { ReportsChart } from "../components/Dashboard/ReportsChart";
import { RecentReports } from "../components/Dashboard/RecentReports";

import { Clock, Users, FileText, TrendingUp, CheckCircle } from "lucide-react";

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        <StatsCard
          title="Total Reports"
          value="1,249"
          change="+12% from last month"
          changeType="positive"
          icon={FileText}
          variant="gradient"
        />
        <StatsCard
          title="Active Users"
          value="2,847"
          change="+8% from last month"
          changeType="positive"
          icon={Users}
        />
        <StatsCard
          title="Pending Reports"
          value="93"
          change="-5% from last week"
          changeType="positive"
          icon={Clock}
        />
        <StatsCard
          title="Response Time"
          value="2.4h"
          change="avg. first response"
          changeType="neutral"
          icon={TrendingUp}
        />
        <StatsCard
          title="Resolved Reports"
          value="1,156"
          change="92.5% resolution rate"
          changeType="positive"
          icon={CheckCircle}
        />
      </div>

      {/* Charts and Tables */}
      <ReportsChart />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentReports />
        <RecentUsers />
      </div>
    </div>
  );
}
