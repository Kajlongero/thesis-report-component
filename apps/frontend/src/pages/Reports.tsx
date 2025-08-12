import { useState } from "react";
import {
  Eye,
  Plus,
  Trash2,
  Search,
  Filter,
  Download,
  MoreHorizontal,
} from "lucide-react";

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
} from "../components/Commons/Card";
import { Badge } from "../components/Commons/Badge";
import { Input } from "../components/Commons/Input";
import { Button } from "../components/Commons/Button";
import {
  DropdownMenu,
  DropdownMenuItem,
} from "../components/Commons/DropdownMenu";

import GenerateReportModal from "../components/Modals/GenerateReportModal";

export function ReportsPage() {
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground">
            Generate data reports in various formats (CSV, PDF, HTML, XLSX,
            DOCX)
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
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 border border-border rounded-lg"
              >
                <div className="space-y-1">
                  <h3 className="font-medium text-foreground">
                    Financial Report Q{i}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Revenue analysis and department metrics exported as PDF
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="bg-primary/10 text-primary border-primary/20"
                    >
                      PDF
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-secondary/10 text-secondary"
                    >
                      Financial
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Generated 2 hours ago
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="bg-success/10 text-success"
                  >
                    Ready
                  </Badge>
                  <DropdownMenu
                    trigger={
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    }
                  >
                    <DropdownMenuItem
                      onClick={() => console.log("View Report")}
                    >
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-2" />
                        View/Preview
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => console.log("Download")}>
                      <div className="flex items-center">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => console.log("Delete")}
                      variant="destructive"
                    >
                      <div className="flex items-center">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Report File
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <GenerateReportModal
        open={isGenerateModalOpen}
        onOpenChange={setIsGenerateModalOpen}
      />
    </div>
  );
}
