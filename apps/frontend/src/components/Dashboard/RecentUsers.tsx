import {
  Eye,
  Edit,
  UserX,
  Trash2,
  UserCheck,
  MoreHorizontal,
} from "lucide-react";

import { Button } from "../custom/Button";
import { DropdownMenu, DropdownMenuItem } from "../custom/DropdownMenu";
import { Avatar, AvatarFallback, AvatarImage } from "../custom/Avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../custom/Card";

const recentUsers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    avatar: "/placeholder-avatar.jpg",
    status: "active",
    lastSeen: "2 min ago",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "m.chen@email.com",
    avatar: "/placeholder-avatar.jpg",
    status: "inactive",
    lastSeen: "1 hour ago",
  },
  {
    id: 3,
    name: "Emma Wilson",
    email: "emma.w@email.com",
    avatar: "/placeholder-avatar.jpg",
    status: "active",
    lastSeen: "5 min ago",
  },
  {
    id: 4,
    name: "David Brown",
    email: "d.brown@email.com",
    avatar: "/placeholder-avatar.jpg",
    status: "pending",
    lastSeen: "30 min ago",
  },
  {
    id: 5,
    name: "Lisa Garcia",
    email: "lisa.g@email.com",
    avatar: "/placeholder-avatar.jpg",
    status: "active",
    lastSeen: "10 min ago",
  },
];

export const RecentUsers = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Users</CardTitle>
        <Button variant="ghost" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentUsers.map((user) => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">
                    {user.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                  <p className="text-xs text-muted-foreground">
                    {user.lastSeen}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    user.status === "active"
                      ? "bg-success/10 text-success border border-success/20"
                      : user.status === "inactive"
                      ? "bg-muted text-muted-foreground border border-border"
                      : "bg-warning/10 text-warning border border-warning/20"
                  }`}
                >
                  {user.status.toUpperCase()}
                </span>
                <DropdownMenu
                  trigger={
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  }
                >
                  <DropdownMenuItem
                    onClick={() => console.log("View profile", user.id)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => console.log("Edit user", user.id)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit User
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => console.log("Toggle status", user.id)}
                  >
                    {user.status === "active" ? (
                      <UserX className="h-4 w-4 mr-2" />
                    ) : (
                      <UserCheck className="h-4 w-4 mr-2" />
                    )}
                    {user.status === "active" ? "Deactivate" : "Activate"}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => console.log("Delete user", user.id)}
                    variant="destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete User
                  </DropdownMenuItem>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
