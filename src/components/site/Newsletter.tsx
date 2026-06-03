export function Newsletter() {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="overflow-hidden rounded-3xl bg-gradient-hero p-8 text-center text-primary-foreground shadow-glow md:p-14">
          <h2 className="text-3xl font-bold md:text-4xl">Get village-fresh deals in your inbox</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm opacity-90 md:text-base">
            Subscribe and get 10% off your first order plus traditional recipes every week.
          </p>
          <form className="mx-auto mt-7 flex max-w-md flex-col gap-2 sm:flex-row">
            <input
              type="email"
              required
              placeholder="your@email.com"
              className="flex-1 rounded-full bg-card px-5 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button className="rounded-full bg-accent px-6 py-3 text-sm font-bold text-accent-foreground transition hover:scale-[1.03]">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}