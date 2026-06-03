import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Layout } from "@/components/site/Layout";
import { categories, categoryCount } from "@/lib/catalog";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "All Categories — Angalaman" },
      { name: "description", content: "Explore every category of our traditional village foods, masalas and millets." },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <Layout>
      <section className="border-b border-border bg-gradient-warm py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-secondary md:text-4xl">Browse Categories</h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">From hand-pounded masalas to stone-ground millet flours — choose a category to start shopping.</p>
        </div>
      </section>
      <section className="container mx-auto grid grid-cols-2 gap-4 px-4 py-12 sm:grid-cols-3 md:grid-cols-4">
        {categories.map((c, i) => (
          <motion.div key={c.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.04 }} whileHover={{ y: -4 }}>
            <Link to="/category/$slug" params={{ slug: c.slug }} className="group block rounded-2xl border border-border bg-card p-6 text-center shadow-card transition-shadow hover:shadow-glow">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-warm text-3xl ring-1 ring-border transition-transform group-hover:scale-110">{c.emoji}</div>
              <h2 className="mt-4 text-base font-bold text-foreground">{c.name}</h2>
              <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{c.description}</p>
              <span className="mt-3 inline-block text-xs font-semibold text-primary">{categoryCount(c.slug)} products →</span>
            </Link>
          </motion.div>
        ))}
      </section>
    </Layout>
  );
}
