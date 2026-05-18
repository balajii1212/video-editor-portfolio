import { motion } from "framer-motion";
import { Youtube, Smartphone, Film, Palette, Wand2, Music } from "lucide-react";

const skills = [
  { name: "YouTube Editing", icon: Youtube, level: 90 },
  { name: "Instagram Reels", icon: Smartphone, level: 88 },
  { name: "Cinematic Storytelling", icon: Film, level: 82 },
  { name: "Color Grading", icon: Palette, level: 78 },
  { name: "Motion Graphics", icon: Wand2, level: 70 },
  { name: "Sound Design", icon: Music, level: 80 },
];

const stats = [
  { value: "1+", label: "Years Experience" },
  { value: "50+", label: "Videos Edited" },
  { value: "10+", label: "Happy Clients" },
];

export function About() {
  return (
    <section id="about" data-testid="about-section" className="py-24 relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-16">
          <motion.span
            className="text-primary text-sm font-semibold tracking-widest uppercase block mb-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Who I Am
          </motion.span>
          <motion.h2
            className="text-5xl md:text-7xl font-[family-name:var(--font-display)] text-white"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            About Me
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column — Bio + Skills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-lg text-white/70 mb-8 font-light leading-relaxed">
              I'm <span className="text-white font-medium">Tipperaveni Balaji</span>, a passionate freelance video editor specializing in cinematic storytelling, YouTube content, reels, shorts, and commercial edits. I focus on creating visually engaging videos that capture attention and improve audience retention.
            </p>

            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={skill.name}>
                  <div className="flex items-center gap-3 mb-2">
                    <skill.icon size={18} className="text-primary" />
                    <span className="text-sm font-medium text-white/90">{skill.name}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column — Stats */}
          <motion.div
            className="flex flex-col justify-center gap-6"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="glass-dark p-8 rounded-2xl flex flex-col items-center justify-center text-center border border-white/5 hover:border-primary/40 hover:shadow-[0_0_30px_rgba(147,51,234,0.15)] transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
                whileHover={{ scale: 1.03 }}
              >
                <span className="text-6xl md:text-7xl font-[family-name:var(--font-display)] text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary group-hover:text-glow mb-2 leading-none">
                  {stat.value}
                </span>
                <span className="text-sm text-white/50 tracking-wider uppercase">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
