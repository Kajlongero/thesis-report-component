import { useState } from "react";
import { Plus, Filter, Search } from "lucide-react";

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
} from "../components/Commons/Card";

import { Input } from "../components/Commons/Input";
import { Button } from "../components/Commons/Button";
import { ReportCard } from "../components/Reports/Card";
import { GenerateReportModal } from "../components/Modals/GenerateReportModal";

import { InfiniteScrollContainer } from "../components/Containers/InfiniteScroll";

export function ReportsPage() {
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground">
            Generate data reports in various formats
          </p>
        </div>
        <Button
          className="bg-gradient-primary text-white"
          onClick={() => setIsGenerateModalOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Generated Reports</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search reports..." className="pl-10 w-64" />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <InfiniteScrollContainer
            tx="GetAllReports"
            fnName="get-all-reports-on-page"
            component={ReportCard}
            params={{ limit: 30 }}
          />
        </CardContent>
      </Card>

      <GenerateReportModal
        open={isGenerateModalOpen}
        onOpenChange={setIsGenerateModalOpen}
      />
    </div>
  );
}
