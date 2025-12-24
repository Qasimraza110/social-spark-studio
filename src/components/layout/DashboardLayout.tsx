import { useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Upload,
  Calendar,
  BarChart3,
  Settings,
  Sparkles,
  Video,
  Users,
  Zap,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Upload, label: "Upload", path: "/upload" },
  { icon: Video, label: "Content", path: "/content" },
  { icon: Calendar, label: "Schedule", path: "/schedule" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: Users, label: "Team", path: "/team" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // desktop

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen border-r border-border bg-sidebar transition-all duration-300",
          sidebarCollapsed ? "w-16" : "w-64",
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo + Menu */}
          <div className="flex h-16 items-center justify-between gap-3 border-b border-border px-4">
            <Link to="/dashboard" className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                <Zap className="h-5 w-5 text-primary-foreground" />
              </div>

              {!sidebarCollapsed && (
                <span className="font-display text-xl font-bold gradient-text">
                  ContentAI
                </span>
              )}
            </Link>

            {/* Mobile toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden"
            >
              <Menu className="h-4 w-4" />
            </Button>

            {/* Desktop collapse */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden md:flex ml-1"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                    isActive
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5 flex-shrink-0",
                      isActive && "text-primary"
                    )}
                  />

                  {!sidebarCollapsed && <span>{item.label}</span>}

                  {isActive && !sidebarCollapsed && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* AI Credits */}
          {!sidebarCollapsed && (
            <div className="border-t border-border p-4">
              <div className="rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 p-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Sparkles className="h-4 w-4 text-primary" />
                  AI Credits
                </div>

                <div className="mt-2 flex items-end justify-between">
                  <span className="text-2xl font-bold font-display">847</span>
                  <span className="text-xs text-muted-foreground">/ 1000</span>
                </div>

                <div className="mt-2 h-1.5 rounded-full bg-muted">
                  <div className="h-full w-[84.7%] rounded-full bg-gradient-to-r from-primary to-accent" />
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={cn(
          "transition-all duration-300",
          sidebarCollapsed ? "md:ml-16" : "md:ml-64"
        )}
      >
        {children}
      </main>
    </div>
  );
}
