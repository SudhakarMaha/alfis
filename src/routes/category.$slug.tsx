import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { getCategory, productsByCategory } from "@/lib/catalog";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const category = getCategory(params.slug);
    if (!category) throw notFound();
    return { category, products: productsByCategory(params.slug) };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.category.name ?? "Category"} — Angalaman` },
      { name: "description", content: loaderData?.category.description ?? "" },
    ],
  }),
  component: CategoryPage,
});

function CategoryPage() {
  const { category, products } = Route.useLoaderData();
  return (
    <Layout>
      <section className="border-b border-border bg-gradient-warm py-10">
        <div className="container mx-auto px-4">
          <nav className="text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link> / <Link to="/categories" className="hover:text-primary">Categories</Link> / <span className="text-foreground">{category.name}</span>
          </nav>
          <div className="mt-3 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-card text-3xl shadow-card">{category.emoji}</div>
            <div>
              <h1 className="text-3xl font-bold text-secondary md:text-4xl">{category.name}</h1>
              <p className="text-sm text-muted-foreground">{category.description}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto px-4 py-10">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{products.length} products</p>
          <Link to="/shop" search={{ category: category.slug, q: "", sort: "popular", min: 0, max: 1000 }} className="text-sm font-semibold text-primary hover:underline">
            Open in shop with filters →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-5">
          {products.map((p: import("@/lib/catalog").Product, i: number) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>
    </Layout>
  );
}
