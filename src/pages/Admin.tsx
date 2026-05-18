// ============================================================
// ADMIN PANEL — Hidden at /admin
// ============================================================
// This is a password-protected admin dashboard to manage
// portfolio projects without editing code.
//
// HOW TO ACCESS:
//   Navigate to /video-editor-portfolio/admin
//
// DEFAULT PASSWORD: tb2025
//   To change the password: update ADMIN_PASSWORD below.
//
// HOW TO ADD VIDEOS:
//   1. Place your MP4 file in: public/videos/your-video.mp4
//   2. Place your thumbnail in: public/thumbnails/your-thumb.jpg
//   3. In the admin panel, click "Add New Project"
//   4. Fill in the title, category, description
//   5. For MP4: enter path like /videos/your-video.mp4
//   6. For thumbnail: enter path like /thumbnails/your-thumb.jpg
//   7. For YouTube: paste the YouTube embed URL
//   8. Click Save — the portfolio updates instantly!
// ============================================================

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Edit2, Save, X, LogOut, Eye } from "lucide-react";
import { toast } from "sonner";
import { getProjects, saveProjects, type Project, type ProjectCategory } from "@/data/projects";

const ADMIN_PASSWORD = "tb2025"; // Change this to your desired password

const GRADIENTS = [
  "from-purple-900 to-blue-900",
  "from-teal-900 to-emerald-900",
  "from-indigo-900 to-cyan-900",
  "from-rose-900 to-orange-900",
  "from-blue-900 to-violet-900",
  "from-fuchsia-900 to-pink-900",
];

const CATEGORIES: ProjectCategory[] = ["Reels", "YouTube", "Cinematic", "Commercial"];

