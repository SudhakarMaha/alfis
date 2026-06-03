import { Link } from "@tanstack/react-router";
import { ProductCard } from "./ProductCard";
import { products, bestsellers } from "@/lib/catalog";

export function FeaturedProducts({
  title = "Best Selling Products",
  kicker = "Loved by 10,000+ families",
  items,
}: { title?: string; kicker?: string; items?: typeof products }) {
  const list = (items ?? bestsellers).slice(0, 8);
  return (
    <section className="bg-gradient-warm py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-col items-center text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">{kicker}</span>
          <h2 className="mt-2 text-3xl font-bold text-secondary md:text-4xl">{title}</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {list.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
        <div className="mt-10 text-center">
          <Link to="/shop" className="inline-flex items-center justify-center rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground">
            View all products →
          </Link>
        </div>
      </div>
    </section>
  );
}
