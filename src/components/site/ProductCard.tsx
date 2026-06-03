import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Star, ShoppingCart, Heart } from "lucide-react";
import type { Product } from "@/lib/catalog";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const wished = isWishlisted(product.id);
  const off = Math.round((1 - product.price / product.mrp) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.3) }}
      whileHover={{ y: -4 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-shadow hover:shadow-glow"
    >
      <Link to="/product/$id" params={{ id: product.id }} className="relative block aspect-square overflow-hidden bg-muted">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
        {product.tag ? (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-foreground">{product.tag}</span>
        ) : null}
        <button
          onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
          className="absolute right-3 top-3 rounded-full bg-card/90 p-2 backdrop-blur transition hover:scale-110"
          aria-label="Wishlist"
        >
          <Heart className={cn("h-4 w-4", wished ? "fill-destructive text-destructive" : "text-secondary")} />
        </button>
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-1 text-xs text-amber-600">
          <Star className="h-3.5 w-3.5 fill-current" />
          <span className="font-semibold">{product.rating.toFixed(1)}</span>
          <span className="text-muted-foreground">({product.reviews})</span>
          <span className="ml-auto text-muted-foreground">{product.weight}</span>
        </div>
        <Link to="/product/$id" params={{ id: product.id }} className="mt-2 line-clamp-2 text-sm font-semibold text-foreground hover:text-primary md:text-base">
          {product.name}
        </Link>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-bold text-secondary">₹{product.price}</span>
          <span className="text-xs text-muted-foreground line-through">₹{product.mrp}</span>
          <span className="text-xs font-semibold text-primary">{off}% off</span>
        </div>
        <button
          onClick={() => addToCart(product.id)}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-2.5 text-xs font-semibold text-primary-foreground transition hover:bg-primary/90"
        >
          <ShoppingCart className="h-4 w-4" /> Add to Cart
        </button>
      </div>
    </motion.div>
  );
}
