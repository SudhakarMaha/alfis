import { motion } from "framer-motion";
import { Leaf, Heart, Users } from "lucide-react";

export function VillageStory() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto grid items-center gap-10 px-4 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-earth shadow-glow">
            <img
              src="https://images.unsplash.com/photo-1605007493699-af65834f8a00?w=900&q=80"
              alt="Village farming"
              className="h-full w-full object-cover opacity-90 mix-blend-overlay"
            />
          </div>
          <div className="absolute -bottom-6 -right-4 rounded-2xl bg-card p-5 shadow-glow ring-1 ring-border md:-right-8">
            <div className="text-3xl font-bold text-primary">25+</div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Years of tradition</div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Our Story</span>
          <h2 className="mt-2 text-3xl font-bold text-secondary md:text-5xl">
            Direct from our village,<br />
            <span className="italic text-primary">made with love</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            Every packet of masala, every spoon of thokku, every handful of millet flour is
            prepared by the women of our village using methods passed down through generations.
            No machines, no shortcuts — just sun, stone, and patience.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { icon: Leaf, label: "100% Natural" },
              { icon: Heart, label: "Handmade" },
              { icon: Users, label: "Women-led" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="rounded-xl border border-border bg-card p-4 text-center shadow-card">
                <Icon className="mx-auto h-6 w-6 text-primary" />
                <div className="mt-2 text-xs font-semibold text-foreground">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}