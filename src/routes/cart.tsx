import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Cart — Angalaman" }] }),
  component: CartPage,
});

function CartPage() {
  const { cartDetailed, updateQty, removeFromCart, cartTotal, clearCart } = useStore();
  const shipping = cartTotal > 499 || cartTotal === 0 ? 0 : 49;
  const total = cartTotal + shipping;

  return (
    <Layout>
      <section className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-secondary md:text-4xl">Your Cart</h1>
        <p className="mt-1 text-sm text-muted-foreground">{cartDetailed.length} item{cartDetailed.length === 1 ? "" : "s"}</p>

        {cartDetailed.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-dashed border-border bg-card p-12 text-center">
            <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-lg font-semibold">Your cart is empty</p>
            <p className="mt-2 text-sm text-muted-foreground">Browse our handmade village foods and start adding items.</p>
            <Link to="/shop" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              Start Shopping <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="space-y-4">
              {cartDetailed.map(({ product, qty }) => (
                <div key={product.id} className="flex gap-4 rounded-2xl border border-border bg-card p-4 shadow-card">
                  <Link to="/product/$id" params={{ id: product.id }} className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-muted">
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <Link to="/product/$id" params={{ id: product.id }} className="text-sm font-semibold hover:text-primary md:text-base">{product.name}</Link>
                    <p className="text-xs text-muted-foreground">{product.weight}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-border">
                        <button onClick={() => updateQty(product.id, qty - 1)} className="p-2" aria-label="Decrease"><Minus className="h-3.5 w-3.5" /></button>
                        <span className="w-8 text-center text-sm font-semibold">{qty}</span>
                        <button onClick={() => updateQty(product.id, qty + 1)} className="p-2" aria-label="Increase"><Plus className="h-3.5 w-3.5" /></button>
                      </div>
                      <div className="text-right">
                        <div className="text-base font-bold text-secondary">₹{product.price * qty}</div>
                        <button onClick={() => removeFromCart(product.id)} className="mt-1 inline-flex items-center gap-1 text-xs text-destructive hover:underline">
                          <Trash2 className="h-3 w-3" /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={clearCart} className="text-xs font-semibold text-muted-foreground hover:text-destructive">Clear cart</button>
            </div>
            <aside className="sticky top-24 h-fit rounded-2xl border border-border bg-card p-6 shadow-card">
              <h2 className="text-lg font-bold">Order Summary</h2>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>₹{cartTotal}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd>{shipping === 0 ? <span className="text-primary">Free</span> : `₹${shipping}`}</dd></div>
                <div className="my-2 border-t border-border" />
                <div className="flex justify-between text-base font-bold"><dt>Total</dt><dd>₹{total}</dd></div>
              </dl>
              {cartTotal < 499 && cartTotal > 0 && (
                <p className="mt-3 rounded-md bg-accent/20 p-2 text-xs text-secondary">Add ₹{499 - cartTotal} more for free shipping!</p>
              )}
              <Link to="/checkout" className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-glow hover:bg-primary/90">
                Checkout <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/shop" className="mt-3 block text-center text-xs font-semibold text-primary hover:underline">Continue shopping</Link>
            </aside>
          </div>
        )}
      </section>
    </Layout>
  );
}
