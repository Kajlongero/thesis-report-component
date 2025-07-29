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
  Plus,
  Edit,
  Eye,
  Trash2,
  Copy,
  MoreHorizontal,
  RotateCcw,
  Settings,
  Shield,
} from "lucide-react";

const ApiKeys = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">API Keys</h1>
          <p className="text-muted-foreground">
            Manage API keys for system integrations
          </p>
        </div>
        <Button className="bg-gradient-primary text-white">
          <Plus className="mr-2 h-4 w-4" />
          Generate API Key
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>API Keys</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search API keys..."
                  className="pl-10 w-64"
                />
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
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 border border-border rounded-lg"
              >
                <div className="space-y-1">
                  <h3 className="font-medium text-foreground">
                    External System API #{i}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Integration key for data source connection
                  </p>
                  <div className="flex items-center gap-2">
                    <code className="text-xs bg-muted px-2 py-1 rounded">
                      sk_live_••••••••••••••••••••••••••••••••••••••••
                    </code>
                    <span className="text-xs text-muted-foreground">
                      Created 1 week ago
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="bg-success/10 text-success"
                  >
                    Active
                  </Badge>
                  <DropdownMenu
                    trigger={
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    }
                  >
                    <DropdownMenuItem onClick={() => console.log("Copy Key")}>
                      <div className="flex items-center">
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Key
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => console.log("View Details")}
                    >
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => console.log("Edit")}>
                      <div className="flex items-center">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => console.log("Regenerate")}>
                      <div className="flex items-center">
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Regenerate Key
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => console.log("Configure")}>
                      <div className="flex items-center">
                        <Settings className="h-4 w-4 mr-2" />
                        Configure
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => console.log("Permissions")}
                    >
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 mr-2" />
                        Permissions
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => console.log("Revoke")}
                      variant="destructive"
                    >
                      <div className="flex items-center">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Revoke Key
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

export default ApiKeys;
