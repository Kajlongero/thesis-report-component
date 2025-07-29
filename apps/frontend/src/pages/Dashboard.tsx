import { StatsCard } from "../components/ui/Dashboard/StatsCard";
import { RecentUsers } from "../components/ui/Dashboard/RecentUsers";
import { ReportsChart } from "../components/ui/Dashboard/ReportsChart";
import { RecentReports } from "../components/ui/Dashboard/RecentReports";
import {
  Users,
  Clock,
  FileText,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Reports"
          value="1,249"
          change="+12% from last month"
          changeType="positive"
          icon={FileText}
        />
        <StatsCard
          title="Active Users"
          value="2,847"
          change="+8% from last month"
          changeType="positive"
          icon={Users}
        />
        <StatsCard
          title="Resolved Reports"
          value="1,156"
          change="92.5% resolution rate"
          changeType="positive"
          icon={CheckCircle}
        />
        <StatsCard
          title="Pending Reports"
          value="93"
          change="-5% from last week"
          changeType="positive"
          icon={Clock}
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Critical Issues"
          value="7"
          change="Needs immediate attention"
          changeType="negative"
          icon={AlertTriangle}
        />
        <StatsCard
          title="Response Time"
          value="2.4h"
          change="avg. first response"
          changeType="neutral"
          icon={TrendingUp}
        />
        <StatsCard
          title="User Satisfaction"
          value="94%"
          change="+2% this quarter"
          changeType="positive"
          icon={CheckCircle}
        />
      </div>
      <ReportsChart />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentReports />
        <RecentUsers />
      </div>
    </div>
  );
};
