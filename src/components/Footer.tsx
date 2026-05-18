import { ArrowUp } from "lucide-react";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import { Mail } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer data-testid="footer" className="bg-black relative pt-16 pb-8 border-t border-white/10">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          {/* Logo & Tagline */}
          <div className="text-center md:text-left">
            <span className="text-4xl font-[family-name:var(--font-display)] text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary block mb-2 uppercase">
              Tipperaveni Balaji
            </span>
            <p className="text-white/60 text-sm max-w-xs">
              Edited with Creativity by Tipperaveni Balaji
            </p>
          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap justify-center gap-6">
            {["Home", "About", "Portfolio", "Services", "Testimonials", "Contact"].map(page => (
              <a
                key={page}
                href={`#${page.toLowerCase()}`}
                className="text-sm font-medium text-white/70 hover:text-primary transition-colors"
              >
                {page}
              </a>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            <a
              href="https://instagram.com/_random_frames"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-footer-instagram"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-primary/20 hover:text-primary hover:border-primary/30 transition-all duration-300"
            >
              <FaInstagram size={18} />
            </a>
            <a
              href="#"
              data-testid="link-footer-youtube"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30 transition-all duration-300"
            >
              <FaYoutube size={18} />
            </a>
            <a
              href="#"
              data-testid="link-footer-tiktok"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-all duration-300"
            >
              <FaTiktok size={18} />
            </a>
            <a
              href="mailto:tipperavenibalaji172@gmail.com"
              data-testid="link-footer-email"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-secondary/20 hover:text-secondary hover:border-secondary/30 transition-all duration-300"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} Tipperaveni Balaji. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            data-testid="button-back-to-top"
            className="flex items-center gap-2 text-sm text-white/50 hover:text-primary transition-colors group"
          >
            <span>Back to top</span>
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/30 border border-white/10 transition-all">
              <ArrowUp size={16} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
