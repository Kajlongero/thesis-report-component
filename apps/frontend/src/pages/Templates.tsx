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
  Power,
  MoreHorizontal,
  Users,
} from "lucide-react";

const Templates = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Templates</h1>
          <p className="text-muted-foreground">
            Manage report templates with Quill.js editor
          </p>
        </div>
        <Button className="bg-gradient-primary text-white">
          <Plus className="mr-2 h-4 w-4" />
          Create Template
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Templates</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search templates..."
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
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 border border-border rounded-lg"
              >
                <div className="space-y-1">
                  <h3 className="font-medium text-foreground">
                    Report Template #{i}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Monthly performance analysis for financial departments and
                    key metrics tracking
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="bg-primary/10 text-primary"
                    >
                      Financial
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-accent/10 text-accent-foreground"
                    >
                      Monthly
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Created 2 days ago
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
                    <DropdownMenuItem onClick={() => console.log("Preview")}>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => console.log("Edit")}>
                      <div className="flex items-center">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => console.log("Toggle Status")}
                    >
                      <div className="flex items-center">
                        <Power className="h-4 w-4 mr-2" />
                        Toggle Status
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => console.log("Assign Users")}
                    >
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        Assign Users
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => console.log("Delete")}
                      variant="destructive"
                    >
                      <div className="flex items-center">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Template
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

export default Templates;
