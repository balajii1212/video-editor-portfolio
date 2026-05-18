import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen({ isVisible }: { isVisible: boolean }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          data-testid="loading-screen"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-[family-name:var(--font-display)] text-white text-glow text-primary"
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            TIPPERAVENI BALAJI
          </motion.h1>
          <motion.p
            className="mt-4 text-sm md:text-lg tracking-[0.3em] text-white/60"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            CINEMATIC EDITOR
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
