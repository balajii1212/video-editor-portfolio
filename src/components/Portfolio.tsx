// ============================================================
// PORTFOLIO COMPONENT
// ============================================================
// Projects are loaded from localStorage (managed by Admin panel at /admin).
//
// HOW TO ADD YOUR VIDEOS:
//   Option A — YouTube (easiest):
//     Paste any YouTube URL (watch or share link) into the admin panel.
//     e.g. https://www.youtube.com/watch?v=ABC123
//     The card will show the real YouTube thumbnail automatically.
//     Clicking the card opens the video on YouTube in a new tab.
//
//   Option B — MP4 file:
//     1. Upload your .mp4 to: public/videos/your-video.mp4
//     2. In admin panel, enter path: /videos/your-video.mp4
//     3. The card plays the video on hover (muted preview).
// ============================================================

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Youtube } from "lucide-react";
import { getProjects, type Project } from "@/data/projects";

const CATEGORY_LABELS: Record<string, string> = {
  All: "All",
  Reels: "Reels",
  YouTube: "YouTube Videos",
  Cinematic: "Cinematic Edits",
  Commercial: "Commercial Ads",
};

const categories = Object.keys(CATEGORY_LABELS);

// Extract YouTube video ID from any common YouTube URL format
function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/.*[?&]v=([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function getYouTubeThumbnail(videoId: string): string {
  // maxresdefault is HD; falls back to hqdefault if not available
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

function VideoCard({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbError, setThumbError] = useState(false);

  // Resolve YouTube info
  const ytId = project.youtubeUrl ? getYouTubeId(project.youtubeUrl) : null;
  const ytThumb = ytId ? getYouTubeThumbnail(ytId) : null;
  const ytWatchUrl = ytId ? `https://www.youtube.com/watch?v=${ytId}` : project.youtubeUrl;

  const handleMouseEnter = () => {
    if (project.videoSrc && videoRef.current) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const handleClick = () => {
    if (ytWatchUrl) {
      window.open(ytWatchUrl, "_blank", "noopener,noreferrer");
      return;
    }
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  };

  // Background image: user thumbnail > YouTube thumbnail > gradient
  const bgImage = project.thumbnail || (ytThumb && !thumbError ? ytThumb : null);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      data-testid={`card-project-${project.id}`}
      className="group relative aspect-video rounded-xl overflow-hidden cursor-pointer shadow-[0_0_0_1px_rgba(255,255,255,0.06)] hover:shadow-[0_0_30px_rgba(147,51,234,0.25),0_0_0_1px_rgba(147,51,234,0.25)] transition-shadow duration-500"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Background: thumbnail image or gradient */}
      {bgImage ? (
        <>
          <img
            src={bgImage}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
            onError={() => setThumbError(true)}
          />
          {/* Dark overlay on top of image */}
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-500" />
        </>
      ) : (
        <>
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient || "from-purple-900 to-blue-900"} group-hover:scale-105 transition-transform duration-700`} />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
        </>
      )}

      {/* MP4 video preview on hover */}
      {project.videoSrc && (
        <video
          ref={videoRef}
          src={project.videoSrc}
          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          muted
          loop
          playsInline
          preload="none"
        />
      )}

      {/* Neon glow border */}
      <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-primary/40 transition-colors duration-500 pointer-events-none z-10" />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-16 h-16 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center shadow-[0_0_35px_rgba(147,51,234,0.7)]"
        >
          {isPlaying && !ytId ? (
            <Pause className="text-white" size={20} fill="currentColor" />
          ) : (
            <Play className="text-white ml-1" size={22} fill="currentColor" />
          )}
        </motion.div>
      </div>

      {/* YouTube badge */}
      {ytId && (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-red-600/90 backdrop-blur-sm px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Youtube size={12} className="text-white" />
          <span className="text-white text-xs font-medium">Watch on YouTube</span>
        </div>
      )}

      {/* Category badge */}
      <div className="absolute top-3 right-3 z-10 glass-dark px-3 py-1 rounded-full border border-white/10">
        <span className="text-xs text-white/90 font-medium">{project.category}</span>
      </div>

      {/* Title overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/95 to-transparent translate-y-1 group-hover:translate-y-0 transition-transform duration-300 z-10">
        <h3 className="text-base font-bold text-white group-hover:text-primary transition-colors">{project.title}</h3>
        {project.description && (
          <p className="text-xs text-white/50 mt-0.5 line-clamp-1">{project.description}</p>
        )}
      </div>
    </motion.div>
  );
}

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    setProjects(getProjects());
    const handleStorage = () => setProjects(getProjects());
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const filteredProjects = projects.filter(
    p => activeCategory === "All" || p.category === activeCategory
  );

  return (
    <section id="portfolio" data-testid="portfolio-section" className="py-24 relative bg-black/40">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <motion.span
              className="text-primary text-sm font-semibold tracking-widest uppercase block mb-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              My Work
            </motion.span>
            <motion.h2
              className="text-5xl md:text-7xl font-[family-name:var(--font-display)] text-white"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Portfolio
            </motion.h2>
          </div>

          {/* Category Filters */}
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                data-testid={`filter-${cat.toLowerCase()}`}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-primary text-white neon-glow border border-primary/50"
                    : "glass-dark text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Video Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <VideoCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-white/40">
            <p className="text-lg">No projects in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
