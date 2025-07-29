import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Badge } from "../components/ui/Badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/Avatar";
import { DropdownMenu, DropdownMenuItem } from "../components/ui/DropDown";
import {
  Search,
  Filter,
  UserPlus,
  Eye,
  MoreHorizontal,
  Mail,
  Edit,
  Trash2,
  Shield,
  Ban,
  UserCheck,
} from "lucide-react";

const Users = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Users</h1>
          <p className="text-muted-foreground">
            Manage user accounts and permissions
          </p>
        </div>
        <Button className="bg-purple-500 text-white">
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">2,847</div>
              <p className="text-sm text-muted-foreground">Total Users</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-success">2,456</div>
              <p className="text-sm text-muted-foreground">Active Users</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">391</div>
              <p className="text-sm text-muted-foreground">Inactive Users</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">156</div>
              <p className="text-sm text-muted-foreground">New This Month</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>User Management</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search users..." className="pl-10 w-64" />
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
            {[
              {
                name: "Sarah Johnson",
                email: "sarah.j@email.com",
                status: "active",
                role: "Admin",
              },
              {
                name: "Michael Chen",
                email: "m.chen@email.com",
                status: "active",
                role: "User",
              },
              {
                name: "Emma Wilson",
                email: "emma.w@email.com",
                status: "inactive",
                role: "Moderator",
              },
              {
                name: "David Brown",
                email: "d.brown@email.com",
                status: "pending",
                role: "User",
              },
              {
                name: "Lisa Garcia",
                email: "lisa.g@email.com",
                status: "active",
                role: "User",
              },
            ].map((user, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 border border-border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h3 className="font-medium text-foreground">{user.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      {user.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{user.role}</Badge>
                      <Badge
                        variant="outline"
                        className={
                          user.status === "active"
                            ? "bg-success/10 text-success border-success/20"
                            : user.status === "inactive"
                            ? "bg-muted text-muted-foreground"
                            : "bg-warning/10 text-warning border-warning/20"
                        }
                      >
                        {user.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DropdownMenu
                    trigger={
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    }
                  >
                    <DropdownMenuItem
                      onClick={() => console.log("View Profile")}
                    >
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-2" />
                        View Profile
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => console.log("Edit User")}>
                      <div className="flex items-center">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit User
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => console.log("Change Role")}
                    >
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 mr-2" />
                        Change Role
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => console.log("Send Message")}
                    >
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        Send Message
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => console.log("Toggle Status")}
                    >
                      <div className="flex items-center">
                        <UserCheck className="h-4 w-4 mr-2" />
                        Toggle Status
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => console.log("Suspend User")}
                      variant="destructive"
                    >
                      <div className="flex items-center">
                        <Ban className="h-4 w-4 mr-2" />
                        Suspend User
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => console.log("Delete User")}
                      variant="destructive"
                    >
                      <div className="flex items-center">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete User
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

export default Users;
