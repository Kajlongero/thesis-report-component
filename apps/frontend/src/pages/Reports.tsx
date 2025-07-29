import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Badge } from "../components/ui/Badge";
import { DropdownMenu, DropdownMenuItem } from "../components/ui/DropDown";
import {
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  MoreHorizontal,
  Edit,
  Trash2,
  Share,
  Copy,
  Archive,
} from "lucide-react";

export const Reports = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-x-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground">
            Generate data reports in various formats (CSV, PDF, HTML, XLSX,
            DOCX)
          </p>
        </div>
        <Button type="button" className="bg-purple-600 text-white">
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
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
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
                      className="bg-primary/10 text-primary"
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
                    <DropdownMenuItem onClick={() => console.log("Regenerate")}>
                      <div className="flex items-center">
                        <Edit className="h-4 w-4 mr-2" />
                        Regenerate
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => console.log("Download")}>
                      <div className="flex items-center">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => console.log("Share")}>
                      <div className="flex items-center">
                        <Share className="h-4 w-4 mr-2" />
                        Share
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => console.log("Duplicate")}>
                      <div className="flex items-center">
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => console.log("Archive")}>
                      <div className="flex items-center">
                        <Archive className="h-4 w-4 mr-2" />
                        Archive
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
    </div>
  );
};
