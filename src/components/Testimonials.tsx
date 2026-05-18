import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    text: "Balaji edited my YouTube videos professionally with cinematic transitions and excellent pacing. Highly recommended!",
    name: "Kiran",
    role: "Content Creator, Hyderabad",
    gradient: "from-purple-500 to-indigo-500",
    initials: "KR"
  },
  {
    text: "The reels he edited helped improve engagement on my Instagram page. Very creative work and great attention to detail.",
    name: "Sravani",
    role: "Instagram Influencer, Vijayawada",
    gradient: "from-blue-500 to-cyan-500",
    initials: "SR"
  },
  {
    text: "Fast delivery and very smooth communication. The final commercial edit looked premium and exceeded my expectations.",
    name: "Rakesh",
    role: "Business Owner, Warangal",
    gradient: "from-teal-500 to-emerald-500",
    initials: "RK"
  }
];

export function Testimonials() {
  return (
    <section id="testimonials" data-testid="testimonials-section" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <motion.span
            className="text-primary text-sm font-semibold tracking-widest uppercase block mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Client Reviews
          </motion.span>
          <motion.h2
            className="text-5xl md:text-7xl font-[family-name:var(--font-display)] text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            What Clients Say
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="glass-dark p-8 rounded-2xl border border-white/5 hover:border-primary/30 hover:shadow-[0_0_30px_rgba(147,51,234,0.12)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <Quote className="text-primary/40 mb-5" size={36} />
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-base text-white/85 mb-8 font-light italic leading-relaxed">
                  "{testimonial.text}"
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold text-sm shadow-[0_0_15px_rgba(147,51,234,0.3)]`}>
                  {testimonial.initials}
                </div>
                <div>
                  <h4 className="font-bold text-white">{testimonial.name}</h4>
                  <p className="text-sm text-white/50">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
