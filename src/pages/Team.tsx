import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  UserPlus, 
  Mail, 
  MoreVertical, 
  Shield, 
  Edit2, 
  Trash2,
  Crown
} from "lucide-react";
import { cn } from "@/lib/utils";

const teamMembers = [
  { 
    name: "Qasim", 
    email: "Qasim1212@gmail.com", 
    role: "Owner", 
    avatar: "AJ",
    status: "active"
  },
  { 
    name: "Nimra Ghaffar", 
    email: "nimra098098@gmail.com", 
    role: "Admin", 
    avatar: "SW",
    status: "active"
  },
  { 
    name: "Ahmad Zain", 
    email: "zain1212@gmail.com", 
    role: "Editor", 
    avatar: "MC",
    status: "active"
  },
  { 
    name: "Ayesha", 
    email: "ayesha@gmail.com", 
    role: "Viewer", 
    avatar: "ED",
    status: "pending"
  },
    { 
    name: "Uraiza", 
    email: "Uraiza@gmail.com", 
    role: "Viewer", 
    avatar: "ED",
    status: "pending"
  },
];

const roleColors: Record<string, string> = {
  Owner: "bg-amber-500/20 text-amber-400",
  Admin: "bg-primary/20 text-primary",
  Editor: "bg-emerald-500/20 text-emerald-400",
  Viewer: "bg-muted text-muted-foreground",
};

export default function Team() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold">Team</h1>
            <p className="text-muted-foreground mt-1">
              Manage your team members and their permissions.
            </p>
          </div>
          <Button variant="gradient" className="gap-2">
            <UserPlus className="h-4 w-4" />
            Invite Member
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Team Members */}
          <div className="lg:col-span-2 glass-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-lg font-semibold">Team Members</h3>
              <span className="text-sm text-muted-foreground">{teamMembers.length} members</span>
            </div>

            <div className="space-y-3">
              {teamMembers.map((member, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-medium text-primary-foreground">
                      {member.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{member.name}</p>
                        {member.role === "Owner" && (
                          <Crown className="h-4 w-4 text-amber-400" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "text-xs px-2 py-1 rounded",
                      roleColors[member.role]
                    )}>
                      {member.role}
                    </span>
                    {member.status === "pending" && (
                      <span className="text-xs px-2 py-1 rounded bg-amber-500/20 text-amber-400">
                        Pending
                      </span>
                    )}
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Invite */}
          <div className="space-y-6">
            <div className="glass-card rounded-xl p-6">
              <h3 className="font-display text-lg font-semibold mb-4">Invite by Email</h3>
              <div className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="colleague@example.com" className="pl-10" />
                </div>
                <select className="w-full rounded-lg bg-secondary/50 border border-border p-2.5 text-sm">
                  <option>Editor</option>
                  <option>Viewer</option>
                  <option>Admin</option>
                </select>
                <Button variant="gradient" className="w-full">
                  Send Invitation
                </Button>
              </div>
            </div>

            <div className="glass-card rounded-xl p-6">
              <h3 className="font-display text-lg font-semibold mb-4">Roles & Permissions</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <Shield className="h-4 w-4 text-amber-400 mt-0.5" />
                  <div>
                    <p className="font-medium">Owner</p>
                    <p className="text-muted-foreground">Full access to all features</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-4 w-4 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Admin</p>
                    <p className="text-muted-foreground">Manage team and settings</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Edit2 className="h-4 w-4 text-emerald-400 mt-0.5" />
                  <div>
                    <p className="font-medium">Editor</p>
                    <p className="text-muted-foreground">Create and edit content</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
