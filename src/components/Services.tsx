import { motion } from "framer-motion";
import { Youtube, Smartphone, Image as ImageIcon, Film, Zap, Share2 } from "lucide-react";

const services = [
  {
    icon: Youtube,
    title: "YouTube Editing",
    description: "Long-form video editing optimized for retention and engagement. Perfect pacing, engaging cuts, and storytelling that keeps viewers watching."
  },
  {
    icon: Smartphone,
    title: "Reels Editing",
    description: "Fast-paced, trendy reels with dynamic transitions, precise music sync, and strong hooks designed for the algorithm."
  },
  {
    icon: ImageIcon,
    title: "Thumbnail Design",
    description: "Eye-catching, high-contrast thumbnails that maximize CTR and establish a strong, recognizable brand identity."
  },
  {
    icon: Film,
    title: "Cinematic Storytelling",
    description: "Narrative-driven edits for documentaries and brand stories featuring dramatic pacing, advanced color grading, and immersive sound design."
  },
  {
    icon: Zap,
    title: "Shorts Editing",
    description: "Punchy, high-retention short-form content tailored specifically for TikTok, YouTube Shorts, and other vertical feeds."
  },
  {
    icon: Share2,
    title: "Social Media Editing",
    description: "Platform-optimized content formatting, ensuring your videos look perfect across all major social channels."
  }
];

export function Services() {
  return (
    <section id="services" data-testid="services-section" className="py-24 relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <motion.span 
            className="text-primary text-sm font-semibold tracking-widest uppercase block mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            What I Do
          </motion.span>
          <motion.h2 
            className="text-5xl md:text-7xl font-[family-name:var(--font-display)] text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Services
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-dark p-8 rounded-2xl border border-white/5 hover:border-primary/30 transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300 group-hover:shadow-[0_0_20px_rgba(147,51,234,0.5)]">
                <service.icon className="text-primary group-hover:text-white transition-colors" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-white/60 leading-relaxed text-sm">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
