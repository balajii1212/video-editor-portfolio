import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export function Hero() {
  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToPortfolio = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" data-testid="hero-section" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[120px] animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute top-1/3 right-1/4 w-[30rem] h-[30rem] bg-secondary/20 rounded-full blur-[150px] animate-[pulse_10s_ease-in-out_infinite_2s]" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] bg-primary/20 rounded-full blur-[150px] animate-[pulse_12s_ease-in-out_infinite_1s]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-12 flex flex-col items-center text-center">

        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 inline-flex items-center gap-2 glass-dark px-4 py-2 rounded-full border-white/10"
        >
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
          <span className="text-xs font-medium uppercase tracking-wider text-white/80">Available for Projects</span>
        </motion.div>

        {/* Name — Main Headline */}
        <motion.h1
          className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight uppercase text-white mb-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Tipperaveni <span className="text-primary text-glow">Balaji</span>
        </motion.h1>

        {/* Cinematic Tagline */}
        <motion.p
          className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl md:text-4xl text-white/70 uppercase tracking-widest mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          I Turn Raw Footage Into <span className="text-primary">Cinematic Stories</span>
        </motion.p>

        {/* Description */}
        <motion.p
          className="max-w-2xl text-base md:text-lg text-white/60 mb-10 font-light leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          Freelance Video Editor specializing in cinematic storytelling, YouTube videos, reels, shorts, commercials, and engaging social media content.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <a
            href="#portfolio"
            onClick={scrollToPortfolio}
            data-testid="button-view-work"
            className="px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-full font-medium text-white hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(147,51,234,0.3)]"
          >
            View My Work
          </a>
          <a
            href="#contact"
            onClick={scrollToContact}
            data-testid="button-hire-me"
            className="px-8 py-4 glass-dark rounded-full font-medium text-white hover:bg-white/10 hover:border-primary/50 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(147,51,234,0.2)]"
          >
            Hire Me
          </a>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 flex flex-col items-center gap-2 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        onClick={scrollToPortfolio}
      >
        <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
