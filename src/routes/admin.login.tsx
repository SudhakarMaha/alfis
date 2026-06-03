import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Lock, User } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/admin/login")({
  head: () => ({ meta: [{ title: "Admin Login — Angalaman" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: AdminLogin,
});

function AdminLogin() {
  const { loginAdmin, isAdmin } = useStore();
  const navigate = useNavigate();
  const [u, setU] = useState("");
  const [p, setP] = useState("");

  useEffect(() => { if (isAdmin) navigate({ to: "/admin" }); }, [isAdmin, navigate]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (loginAdmin(u, p)) navigate({ to: "/admin" });
  };

  return (
    <Layout>
      <section className="container mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-card">
          <div className="mb-6 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow">
              <Lock className="h-6 w-6" />
            </div>
            <h1 className="mt-4 font-serif text-2xl font-bold text-secondary">Admin Login</h1>
            <p className="mt-1 text-xs text-muted-foreground">Authorized personnel only</p>
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            <label className="block">
              <span className="text-xs font-semibold text-muted-foreground">Username</span>
              <div className="relative mt-1">
                <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input value={u} onChange={(e) => setU(e.target.value)} required className="w-full rounded-lg border border-input bg-background py-2.5 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="admin" />
              </div>
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-muted-foreground">Password</span>
              <div className="relative mt-1">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input type="password" value={p} onChange={(e) => setP(e.target.value)} required className="w-full rounded-lg border border-input bg-background py-2.5 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="••••••••" />
              </div>
            </label>
            <button type="submit" className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:bg-primary/90">Sign In</button>
            <p className="text-center text-[11px] text-muted-foreground">Demo credentials — username: <span className="font-semibold">admin</span> · password: <span className="font-semibold">admin123</span></p>
          </form>
        </div>
      </section>
    </Layout>
  );
}