const emptyForm = {
  title: "",
  category: "YouTube" as ProjectCategory,
  description: "",
  videoSrc: "",
  thumbnail: "",
  youtubeUrl: "",
  gradient: GRADIENTS[0],
};

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    const auth = sessionStorage.getItem("tb_admin_auth");
    if (auth === "true") setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      setProjects(getProjects());
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("tb_admin_auth", "true");
      setPasswordError("");
    } else {
      setPasswordError("Incorrect password. Try again.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("tb_admin_auth");
  };

  const handleSave = () => {
    if (!form.title.trim()) { toast.error("Title is required"); return; }
    if (!form.category) { toast.error("Category is required"); return; }

    let updated: Project[];
    if (editingId) {
      updated = projects.map(p => p.id === editingId ? { ...p, ...form } : p);
      toast.success("Project updated!");
    } else {
      const newProject: Project = { ...form, id: Date.now().toString() };
      updated = [...projects, newProject];
      toast.success("Project added!");
    }
    saveProjects(updated);
    setProjects(updated);
    setForm(emptyForm);
    setEditingId(null);
    setShowAddForm(false);
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setForm({
      title: project.title,
      category: project.category,
      description: project.description || "",
      videoSrc: project.videoSrc || "",
      thumbnail: project.thumbnail || "",
      youtubeUrl: project.youtubeUrl || "",
      gradient: project.gradient || GRADIENTS[0],
    });
    setShowAddForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id: string) => {
    const updated = projects.filter(p => p.id !== id);
    saveProjects(updated);
    setProjects(updated);
    setDeleteConfirm(null);
    toast.success("Project deleted.");
  };

  const cancelForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowAddForm(false);
  };

  // --- Login Screen ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-dark border border-white/10 rounded-2xl p-10 w-full max-w-sm"
        >
          <div className="text-center mb-8">
            <span className="text-4xl font-[family-name:var(--font-display)] text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary uppercase block mb-2">
              TB Admin
            </span>
            <p className="text-white/50 text-sm">Portfolio Management Panel</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-white/70 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors placeholder:text-white/30"
                data-testid="input-admin-password"
              />
              {passwordError && <p className="mt-2 text-sm text-red-400">{passwordError}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-secondary text-white font-medium py-3 rounded-xl hover:opacity-90 transition-opacity"
              data-testid="button-admin-login"
            >
              Login
            </button>
          </form>
          <p className="text-center text-white/30 text-xs mt-6">
            Default password: tb2025
          </p>
        </motion.div>
      </div>
    );
  }

  // --- Admin Dashboard ---
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="glass-dark border-b border-white/10 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-2xl font-[family-name:var(--font-display)] text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary uppercase">
              Admin Panel
            </span>
            <span className="text-xs text-white/40 border border-white/10 px-2 py-1 rounded-full">
              {projects.length} projects
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
            >
              <Eye size={16} />
              View Site
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-white/60 hover:text-red-400 transition-colors"
              data-testid="button-admin-logout"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10 max-w-5xl">

        {/* Upload Instructions Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-dark border border-primary/20 rounded-xl p-5 mb-8 text-sm text-white/70 leading-relaxed"
        >
          <p className="font-semibold text-primary mb-3">How to add your videos:</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <p className="font-semibold text-white mb-2 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-red-600 text-white text-xs flex items-center justify-center font-bold">Y</span>
                YouTube (Easiest — Recommended)
              </p>
              <ol className="list-decimal list-inside space-y-1.5 text-white/60">
                <li>Upload your video to YouTube (can be <strong className="text-white/80">Unlisted</strong>)</li>
                <li>Copy the full YouTube URL from your browser</li>
                <li>Paste it into the <strong className="text-white/80">YouTube URL</strong> field below</li>
                <li>The real thumbnail loads automatically!</li>
              </ol>
              <p className="mt-2 text-xs text-green-400">✓ No CAPTCHA · No file uploads · Works instantly</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <p className="font-semibold text-white mb-2">🎬 MP4 File (Advanced)</p>
              <ol className="list-decimal list-inside space-y-1.5 text-white/60">
                <li>In Replit Files panel, navigate to <code className="bg-white/10 px-1 rounded text-xs">public/videos/</code></li>
                <li>Right-click → Upload File → select your .mp4</li>
                <li>Enter <code className="bg-white/10 px-1 rounded text-xs">/videos/filename.mp4</code> in the MP4 field below</li>
              </ol>
            </div>
          </div>
        </motion.div>

        {/* Add/Edit Form */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-8"
            >
              <div className="glass-dark border border-white/10 rounded-2xl p-8">
                <h2 className="text-xl font-[family-name:var(--font-display)] text-white uppercase mb-6">
                  {editingId ? "Edit Project" : "Add New Project"}
                </h2>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-white/70 mb-2">Title *</label>
                    <input
                      type="text"
                      value={form.title}
                      onChange={e => setForm({ ...form, title: e.target.value })}
                      placeholder="e.g. Wedding Highlight Reel"
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors placeholder:text-white/30"
                      data-testid="input-project-title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/70 mb-2">Category *</label>
                    <select
                      value={form.category}
                      onChange={e => setForm({ ...form, category: e.target.value as ProjectCategory })}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none"
                      data-testid="select-project-category"
                    >
                      {CATEGORIES.map(c => (
                        <option key={c} value={c} className="bg-black">{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm text-white/70 mb-2">Description</label>
                    <textarea
                      value={form.description}
                      onChange={e => setForm({ ...form, description: e.target.value })}
                      placeholder="Short description of the project..."
                      rows={2}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-none placeholder:text-white/30"
                      data-testid="input-project-description"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/70 mb-2">MP4 Video Path</label>
                    <input
                      type="text"
                      value={form.videoSrc}
                      onChange={e => setForm({ ...form, videoSrc: e.target.value })}
                      placeholder="/videos/my-video.mp4"
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors placeholder:text-white/30"
                      data-testid="input-project-video"
                    />
                    <p className="text-xs text-white/30 mt-1">Place file in public/videos/ first</p>
                  </div>

                  <div>
                    <label className="block text-sm text-white/70 mb-2">Thumbnail Path</label>
                    <input
                      type="text"
                      value={form.thumbnail}
                      onChange={e => setForm({ ...form, thumbnail: e.target.value })}
                      placeholder="/thumbnails/my-thumb.jpg"
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors placeholder:text-white/30"
                      data-testid="input-project-thumbnail"
                    />
                    <p className="text-xs text-white/30 mt-1">Place file in public/thumbnails/ first</p>
                  </div>

                  <div>
                    <label className="block text-sm text-white/70 mb-2">
                      YouTube URL <span className="text-green-400 text-xs font-normal">— paste any YouTube link</span>
                    </label>
                    <input
                      type="url"
                      value={form.youtubeUrl}
                      onChange={e => setForm({ ...form, youtubeUrl: e.target.value })}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors placeholder:text-white/30"
                      data-testid="input-project-youtube"
                    />
                    <p className="text-xs text-white/30 mt-1">Works with youtube.com/watch, youtu.be, Shorts, and embed links</p>
                  </div>

                  <div>
                    <label className="block text-sm text-white/70 mb-2">Card Gradient (fallback)</label>
                    <select
                      value={form.gradient}
                      onChange={e => setForm({ ...form, gradient: e.target.value })}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none"
                      data-testid="select-project-gradient"
                    >
                      {GRADIENTS.map((g, i) => (
                        <option key={g} value={g} className="bg-black">
                          Gradient {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
                    data-testid="button-save-project"
                  >
                    <Save size={16} />
                    {editingId ? "Update Project" : "Save Project"}
                  </button>
                  <button
                    onClick={cancelForm}
                    className="flex items-center gap-2 px-6 py-3 glass-dark border border-white/10 text-white/70 rounded-xl hover:text-white hover:bg-white/10 transition-all"
                    data-testid="button-cancel-form"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add New Button */}
        {!showAddForm && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-medium hover:opacity-90 transition-opacity mb-8 shadow-[0_0_20px_rgba(147,51,234,0.3)]"
            data-testid="button-add-project"
          >
            <Plus size={18} />
            Add New Project
          </motion.button>
        )}

        {/* Projects List */}
        <div className="space-y-4">
          {projects.length === 0 && (
            <div className="text-center py-16 text-white/30">
              <p>No projects yet. Add your first one!</p>
            </div>
          )}
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              data-testid={`admin-row-${project.id}`}
              className="glass-dark border border-white/8 rounded-xl p-5 flex items-center gap-5 group hover:border-white/15 transition-all duration-300"
            >
              {/* Gradient preview */}
              <div className={`w-16 h-10 rounded-lg bg-gradient-to-br ${project.gradient} shrink-0 overflow-hidden`}>
                {project.thumbnail && (
                  <img src={project.thumbnail} alt="" className="w-full h-full object-cover" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white truncate">{project.title}</h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-primary border border-primary/30 px-2 py-0.5 rounded-full">
                    {project.category}
                  </span>
                  {project.videoSrc && (
                    <span className="text-xs text-white/40">MP4: {project.videoSrc}</span>
                  )}
                  {project.youtubeUrl && (
                    <span className="text-xs text-red-400/70">YouTube linked</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleEdit(project)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-primary/20 hover:text-primary text-white/60 transition-all"
                  title="Edit"
                  data-testid={`button-edit-${project.id}`}
                >
                  <Edit2 size={16} />
                </button>

                {deleteConfirm === project.id ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-red-400">Delete?</span>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="px-3 py-1 text-xs bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded-lg transition-colors"
                      data-testid={`button-confirm-delete-${project.id}`}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="px-3 py-1 text-xs bg-white/5 hover:bg-white/10 text-white/60 rounded-lg transition-colors"
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirm(project.id)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-white/60 transition-all"
                    title="Delete"
                    data-testid={`button-delete-${project.id}`}
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
