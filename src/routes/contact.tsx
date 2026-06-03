import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Mail, Phone, MapPin, MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";
import { Layout } from "@/components/site/Layout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Angalaman" },
      { name: "description", content: "Get in touch with the Angalaman village team for orders, queries and partnerships." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sending, setSending] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      toast.success("Message sent! We'll get back to you within 24 hours.");
      (e.target as HTMLFormElement).reset();
      setSending(false);
    }, 700);
  };

  return (
    <Layout>
      <section className="bg-gradient-earth py-14 text-secondary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl font-bold md:text-5xl">Get in touch</h1>
          <p className="mx-auto mt-3 max-w-xl text-sm opacity-90">We'd love to hear from you. Drop a message and our team will reply within 24 hours.</p>
        </div>
      </section>

      <section className="container mx-auto grid gap-10 px-4 py-14 md:grid-cols-2">
        <div className="space-y-4">
          {[
            { Icon: MapPin, title: "Visit us", lines: ["Angalaman Village", "Tamil Nadu, India 600001"] },
            { Icon: Phone, title: "Call us", lines: ["+91 98765 43210", "Mon–Sat · 9am to 7pm"] },
            { Icon: Mail, title: "Email us", lines: ["hello@angalaman.in", "support@angalaman.in"] },
            { Icon: MessageCircle, title: "WhatsApp", lines: ["+91 98765 43210", "For quick orders & queries"] },
          ].map(({ Icon, title, lines }) => (
            <div key={title} className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-card">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"><Icon className="h-6 w-6" /></div>
              <div>
                <h3 className="font-bold">{title}</h3>
                {lines.map((l) => <p key={l} className="text-sm text-muted-foreground">{l}</p>)}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={onSubmit} className="rounded-3xl border border-border bg-card p-6 shadow-card md:p-8">
          <h2 className="font-serif text-2xl font-bold text-secondary">Send us a message</h2>
          <div className="mt-6 space-y-4">
            <label className="block">
              <span className="text-xs font-semibold text-muted-foreground">Name *</span>
              <input required name="name" className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs font-semibold text-muted-foreground">Email *</span>
                <input required type="email" name="email" className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              </label>
              <label className="block">
                <span className="text-xs font-semibold text-muted-foreground">Phone</span>
                <input type="tel" name="phone" className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              </label>
            </div>
            <label className="block">
              <span className="text-xs font-semibold text-muted-foreground">Subject</span>
              <input name="subject" className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-muted-foreground">Message *</span>
              <textarea required name="message" rows={5} className="mt-1 w-full resize-none rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            </label>
            <button disabled={sending} type="submit" className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-glow hover:bg-primary/90 disabled:opacity-60">
              {sending ? "Sending..." : <>Send Message <Send className="h-4 w-4" /></>}
            </button>
          </div>
        </form>
      </section>
    </Layout>
  );
}
