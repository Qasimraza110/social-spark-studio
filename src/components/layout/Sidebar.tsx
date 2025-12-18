import { 
  LayoutDashboard, 
  Upload, 
  Calendar, 
  BarChart3, 
  Settings, 
  Sparkles,
  Video,
  Users,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Upload, label: "Upload" },
  { icon: Video, label: "Content" },
  { icon: Calendar, label: "Schedule" },
  { icon: BarChart3, label: "Analytics" },
  { icon: Users, label: "Team" },
  { icon: Settings, label: "Settings" },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-sidebar">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-border px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold gradient-text">ContentAI</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                item.active
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              )}
            >
              <item.icon className={cn("h-5 w-5", item.active && "text-primary")} />
              {item.label}
              {item.active && (
                <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
              )}
            </button>
          ))}
        </nav>

        {/* AI Credits */}
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
      </div>
    </aside>
  );
}
