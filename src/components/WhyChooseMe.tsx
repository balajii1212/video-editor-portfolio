import { motion } from "framer-motion";
import { Clock, Star, TrendingUp, Zap, Layers, MessageCircle } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Fast Delivery",
    description: "Projects delivered within 24-48 hours guaranteed. No missed deadlines, ever."
  },
  {
    icon: Star,
    title: "High-Quality Edits",
    description: "Cinema-grade color grading, crisp audio mixing, and professional graphics."
  },
  {
    icon: TrendingUp,
    title: "Trendy Styles",
    description: "Always up-to-date with the latest editing trends, transitions, and meme formats."
  },
  {
    icon: Zap,
    title: "Attention-Grabbing",
    description: "Hooks that stop the scroll and keep viewers watching till the very end."
  },
  {
    icon: Layers,
    title: "Smooth Transitions",
    description: "Seamless cuts and transitions that enhance the story without feeling forced."
  },
  {
    icon: MessageCircle,
    title: "Professional Comms",
    description: "Clear, responsive communication from the initial brief to the final delivery."
  }
];

export function WhyChooseMe() {
  return (
    <section id="why" data-testid="why-section" className="py-24 relative bg-black/40">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <motion.span 
            className="text-primary text-sm font-semibold tracking-widest uppercase block mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            The Difference
          </motion.span>
          <motion.h2 
            className="text-5xl md:text-7xl font-[family-name:var(--font-display)] text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Why Choose Me
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-dark p-8 rounded-2xl border border-white/5 relative overflow-hidden group"
            >
              {/* Subtle background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="text-secondary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-white/60 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
