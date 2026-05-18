// ============================================================
// PORTFOLIO PROJECT DATA
// ============================================================
// All portfolio items are stored here and in localStorage.
// To add a new video manually without the admin panel:
//   1. Place your MP4 file in: public/videos/your-video.mp4
//   2. Place your thumbnail in: public/thumbnails/your-thumb.jpg
//   3. Add an entry to DEFAULT_PROJECTS below (or use the admin panel)
// ============================================================

export type ProjectCategory = "Reels" | "YouTube" | "Cinematic" | "Commercial";

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  description: string;
  // Video source: either a relative path like "/videos/video1.mp4" or a YouTube URL
  videoSrc?: string;
  // Thumbnail: relative path like "/thumbnails/thumb1.jpg"
  thumbnail?: string;
  // YouTube embed URL (optional, e.g. "https://www.youtube.com/embed/VIDEO_ID")
  youtubeUrl?: string;
  gradient: string;
}

// ============================================================
// DEFAULT PROJECTS — edit these or add new ones below
// Replace videoSrc with "/videos/your-file.mp4" for MP4 files
// Replace youtubeUrl with YouTube embed URL for YouTube videos
// ============================================================
export const DEFAULT_PROJECTS: Project[] = [
  {
    id: "1",
    title: "Brand Story - Nike",
    category: "Commercial",
    description: "Cinematic brand commercial with dramatic transitions and color grading.",
    gradient: "from-purple-900 to-blue-900",
    // videoSrc: "/videos/video1.mp4",  // <-- replace with your MP4 file path
    // thumbnail: "/thumbnails/thumb1.jpg",  // <-- replace with your thumbnail
  },
  {
    id: "2",
    title: "Travel Vlog - Bali",
    category: "YouTube",
    description: "Aesthetic travel vlog with smooth transitions and ambient sound design.",
    gradient: "from-teal-900 to-emerald-900",
    // videoSrc: "/videos/video2.mp4",
  },
  {
    id: "3",
    title: "Product Launch Reel",
    category: "Reels",
    description: "Fast-paced product reel optimized for Instagram engagement.",
    gradient: "from-indigo-900 to-cyan-900",
    // videoSrc: "/videos/video3.mp4",
  },
  {
    id: "4",
    title: "Wedding Highlight",
    category: "Cinematic",
    description: "Emotional wedding film with cinematic color grade and music sync.",
    gradient: "from-rose-900 to-orange-900",
    // youtubeUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",  // <-- YouTube embed
  },
  {
    id: "5",
    title: "Tech Review Short",
    category: "YouTube",
    description: "Snappy tech review with graphics and dynamic cuts.",
    gradient: "from-blue-900 to-violet-900",
  },
  {
    id: "6",
    title: "Fashion Campaign",
    category: "Commercial",
    description: "High-fashion commercial with moody lighting and slow-motion sequences.",
    gradient: "from-fuchsia-900 to-pink-900",
  },
];

const STORAGE_KEY = "tb_portfolio_projects";

export function getProjects(): Project[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as Project[];
    }
  } catch {
    // ignore parse errors
  }
  return DEFAULT_PROJECTS;
}

export function saveProjects(projects: Project[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function addProject(project: Omit<Project, "id">): Project {
  const projects = getProjects();
  const newProject: Project = { ...project, id: Date.now().toString() };
  projects.push(newProject);
  saveProjects(projects);
  return newProject;
}

export function updateProject(id: string, updates: Partial<Project>): void {
  const projects = getProjects();
  const idx = projects.findIndex(p => p.id === id);
  if (idx !== -1) {
    projects[idx] = { ...projects[idx], ...updates };
    saveProjects(projects);
  }
}

export function deleteProject(id: string): void {
  const projects = getProjects();
  saveProjects(projects.filter(p => p.id !== id));
}
