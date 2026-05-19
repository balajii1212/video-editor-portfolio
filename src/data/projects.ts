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
   id: "1", title: "College Diaries", category: "YouTube",
    description: "Simple moments. Real memories. Cinematic college edit.",
    youtubeUrl: "https://www.youtube.com/embed/xzRITp7Kr7o",
    thumbnail: "/thumbnails/college-diaries.jpg",
    gradient: "from-orange-900 to-yellow-900",
  },
  {
    id: "2",
     title: "Numaish",
    category: "YouTube",
    description: "Cinematic storytelling edit with dramatic visuals and smooth transitions.",
    youtubeUrl: "https://www.youtube.com/embed/QwoP-KB2Q1E",
    gradient: "from-yellow-900 to-orange-900",
  },
  {
    id:"3",
   title: "Random Day",
    category: "YouTube",
    description: "Aesthetic random day cinematic vlog with moody color grading.",
    youtubeUrl: "https://www.youtube.com/embed/fV-ghPL_nso",
    gradient: "from-blue-900 to-cyan-900",
  },
  {
    id:"4",
    title: "Safar",
    category: "YouTube",
    description: "Travel-inspired cinematic sequence with emotional storytelling.",
    youtubeUrl: "https://www.youtube.com/embed/GSzh0IRBnN4",
    gradient: "from-orange-900 to-amber-900",
  },
  {
    id:"5",
    title: "Rasoolpura",
    category: "YouTube",
    description: "Creative cinematic visuals capturing the essence of Rasoolpura.",
    youtubeUrl: "https://www.youtube.com/embed/SGK1ZXzIpGE",
    gradient: "from-slate-900 to-gray-900",
  },
  {
    id:"6",
    title: "We in Rain",
    category: "YouTube",
    description: "Rainy atmosphere cinematic edit with emotional visual tone.",
    youtubeUrl: "https://www.youtube.com/embed/LIB7HH4ti94",
    gradient: "from-indigo-900 to-blue-900",
  },
  {
    id: "7",
    title: "Homies",
    category: "YouTube",
    description: "Fun cinematic friendship montage with energetic cuts and vibes.",
    youtubeUrl: "https://www.youtube.com/embed/tepmFDmWBR8",
    gradient: "from-purple-900 to-pink-900",
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
