import { MessageCircle, Phone } from "lucide-react";

export function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <a
        href="tel:+919876543210"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-glow transition hover:scale-110"
        aria-label="Call"
      >
        <Phone className="h-5 w-5" />
      </a>
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noreferrer"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-glow transition hover:scale-110"
        aria-label="WhatsApp"
      >
        <MessageCircle className="h-5 w-5" />
      </a>
    </div>
  );
}