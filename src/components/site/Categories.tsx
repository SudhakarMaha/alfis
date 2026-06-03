import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { categories, categoryCount } from "@/lib/catalog";

export function Categories() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Shop by Category</span>
            <h2 className="mt-2 text-3xl font-bold text-secondary md:text-4xl">From Our Village Kitchen</h2>
          </div>
          <Link to="/categories" className="hidden text-sm font-semibold text-primary hover:underline md:inline">View all →</Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-5 lg:grid-cols-6">
          {categories.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              whileHover={{ y: -4 }}
            >
              <Link
                to="/category/$slug"
                params={{ slug: c.slug }}
                className="group flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-5 text-center shadow-card transition-shadow hover:shadow-glow"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-warm text-2xl ring-1 ring-border transition-transform group-hover:scale-110">
                  {c.emoji}
                </div>
                <h3 className="mt-3 text-sm font-semibold text-foreground">{c.name}</h3>
                <span className="mt-1 text-xs text-muted-foreground">{categoryCount(c.slug)} items</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
