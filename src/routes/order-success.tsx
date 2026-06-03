import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Package } from "lucide-react";
import { motion } from "framer-motion";
import { Layout } from "@/components/site/Layout";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";

const schema = z.object({
  id: fallback(z.string(), "ANG00000000").default("ANG00000000"),
  name: fallback(z.string(), "Guest").default("Guest"),
});

export const Route = createFileRoute("/order-success")({
  validateSearch: zodValidator(schema),
  head: () => ({ meta: [{ title: "Order Placed — Angalaman" }] }),
  component: OrderSuccess,
});

function OrderSuccess() {
  const { id, name } = Route.useSearch();
  return (
    <Layout>
      <section className="container mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 py-16 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 0.6 }}>
          <CheckCircle2 className="h-20 w-20 text-primary" />
        </motion.div>
        <h1 className="mt-6 font-serif text-3xl font-bold text-secondary md:text-4xl">Thank you, {name}!</h1>
        <p className="mt-2 text-muted-foreground">Your order has been placed successfully.</p>
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2 text-sm">
          <Package className="h-4 w-4 text-primary" /> Order ID: <span className="font-bold">{id}</span>
        </div>
        <p className="mt-6 max-w-md text-sm text-muted-foreground">We've sent a confirmation to your email. Your handmade village foods will reach you in 3–6 business days.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/shop" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Continue Shopping</Link>
          <Link to="/" className="rounded-full border border-border px-6 py-3 text-sm font-semibold hover:bg-muted">Back to Home</Link>
        </div>
      </section>
    </Layout>
  );
}
