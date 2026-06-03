import { motion } from "framer-motion";
import { Play } from "lucide-react";

// YouTube Shorts highlighting village cooking / traditional food
const shorts = [
  { id: "8YwO7BTGZcU", title: "Traditional Pongal in our village kitchen" },
  { id: "2WiTOLHO3Ks", title: "Hand-pounded masala podi" },
  { id: "OUuVOmcMUjI", title: "Stone-ground millet flour" },
  { id: "Yto9TBmaqMQ", title: "Sun-cured mango pickle" },
];

export function ShortsSection() {
  return (
    <section className="bg-gradient-warm py-14">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Watch</span>
            <h2 className="mt-1 font-serif text-3xl font-bold text-secondary md:text-4xl">From Our Village Kitchen</h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">Short videos of our women making traditional foods by hand — exactly as they have for generations.</p>
          </div>
          <a href="https://www.youtube.com/results?search_query=village+cooking+tamil+nadu" target="_blank" rel="noopener noreferrer" className="hidden rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-secondary hover:border-primary hover:text-primary md:inline-flex">View all</a>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {shorts.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-card"
            >
              <div className="relative aspect-[9/16] w-full bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${s.id}?rel=0&modestbranding=1&playsinline=1`}
                  title={s.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
              <div className="p-3">
                <p className="line-clamp-2 text-xs font-semibold text-secondary md:text-sm">{s.title}</p>
                <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
                  <Play className="h-3 w-3" /> YouTube Short
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}