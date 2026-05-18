import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Basic",
    price: "$99",
    period: "/video",
    description: "Perfect for short, simple edits to get your message across.",
    features: [
      "Up to 5 min video",
      "Basic cuts and transitions",
      "1 revision",
      "48h delivery",
      "Color grading (basic)",
      "Background music"
    ],
    popular: false
  },
  {
    name: "Standard",
    price: "$199",
    period: "/video",
    description: "The sweet spot for high-quality, engaging content.",
    features: [
      "Up to 15 min video",
      "Advanced transitions & effects",
      "3 revisions",
      "24h delivery",
      "Professional color grading",
      "Custom sound design",
      "Thumbnail included"
    ],
    popular: true
  },
  {
    name: "Premium",
    price: "$399",
    period: "/video",
    description: "Cinematic quality for stories that demand perfection.",
    features: [
      "Unlimited length",
      "Cinematic storytelling",
      "Unlimited revisions",
      "24h delivery",
      "Full color grading + LUTs",
      "Motion graphics",
      "Thumbnail + 3 short clips"
    ],
    popular: false
  }
];

export function Pricing() {
  return (
    <section id="pricing" data-testid="pricing-section" className="py-24 relative bg-black/40">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <motion.span 
            className="text-primary text-sm font-semibold tracking-widest uppercase block mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Investment
          </motion.span>
          <motion.h2 
            className="text-5xl md:text-7xl font-[family-name:var(--font-display)] text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Simple Pricing
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass-dark rounded-3xl p-8 flex flex-col relative transition-transform duration-300 hover:-translate-y-2 ${
                plan.popular ? "border-primary/50 neon-glow" : "border-white/10"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-white/60 text-sm mb-6 h-10">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-[family-name:var(--font-display)] text-white">{plan.price}</span>
                  <span className="text-white/50">{plan.period}</span>
                </div>
              </div>

              <div className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-1 bg-primary/20 p-1 rounded-full text-primary">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span className="text-sm text-white/80">{feature}</span>
                  </div>
                ))}
              </div>

              <a
                href="#contact"
                className={`w-full py-4 rounded-full font-medium text-center transition-all duration-300 ${
                  plan.popular 
                    ? "bg-primary text-white hover:bg-primary/90 shadow-[0_0_20px_rgba(147,51,234,0.4)]" 
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                Get Started
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
