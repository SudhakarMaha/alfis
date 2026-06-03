import { Leaf, Instagram, Facebook, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto grid gap-10 px-4 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <Leaf className="h-5 w-5" />
            </div>
            <div className="font-serif text-lg font-bold">Angalaman</div>
          </div>
          <p className="mt-4 text-sm text-secondary-foreground/70">
            Traditional village foods, handmade with love and delivered fresh to your doorstep.
          </p>
          <div className="mt-5 flex gap-2">
            {[Instagram, Facebook, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary-foreground/10 transition hover:bg-accent hover:text-accent-foreground">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        {[
          { title: "Shop", items: ["All Products", "Masalas", "Millet Flour", "Pickles", "Health Mix"] },
          { title: "Company", items: ["About Us", "Our Story", "Blog", "Contact", "FAQ"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-bold uppercase tracking-wider text-accent">{col.title}</h4>
            <ul className="mt-4 space-y-2 text-sm text-secondary-foreground/70">
              {col.items.map((it) => (
                <li key={it}><a href="#" className="hover:text-accent">{it}</a></li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-accent">Get in touch</h4>
          <ul className="mt-4 space-y-3 text-sm text-secondary-foreground/70">
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" /><span>Angalaman Village, Tamil Nadu, India</span></li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0" /><span>+91 98765 43210</span></li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0" /><span>hello@angalaman.in</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-secondary-foreground/10">
        <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-secondary-foreground/60 md:flex-row">
          <span>© {new Date().getFullYear()} Angalaman Village Heritage Foods. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-accent">Privacy</a>
            <a href="#" className="hover:text-accent">Terms</a>
            <a href="#" className="hover:text-accent">Shipping</a>
            <Link to="/admin/login" className="hover:text-accent">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}