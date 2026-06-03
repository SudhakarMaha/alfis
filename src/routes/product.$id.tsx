import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Minus, Plus, ShoppingCart, Star, Truck, ShieldCheck, RefreshCcw, Check } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { getProduct, getCategory, productsByCategory } from "@/lib/catalog";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    const category = getCategory(product.category)!;
    const related = productsByCategory(product.category).filter((p) => p.id !== product.id).slice(0, 4);
    return { product, category, related };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product.name ?? "Product"} — Angalaman` },
      { name: "description", content: loaderData?.product.description ?? "" },
      { property: "og:image", content: loaderData?.product.image ?? "" },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { product, category, related } = Route.useLoaderData();
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [qty, setQty] = useState(1);
  const navigate = Route.useNavigate();
  const wished = isWishlisted(product.id);
  const off = Math.round((1 - product.price / product.mrp) * 100);

  return (
    <Layout>
      <section className="container mx-auto px-4 py-8">
        <nav className="text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link> / <Link to="/shop" className="hover:text-primary">Shop</Link> /{" "}
          <Link to="/category/$slug" params={{ slug: category.slug }} className="hover:text-primary">{category.name}</Link> /{" "}
          <span className="text-foreground">{product.name}</span>
        </nav>
        <div className="mt-6 grid gap-10 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
            <div className="relative aspect-square">
              <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
              {product.tag && (
                <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase text-accent-foreground">{product.tag}</span>
              )}
            </div>
          </motion.div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">{category.name}</span>
            <h1 className="mt-2 font-serif text-3xl font-bold text-secondary md:text-4xl">{product.name}</h1>
            <div className="mt-3 flex items-center gap-3 text-sm">
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 font-semibold text-amber-700">
                <Star className="h-3.5 w-3.5 fill-current" /> {product.rating.toFixed(1)}
              </span>
              <span className="text-muted-foreground">{product.reviews} reviews</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">{product.weight}</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {product.highlights.map((h: string) => (
                <li key={h} className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> {h}</li>
              ))}
            </ul>
            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-secondary">₹{product.price}</span>
              <span className="text-base text-muted-foreground line-through">₹{product.mrp}</span>
              <span className="text-sm font-semibold text-primary">{off}% off</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Inclusive of all taxes · Free shipping above ₹499</p>
            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center rounded-full border border-border bg-card">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3" aria-label="Decrease"><Minus className="h-4 w-4" /></button>
                <span className="w-10 text-center text-sm font-semibold">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="p-3" aria-label="Increase"><Plus className="h-4 w-4" /></button>
              </div>
              <span className="text-xs text-muted-foreground">{product.stock} in stock</span>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                onClick={() => addToCart(product.id, qty)}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:bg-primary/90"
              >
                <ShoppingCart className="h-4 w-4" /> Add to Cart
              </button>
              <button
                onClick={() => { addToCart(product.id, qty); navigate({ to: "/checkout" }); }}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition hover:opacity-90"
              >
                Buy Now
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={cn("flex items-center justify-center rounded-full border px-4 py-3 transition", wished ? "border-destructive text-destructive" : "border-border hover:border-destructive hover:text-destructive")}
                aria-label="Wishlist"
              >
                <Heart className={cn("h-5 w-5", wished && "fill-destructive")} />
              </button>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3 rounded-2xl border border-border bg-card p-4 text-center text-xs">
              <div className="flex flex-col items-center gap-1"><Truck className="h-5 w-5 text-primary" /> Fast delivery</div>
              <div className="flex flex-col items-center gap-1"><ShieldCheck className="h-5 w-5 text-primary" /> 100% natural</div>
              <div className="flex flex-col items-center gap-1"><RefreshCcw className="h-5 w-5 text-primary" /> Easy returns</div>
            </div>
          </div>
        </div>
      </section>
      {related.length > 0 && (
        <section className="bg-gradient-warm py-14">
          <div className="container mx-auto px-4">
            <h2 className="mb-6 text-2xl font-bold text-secondary md:text-3xl">You may also like</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {related.map((p: import("@/lib/catalog").Product, i: number) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
