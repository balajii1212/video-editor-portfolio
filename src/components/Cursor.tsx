import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updatePosition);

    return () => window.removeEventListener("mousemove", updatePosition);
  }, []);

  return (
    <motion.div
      data-testid="cursor-dot"
      className="pointer-events-none fixed top-0 left-0 z-50 h-3 w-3 rounded-full bg-primary"
      style={{
        boxShadow: "0 0 20px rgba(147, 51, 234, 0.8), 0 0 40px rgba(147, 51, 234, 0.4)"
      }}
      animate={{
        x: position.x - 6,
        y: position.y - 6,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28,
        mass: 2
      }}
    />
  );
}
