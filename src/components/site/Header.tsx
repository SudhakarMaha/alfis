import { Link } from "@tanstack/react-router";
import { ShoppingCart, Search, Menu, Heart, Leaf, X } from "lucide-react";
import { useState } from "react";
import { useStore } from "@/lib/store";

const nav = [
  { label: "Home", to: "/" as const },
  { label: "Shop", to: "/shop" as const },
  { label: "Categories", to: "/categories" as const },
  { label: "Our Story", to: "/story" as const },
  { label: "Contact", to: "/contact" as const },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { cartCount, wishlist } = useStore();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-lg">
      <div className="bg-gradient-earth text-secondary-foreground text-xs">
        <div className="container mx-auto flex h-8 items-center justify-between px-4">
          <span className="hidden sm:inline">Free shipping on orders above ₹499 · Handmade in our village</span>
          <span className="sm:hidden">Free shipping above ₹499</span>
          <span className="hidden md:inline">Call: +91 98765 43210</span>
        </div>
      </div>
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow">
            <Leaf className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="font-serif text-lg font-bold text-secondary">Angalaman</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Village Heritage Foods</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.label}
              to={n.to}
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: n.to === "/" }}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <Link to="/shop" className="rounded-full p-2 text-foreground/70 hover:bg-muted hover:text-primary" aria-label="Search">
            <Search className="h-5 w-5" />
          </Link>
          <Link to="/wishlist" className="relative hidden rounded-full p-2 text-foreground/70 hover:bg-muted hover:text-primary sm:inline-flex" aria-label="Wishlist">
            <Heart className="h-5 w-5" />
            {wishlist.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">{wishlist.length}</span>
            )}
          </Link>
          <Link to="/cart" className="relative rounded-full p-2 text-foreground/70 hover:bg-muted hover:text-primary" aria-label="Cart">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">{cartCount}</span>
            )}
          </Link>
          <button onClick={() => setOpen(!open)} className="rounded-full p-2 text-foreground/70 hover:bg-muted lg:hidden" aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="container mx-auto flex flex-col px-4 py-2">
            {nav.map((n) => (
              <Link key={n.label} to={n.to} onClick={() => setOpen(false)} className="border-b border-border/40 py-3 text-sm font-medium last:border-0">
                {n.label}
              </Link>
            ))}
            <Link to="/wishlist" onClick={() => setOpen(false)} className="border-b border-border/40 py-3 text-sm font-medium sm:hidden">
              Wishlist {wishlist.length > 0 && <span className="ml-1 text-primary">({wishlist.length})</span>}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
