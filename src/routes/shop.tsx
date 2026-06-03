import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { categories, products } from "@/lib/catalog";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";

const searchSchema = z.object({
  category: fallback(z.string(), "").default(""),
  q: fallback(z.string(), "").default(""),
  sort: fallback(z.enum(["popular", "price-asc", "price-desc", "rating"]), "popular").default("popular"),
  min: fallback(z.number(), 0).default(0),
  max: fallback(z.number(), 1000).default(1000),
});

export const Route = createFileRoute("/shop")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Shop All Products — Angalaman" },
      { name: "description", content: "Browse our full range of traditional masalas, millets, mixes and pickles." },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const { category, q, sort, min, max } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = products.slice();
    if (category) list = list.filter((p) => p.category === category);
    if (q) {
      const t = q.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(t) || p.description.toLowerCase().includes(t));
    }
    list = list.filter((p) => p.price >= min && p.price <= max);
    switch (sort) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "rating": list.sort((a, b) => b.rating - a.rating); break;
      default: list.sort((a, b) => (b.tag === "Bestseller" ? 1 : 0) - (a.tag === "Bestseller" ? 1 : 0));
    }
    return list;
  }, [category, q, sort, min, max]);

  const activeCat = categories.find((c) => c.slug === category);

  const update = (patch: Partial<{ category: string; q: string; sort: typeof sort; min: number; max: number }>) =>
    navigate({ search: (prev: Record<string, unknown>) => ({ ...prev, ...patch }) });

  return (
    <Layout>
      <section className="border-b border-border bg-gradient-warm py-10">
        <div className="container mx-auto px-4">
          <nav className="text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link> / <span className="text-foreground">Shop</span>
            {activeCat && <> / <span className="text-foreground">{activeCat.name}</span></>}
          </nav>
          <h1 className="mt-3 text-3xl font-bold text-secondary md:text-4xl">{activeCat ? activeCat.name : "All Products"}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{filtered.length} products available</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          {/* Filters */}
          <aside className={`${showFilters ? "fixed inset-0 z-40 overflow-y-auto bg-background p-4" : "hidden"} lg:static lg:block`}>
            <div className="mb-4 flex items-center justify-between lg:hidden">
              <h2 className="text-lg font-bold">Filters</h2>
              <button onClick={() => setShowFilters(false)} aria-label="Close"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-6">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Search</label>
                <div className="relative mt-2">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="search"
                    value={q}
                    onChange={(e) => update({ q: e.target.value })}
                    placeholder="Search products..."
                    className="w-full rounded-full border border-input bg-card py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Category</h3>
                <ul className="mt-3 space-y-1">
                  <li>
                    <button onClick={() => update({ category: "" })} className={`w-full rounded-md px-3 py-2 text-left text-sm transition ${!category ? "bg-primary/10 font-semibold text-primary" : "hover:bg-muted"}`}>
                      All Categories
                    </button>
                  </li>
                  {categories.map((c) => (
                    <li key={c.slug}>
                      <button onClick={() => update({ category: c.slug })} className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition ${category === c.slug ? "bg-primary/10 font-semibold text-primary" : "hover:bg-muted"}`}>
                        <span>{c.emoji}</span> {c.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Price range</h3>
                <div className="mt-3 flex items-center gap-2">
                  <input type="number" value={min} min={0} onChange={(e) => update({ min: Number(e.target.value) || 0 })} className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm" />
                  <span className="text-muted-foreground">–</span>
                  <input type="number" value={max} min={0} onChange={(e) => update({ max: Number(e.target.value) || 1000 })} className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm" />
                </div>
              </div>
              <button onClick={() => navigate({ search: { category: "", q: "", sort: "popular", min: 0, max: 1000 } })} className="w-full rounded-full border border-border py-2 text-sm font-semibold hover:bg-muted">
                Reset filters
              </button>
            </div>
          </aside>

          {/* Results */}
          <div>
            <div className="mb-4 flex items-center justify-between gap-3">
              <button onClick={() => setShowFilters(true)} className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold lg:hidden">
                <SlidersHorizontal className="h-4 w-4" /> Filters
              </button>
              <select
                value={sort}
                onChange={(e) => update({ sort: e.target.value as typeof sort })}
                className="ml-auto rounded-full border border-input bg-card px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="popular">Sort: Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
                <p className="text-lg font-semibold">No products match your filters</p>
                <p className="mt-2 text-sm text-muted-foreground">Try adjusting your search or category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5">
                {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
