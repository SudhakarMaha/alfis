import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import banner1 from "@/assets/banner1.asset.json";
import banner2 from "@/assets/banner2.asset.json";
import banner3 from "@/assets/banner3.asset.json";
import banner4 from "@/assets/banner4.asset.json";

const slides = [
  {
    img: banner1.url,
    tag: "Signature Masala",
    title: "Biriyani Masala Powder",
    desc: "Hand-pounded spice blend straight from our village kitchen. Aromatic, authentic, unforgettable.",
  },
  {
    img: banner2.url,
    tag: "Bestseller",
    title: "Chicken Masala Powder",
    desc: "Rich, slow-roasted spices that bring restaurant-style chicken curry to your home.",
  },
  {
    img: banner3.url,
    tag: "Herbal & Healthy",
    title: "Pirandai Thokku",
    desc: "Traditional medicinal pickle made fresh — strengthens bones, the way grandma made it.",
  },
  {
    img: banner4.url,
    tag: "South Indian Classic",
    title: "Rasam Powder",
    desc: "A heart-warming blend of sun-dried spices for the perfect bowl of rasam.",
  },
];

export function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    const id = setInterval(() => emblaApi.scrollNext(), 5500);
    return () => clearInterval(id);
  }, [emblaApi]);

  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  return (
    <section className="relative bg-gradient-warm">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((s, i) => (
            <div key={i} className="relative min-w-0 flex-[0_0_100%]">
              <div className="container mx-auto grid items-center gap-6 px-4 py-10 md:grid-cols-2 md:gap-10 md:py-20">
                <motion.div
                  key={`txt-${selected}-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: selected === i ? 1 : 0.5, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="order-2 md:order-1"
                >
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                    {s.tag}
                  </span>
                  <h1 className="mt-4 text-4xl font-bold leading-tight text-secondary md:text-6xl">
                    {s.title}
                  </h1>
                  <p className="mt-4 max-w-md text-base text-muted-foreground md:text-lg">{s.desc}</p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <button className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:scale-[1.02]">
                      Shop Now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                    <button className="rounded-full border-2 border-secondary px-6 py-3 text-sm font-semibold text-secondary transition hover:bg-secondary hover:text-secondary-foreground">
                      Explore Categories
                    </button>
                  </div>
                </motion.div>
                <motion.div
                  key={`img-${selected}-${i}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: selected === i ? 1 : 0.5, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="order-1 md:order-2"
                >
                  <div className="overflow-hidden rounded-3xl shadow-glow ring-1 ring-border">
                    <img src={s.img} alt={s.title} className="h-full w-full object-cover" />
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container mx-auto flex items-center justify-between px-4 pb-6">
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-2 rounded-full transition-all ${selected === i ? "w-8 bg-primary" : "w-2 bg-border"}`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={() => emblaApi?.scrollPrev()} className="rounded-full border border-border bg-card p-2 shadow-soft hover:bg-muted" aria-label="Previous">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button onClick={() => emblaApi?.scrollNext()} className="rounded-full border border-border bg-card p-2 shadow-soft hover:bg-muted" aria-label="Next">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}