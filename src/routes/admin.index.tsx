import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Package, IndianRupee, TrendingUp, LogOut, Search, ChevronDown } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { useStore, type Order, type OrderStatus } from "@/lib/store";

const STATUSES: OrderStatus[] = ["pending", "processing", "shipped", "delivered", "cancelled"];

const statusColors: Record<OrderStatus, string> = {
  pending: "bg-amber-100 text-amber-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-indigo-100 text-indigo-700",
  delivered: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-rose-100 text-rose-700",
};

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Admin Dashboard — Angalaman" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const { isAdmin, orders, updateOrderStatus, logoutAdmin } = useStore();
  const navigate = useNavigate();
  const [hydrated, setHydrated] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<OrderStatus | "all">("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => { setHydrated(true); }, []);
  useEffect(() => {
    if (hydrated && !isAdmin) navigate({ to: "/admin/login" });
  }, [hydrated, isAdmin, navigate]);

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      if (filter !== "all" && o.status !== filter) return false;
      if (query) {
        const t = query.toLowerCase();
        return o.id.toLowerCase().includes(t) || o.customer.name.toLowerCase().includes(t) || o.customer.phone.includes(t);
      }
      return true;
    });
  }, [orders, filter, query]);

  const stats = useMemo(() => ({
    total: orders.length,
    revenue: orders.filter((o) => o.status !== "cancelled").reduce((s, o) => s + o.total, 0),
    pending: orders.filter((o) => o.status === "pending" || o.status === "processing").length,
  }), [orders]);

  if (!hydrated || !isAdmin) {
    return <Layout><section className="container mx-auto px-4 py-20 text-center text-sm text-muted-foreground">Checking access…</section></Layout>;
  }

  return (
    <Layout>
      <section className="container mx-auto px-4 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Admin</span>
            <h1 className="mt-1 font-serif text-3xl font-bold text-secondary md:text-4xl">Order Dashboard</h1>
            <p className="mt-1 text-sm text-muted-foreground">Manage incoming orders and update their fulfilment status.</p>
          </div>
          <button onClick={() => { logoutAdmin(); navigate({ to: "/" }); }} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-secondary hover:border-destructive hover:text-destructive">
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <StatCard icon={<Package className="h-5 w-5" />} label="Total Orders" value={stats.total.toString()} />
          <StatCard icon={<IndianRupee className="h-5 w-5" />} label="Revenue" value={`₹${stats.revenue.toLocaleString("en-IN")}`} />
          <StatCard icon={<TrendingUp className="h-5 w-5" />} label="To Fulfil" value={stats.pending.toString()} />
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-card">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by order ID, name, phone…" className="w-full rounded-full border border-input bg-background py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div className="flex flex-wrap gap-2">
            <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>All</FilterChip>
            {STATUSES.map((s) => (
              <FilterChip key={s} active={filter === s} onClick={() => setFilter(s)}>{s}</FilterChip>
            ))}
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">
              No orders found. Place a test order from the <Link to="/shop" className="text-primary hover:underline">shop</Link>.
            </div>
          ) : (
            filtered.map((o) => (
              <OrderRow key={o.id} order={o} open={expanded === o.id} onToggle={() => setExpanded(expanded === o.id ? null : o.id)} onStatus={(s) => updateOrderStatus(o.id, s)} />
            ))
          )}
        </div>
      </section>
    </Layout>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">{icon}</span>
      </div>
      <p className="mt-3 font-serif text-3xl font-bold text-secondary">{value}</p>
    </div>
  );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className={`rounded-full border px-3 py-1.5 text-xs font-semibold capitalize transition ${active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-foreground/70 hover:border-primary hover:text-primary"}`}>{children}</button>
  );
}

function OrderRow({ order, open, onToggle, onStatus }: { order: Order; open: boolean; onToggle: () => void; onStatus: (s: OrderStatus) => void }) {
  const date = new Date(order.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
      <button onClick={onToggle} className="flex w-full flex-wrap items-center gap-4 p-4 text-left hover:bg-muted/40">
        <div className="flex-1 min-w-[180px]">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-secondary">{order.id}</span>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${statusColors[order.status]}`}>{order.status}</span>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">{date}</p>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-secondary">{order.customer.name}</p>
          <p className="text-xs text-muted-foreground">{order.customer.phone}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-secondary">₹{order.total}</p>
          <p className="text-[11px] text-muted-foreground uppercase">{order.payment} · {order.items.length} items</p>
        </div>
        <ChevronDown className={`h-5 w-5 text-muted-foreground transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="grid gap-6 border-t border-border bg-muted/30 p-5 md:grid-cols-[1fr_300px]">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Items</h3>
            <ul className="mt-3 space-y-2">
              {order.items.map((it) => (
                <li key={it.id} className="flex items-center gap-3 rounded-lg bg-card p-2">
                  <img src={it.image} alt={it.name} className="h-12 w-12 rounded-lg object-cover" />
                  <div className="flex-1 text-sm">
                    <p className="font-semibold text-secondary">{it.name}</p>
                    <p className="text-xs text-muted-foreground">{it.weight} · Qty {it.qty}</p>
                  </div>
                  <span className="text-sm font-bold">₹{it.price * it.qty}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-4 space-y-1 text-sm">
              <Row label="Subtotal" value={`₹${order.subtotal}`} />
              <Row label="Shipping" value={order.shipping === 0 ? "Free" : `₹${order.shipping}`} />
              <Row label="Total" value={`₹${order.total}`} bold />
            </dl>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Shipping Address</h3>
              <div className="mt-2 rounded-lg bg-card p-3 text-sm">
                <p className="font-semibold">{order.customer.name}</p>
                <p className="text-muted-foreground">{order.customer.email}</p>
                <p className="text-muted-foreground">{order.customer.phone}</p>
                <p className="mt-1">{order.customer.address}</p>
                <p>{order.customer.city}, {order.customer.state} – {order.customer.pincode}</p>
                {order.customer.landmark && <p className="text-xs text-muted-foreground">Landmark: {order.customer.landmark}</p>}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Update Status</h3>
              <select value={order.status} onChange={(e) => onStatus(e.target.value as OrderStatus)} className="mt-2 w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm font-semibold capitalize focus:outline-none focus:ring-2 focus:ring-primary">
                {STATUSES.map((s) => <option key={s} value={s} className="capitalize">{s}</option>)}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex justify-between ${bold ? "border-t border-border pt-2 text-base font-bold text-secondary" : "text-muted-foreground"}`}>
      <dt>{label}</dt><dd>{value}</dd>
    </div>
  );
}