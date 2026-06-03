import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ShieldCheck, Truck, CreditCard } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { useStore, type Order } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Angalaman" }] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { cartDetailed, cartTotal, clearCart, addOrder } = useStore();
  const navigate = Route.useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [payment, setPayment] = useState<"cod" | "upi" | "card">("cod");
  const shipping = cartTotal > 499 || cartTotal === 0 ? 0 : 49;
  const total = cartTotal + shipping;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cartDetailed.length === 0) { toast.error("Your cart is empty"); return; }
    const form = new FormData(e.currentTarget);
    setSubmitting(true);
    setTimeout(() => {
      const orderId = `ANG${Date.now().toString().slice(-8)}`;
      const order: Order = {
        id: orderId,
        createdAt: Date.now(),
        status: "pending",
        customer: {
          name: String(form.get("name") || ""),
          email: String(form.get("email") || ""),
          phone: String(form.get("phone") || ""),
          address: String(form.get("address") || ""),
          city: String(form.get("city") || ""),
          state: String(form.get("state") || ""),
          pincode: String(form.get("pincode") || ""),
          landmark: String(form.get("landmark") || ""),
        },
        items: cartDetailed.map(({ product, qty }) => ({
          id: product.id, name: product.name, price: product.price, qty, image: product.image, weight: product.weight,
        })),
        subtotal: cartTotal,
        shipping,
        total,
        payment,
      };
      addOrder(order);
      clearCart();
      navigate({ to: "/order-success", search: { id: orderId, name: String(form.get("name") || "Guest") } });
    }, 800);
  };

  if (cartDetailed.length === 0) {
    return (
      <Layout>
        <section className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold">Your cart is empty</h1>
          <Link to="/shop" className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Continue shopping</Link>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-secondary md:text-4xl">Checkout</h1>
        <form onSubmit={onSubmit} className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-8">
            <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h2 className="text-lg font-bold">Shipping Address</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Field name="name" label="Full Name" required />
                <Field name="phone" label="Phone Number" type="tel" required />
                <Field name="email" label="Email" type="email" required className="md:col-span-2" />
                <Field name="address" label="Address" required className="md:col-span-2" />
                <Field name="city" label="City" required />
                <Field name="state" label="State" required />
                <Field name="pincode" label="PIN Code" required />
                <Field name="landmark" label="Landmark (optional)" />
              </div>
            </section>
            <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h2 className="text-lg font-bold">Payment Method</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {([
                  { v: "cod", l: "Cash on Delivery", d: "Pay when you receive" },
                  { v: "upi", l: "UPI", d: "GPay, PhonePe, Paytm" },
                  { v: "card", l: "Card", d: "Debit / Credit" },
                ] as const).map((opt) => (
                  <label key={opt.v} className={`cursor-pointer rounded-xl border-2 p-4 transition ${payment === opt.v ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}>
                    <input type="radio" name="payment" value={opt.v} checked={payment === opt.v} onChange={() => setPayment(opt.v)} className="sr-only" />
                    <div className="flex items-center gap-2 text-sm font-bold"><CreditCard className="h-4 w-4 text-primary" /> {opt.l}</div>
                    <p className="mt-1 text-xs text-muted-foreground">{opt.d}</p>
                  </label>
                ))}
              </div>
            </section>
          </div>
          <aside className="sticky top-24 h-fit space-y-4 rounded-2xl border border-border bg-card p-6 shadow-card">
            <h2 className="text-lg font-bold">Order Summary</h2>
            <ul className="space-y-3 border-b border-border pb-4">
              {cartDetailed.map(({ product, qty }) => (
                <li key={product.id} className="flex gap-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-muted">
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">{qty}</span>
                  </div>
                  <div className="flex-1 text-xs">
                    <p className="line-clamp-2 font-semibold">{product.name}</p>
                    <p className="text-muted-foreground">{product.weight}</p>
                  </div>
                  <div className="text-sm font-bold">₹{product.price * qty}</div>
                </li>
              ))}
            </ul>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>₹{cartTotal}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd>{shipping === 0 ? <span className="text-primary">Free</span> : `₹${shipping}`}</dd></div>
              <div className="my-2 border-t border-border" />
              <div className="flex justify-between text-lg font-bold"><dt>Total</dt><dd>₹{total}</dd></div>
            </dl>
            <button type="submit" disabled={submitting} className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:bg-primary/90 disabled:opacity-60">
              {submitting ? "Placing order..." : `Place Order · ₹${total}`}
            </button>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-primary" /> Secure checkout</p>
              <p className="flex items-center gap-2"><Truck className="h-3.5 w-3.5 text-primary" /> Delivers in 3–6 days</p>
            </div>
          </aside>
        </form>
      </section>
    </Layout>
  );
}

function Field({ name, label, type = "text", required, className }: { name: string; label: string; type?: string; required?: boolean; className?: string }) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="text-xs font-semibold text-muted-foreground">{label}{required && " *"}</span>
      <input name={name} type={type} required={required} className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
    </label>
  );
}
