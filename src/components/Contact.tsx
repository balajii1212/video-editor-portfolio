import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Copy, CheckCircle2, Mail, ExternalLink } from "lucide-react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

const CONTACT_EMAIL = "tipperavenibalaji172@gmail.com";
const WHATSAPP_NUMBER = "919581564131";
const INSTAGRAM_HANDLE = "_random__frames";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  projectType: z.string().min(1, "Please select a project type"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export function Contact() {
  const [copied, setCopied] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (_data: FormData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success("Message sent! I'll get back to you within 24 hours.");
    reset();
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(CONTACT_EMAIL);
    setCopied(true);
    toast.success("Email copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" data-testid="contact-section" className="py-24 relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-16 text-center md:text-left">
          <motion.span
            className="text-primary text-sm font-semibold tracking-widest uppercase block mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Let's Talk
          </motion.span>
          <motion.h2
            className="text-5xl md:text-7xl font-[family-name:var(--font-display)] text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Start a Project
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-lg text-white/70 mb-10 font-light">
              Ready to take your content to the next level? Reach out through any of the channels below or fill out the form.
            </p>

            <div className="space-y-4 mb-10">
              {/* Instagram */}
              <a
                href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-instagram"
                className="flex items-center gap-4 glass-dark p-4 rounded-xl hover:bg-white/10 hover:border-primary/30 transition-all duration-300 group border border-transparent"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(147,51,234,0.4)] transition-shadow">
                  <FaInstagram className="text-white text-xl" />
                </div>
                <div>
                  <div className="text-xs text-white/50 uppercase tracking-wider mb-1">Instagram</div>
                  <div className="font-medium text-white group-hover:text-primary transition-colors">@{INSTAGRAM_HANDLE}</div>
                </div>
                <ExternalLink size={16} className="ml-auto text-white/30 group-hover:text-primary/60 transition-colors" />
              </a>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-whatsapp"
                className="flex items-center gap-4 glass-dark p-4 rounded-xl hover:bg-white/10 hover:border-green-500/30 transition-all duration-300 group border border-transparent"
              >
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/40 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all">
                  <FaWhatsapp className="text-green-400 text-xl" />
                </div>
                <div>
                  <div className="text-xs text-white/50 uppercase tracking-wider mb-1">WhatsApp</div>
                  <div className="font-medium text-white group-hover:text-green-400 transition-colors">+91 9581564131</div>
                </div>
                <span className="ml-auto text-xs text-green-500/70 font-medium px-2 py-1 rounded-full bg-green-500/10 border border-green-500/20">Chat Now</span>
              </a>

              {/* Email */}
              <div className="flex items-center gap-4 glass-dark p-4 rounded-xl group relative border border-transparent hover:border-secondary/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center group-hover:bg-secondary/40 transition-all">
                  <Mail className="text-secondary" size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-white/50 uppercase tracking-wider mb-1">Email</div>
                  <div className="font-medium text-white text-sm truncate">{CONTACT_EMAIL}</div>
                </div>
                <button
                  onClick={copyEmail}
                  className="p-2 bg-white/5 hover:bg-white/20 rounded-lg transition-colors shrink-0"
                  title="Copy email"
                  data-testid="button-copy-email"
                >
                  {copied ? <CheckCircle2 size={18} className="text-green-400" /> : <Copy size={18} className="text-white/70" />}
                </button>
              </div>
            </div>

            {/* Social Icon Row */}
            <div className="flex gap-3">
              <a
                href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-primary/20 hover:text-primary hover:border-primary/30 transition-all duration-300"
                data-testid="link-social-instagram"
              >
                <FaInstagram size={16} />
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-green-500/20 hover:text-green-400 hover:border-green-500/30 transition-all duration-300"
                data-testid="link-social-whatsapp"
              >
                <FaWhatsapp size={16} />
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-secondary/20 hover:text-secondary hover:border-secondary/30 transition-all duration-300"
                data-testid="link-social-email"
              >
                <Mail size={16} />
              </a>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-dark p-8 md:p-10 rounded-3xl border border-white/5"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">Name</label>
                <input
                  id="name"
                  type="text"
                  className={`w-full bg-black/50 border ${errors.name ? "border-red-500" : "border-white/10"} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors placeholder:text-white/30`}
                  placeholder="Your name"
                  data-testid="input-name"
                  {...register("name")}
                />
                {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">Email</label>
                <input
                  id="email"
                  type="email"
                  className={`w-full bg-black/50 border ${errors.email ? "border-red-500" : "border-white/10"} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors placeholder:text-white/30`}
                  placeholder="your@email.com"
                  data-testid="input-email"
                  {...register("email")}
                />
                {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>}
              </div>

              <div>
                <label htmlFor="projectType" className="block text-sm font-medium text-white/80 mb-2">Project Type</label>
                <select
                  id="projectType"
                  className={`w-full bg-black/50 border ${errors.projectType ? "border-red-500" : "border-white/10"} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none`}
                  data-testid="select-project-type"
                  {...register("projectType")}
                >
                  <option value="" disabled>Select a project type</option>
                  <option value="YouTube Video" className="bg-black">YouTube Video</option>
                  <option value="Reels" className="bg-black">Instagram Reels / TikTok</option>
                  <option value="Cinematic" className="bg-black">Cinematic / Documentary</option>
                  <option value="Commercial" className="bg-black">Commercial</option>
                  <option value="Other" className="bg-black">Other</option>
                </select>
                {errors.projectType && <p className="mt-1 text-sm text-red-400">{errors.projectType.message}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  className={`w-full bg-black/50 border ${errors.message ? "border-red-500" : "border-white/10"} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-none placeholder:text-white/30`}
                  placeholder="Tell me about your project..."
                  data-testid="input-message"
                  {...register("message")}
                />
                {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                data-testid="button-send-message"
                className="w-full bg-gradient-to-r from-primary to-secondary text-white font-medium py-4 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_35px_rgba(147,51,234,0.5)] hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
