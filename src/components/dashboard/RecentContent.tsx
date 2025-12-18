import { Play, MoreVertical, TrendingUp, Eye, Heart, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const recentVideos = [
  {
    id: 1,
    title: "10 Tips for Better Content Creation",
    thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300&h=200&fit=crop",
    platforms: ["youtube", "tiktok", "instagram"],
    views: "24.5K",
    likes: "1.2K",
    comments: "89",
    status: "published",
  },
  {
    id: 2,
    title: "Behind the Scenes - Studio Setup",
    thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=300&h=200&fit=crop",
    platforms: ["youtube", "linkedin"],
    views: "18.2K",
    likes: "856",
    comments: "42",
    status: "published",
  },
  {
    id: 3,
    title: "Product Launch Announcement",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop",
    platforms: ["instagram", "tiktok"],
    views: "—",
    likes: "—",
    comments: "—",
    status: "scheduled",
  },
];

const platformColors: Record<string, string> = {
  youtube: "bg-youtube/20 text-youtube",
  instagram: "bg-instagram/20 text-instagram",
  tiktok: "bg-tiktok/20 text-tiktok",
  linkedin: "bg-linkedin/20 text-linkedin",
};

export function RecentContent() {
  return (
    <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in" style={{ animationDelay: "400ms" }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg font-semibold">Recent Content</h3>
        <button className="text-sm text-primary hover:underline">View all</button>
      </div>

      <div className="space-y-4">
        {recentVideos.map((video) => (
          <div
            key={video.id}
            className="flex gap-4 p-3 rounded-lg hover:bg-secondary/30 transition-colors duration-200 cursor-pointer group"
          >
            <div className="relative w-28 h-16 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <Play className="h-6 w-6 text-foreground" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm truncate">{video.title}</h4>
              <div className="flex items-center gap-2 mt-1">
                {video.platforms.map((platform) => (
                  <span
                    key={platform}
                    className={cn(
                      "text-xs px-1.5 py-0.5 rounded capitalize",
                      platformColors[platform]
                    )}
                  >
                    {platform}
                  </span>
                ))}
                {video.status === "scheduled" && (
                  <span className="text-xs px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400">
                    Scheduled
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {video.views}
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="h-3 w-3" />
                  {video.likes}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="h-3 w-3" />
                  {video.comments}
                </span>
              </div>
            </div>
            <button className="p-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreVertical className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
