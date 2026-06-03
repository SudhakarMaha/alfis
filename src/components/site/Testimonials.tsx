import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  { name: "Priya R.", city: "Chennai", text: "The biriyani masala is exactly like my grandmother used to make. Pure, fragrant and absolutely authentic!", rating: 5 },
  { name: "Arun K.", city: "Bengaluru", text: "Switched to their millet flour for my daughter. She loves the dosas and I love that it's chemical-free.", rating: 5 },
  { name: "Meera S.", city: "Coimbatore", text: "Pirandai thokku has helped my joint pain so much. Tastes amazing too — a true village treasure.", rating: 5 },
];

export function Testimonials() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Customer Love</span>
          <h2 className="mt-2 text-3xl font-bold text-secondary md:text-4xl">Trusted by thousands of families</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative rounded-2xl border border-border bg-card p-7 shadow-card"
            >
              <Quote className="absolute right-5 top-5 h-8 w-8 text-primary/20" />
              <div className="flex gap-0.5 text-amber-500">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/80">"{r.text}"</p>
              <div className="mt-5 border-t border-border pt-4">
                <div className="text-sm font-bold text-secondary">{r.name}</div>
                <div className="text-xs text-muted-foreground">{r.city}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}