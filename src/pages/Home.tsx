import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Portfolio } from "@/components/Portfolio";
import { Services } from "@/components/Services";
import { WhyChooseMe } from "@/components/WhyChooseMe";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    document.title = "Tipperaveni Balaji — Cinematic Video Editor";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Freelance video editor specializing in cinematic storytelling, YouTube videos, reels, shorts, and commercial edits.");

    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-background min-h-screen text-foreground selection:bg-primary/30">
      <LoadingScreen isVisible={isLoading} />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary origin-left z-50"
        style={{ scaleX }}
      />

      <Navbar />

      <main>
        <Hero />
        <About />
        <Portfolio />
        <Services />
        <WhyChooseMe />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
