import { motion } from "framer-motion";
import { Leaf, ShieldCheck, Home, HeartPulse, Truck, Award } from "lucide-react";

const features = [
  { icon: Leaf, title: "100% Natural Ingredients", desc: "Sourced from organic village farms" },
  { icon: ShieldCheck, title: "Zero Chemicals", desc: "No preservatives, colors or additives" },
  { icon: Home, title: "Village Made", desc: "Handcrafted by traditional artisans" },
  { icon: HeartPulse, title: "Healthy Goodness", desc: "Nutrient-rich, traditional recipes" },
  { icon: Truck, title: "Fast Delivery", desc: "Pan-India shipping in 3-5 days" },
  { icon: Award, title: "Quality Promise", desc: "Lab-tested for purity & safety" },
];

export function WhyChooseUs() {
  return (
    <section className="bg-secondary py-16 text-secondary-foreground md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">Why Choose Us</span>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">Heritage you can taste, quality you can trust</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-2xl border border-secondary-foreground/10 bg-secondary-foreground/5 p-6 backdrop-blur transition hover:bg-secondary-foreground/10"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-base font-bold md:text-lg">{f.title}</h3>
              <p className="mt-1 text-sm text-secondary-foreground/70">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}