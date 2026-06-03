import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Leaf, Heart, Hand, Users } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import banner1 from "@/assets/banner1.asset.json";
import banner3 from "@/assets/banner3.asset.json";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "Our Story — Angalaman Village Heritage Foods" },
      { name: "description", content: "From our village kitchens to your home — meet the women, farmers and traditions behind every Angalaman product." },
    ],
  }),
  component: StoryPage,
});

const values = [
  { Icon: Leaf, title: "100% Natural", text: "No preservatives, no colours, no chemicals. Ever." },
  { Icon: Hand, title: "Handmade", text: "Stone-pounded, sun-cured, slow-cooked the old way." },
  { Icon: Users, title: "Women-led", text: "Empowering 60+ village women with fair wages." },
  { Icon: Heart, title: "Made with love", text: "Every batch tastes like grandma's kitchen." },
];

export function StoryPage() {
  return (
    <Layout>
      <section className="relative overflow-hidden bg-gradient-earth py-20 text-secondary-foreground">
        <div className="container mx-auto px-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">Our Story</span>
          <h1 className="mt-3 font-serif text-4xl font-bold md:text-5xl">From our village to your kitchen</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm opacity-90 md:text-base">Angalaman is a small village in Tamil Nadu where time still moves with the seasons. Our story begins in the kitchens of grandmothers who refused to let tradition disappear.</p>
        </div>
      </section>

      <section className="container mx-auto grid gap-10 px-4 py-16 md:grid-cols-2 md:items-center">
        <motion.img initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} src={banner1.url} alt="Village kitchen" className="rounded-3xl shadow-card" />
        <div>
          <h2 className="font-serif text-3xl font-bold text-secondary">Hand-pounded. Sun-dried. Honest.</h2>
          <p className="mt-4 text-muted-foreground">Every masala, every podi, every pickle in our range is made the way our ancestors made it — slowly, mindfully, in small batches. We source spices directly from local farmers, dry them under the village sun, and pound them on traditional stone grinders.</p>
          <p className="mt-3 text-muted-foreground">No factory shortcuts. No mystery additives. Just the real flavours of home.</p>
        </div>
      </section>

      <section className="bg-gradient-warm py-16">
        <div className="container mx-auto grid gap-10 px-4 md:grid-cols-2 md:items-center">
          <div className="order-2 md:order-1">
            <h2 className="font-serif text-3xl font-bold text-secondary">Empowering village women</h2>
            <p className="mt-4 text-muted-foreground">Behind every package is a story of a woman who has reclaimed her craft. Our 60+ women artisans receive fair wages, healthcare and training — and their families thrive because of it.</p>
            <p className="mt-3 text-muted-foreground">When you buy from us, you're not just choosing healthier food. You're choosing a livelihood, a tradition, and a future for an entire village.</p>
          </div>
          <motion.img initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} src={banner3.url} alt="Village women" className="order-1 rounded-3xl shadow-card md:order-2" />
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-center font-serif text-3xl font-bold text-secondary">What we stand for</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 md:grid-cols-4">
          {values.map(({ Icon, title, text }, i) => (
            <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="rounded-2xl border border-border bg-card p-6 text-center shadow-card">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary"><Icon className="h-6 w-6" /></div>
              <h3 className="mt-4 font-bold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
