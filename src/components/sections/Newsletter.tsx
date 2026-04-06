import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Newsletter() {
  return (
    <section id="newsletter" className="mt-20 px-4 md:px-10 lg:max-w-[80%] mx-auto mb-10">
      <div className="relative overflow-hidden bg-gray-50/50 border border-gray-100 rounded-[3rem] p-10 md:p-20 shadow-[0_20px_50px_rgba(0,0,0,0.04)] text-center max-w-5xl mx-auto flex flex-col items-center justify-center fade-in-up">
        {/* Accents */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-[0.2em] mb-6">
             Join our Community
          </div>

          <h2 className="mb-6 text-4xl font-black text-gray-900 md:text-5xl tracking-tight">
            Stay in the loop.
          </h2>

          <p className="text-gray-500 mb-10 text-lg md:text-xl font-medium leading-relaxed max-w-xl mx-auto">
            Subscribe to our newsletter to get exclusive offers, expert home care tips, and be the first to know about new services.
          </p>

          <form className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-xl mx-auto" action="#">
            <Input
              type="email"
              placeholder="Enter your email address"
              required
              className="flex-1 rounded-full border-gray-200 bg-white shadow-sm py-7 px-8 text-base focus:bg-white focus:shadow-xl focus:border-primary/30 transition-all font-medium"
            />
            <Button type="submit" className="rounded-full bg-primary hover:bg-primary/90 text-white font-bold py-7 px-10 text-base shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all active:translate-y-0 w-full sm:w-auto">
              Subscribe Now
            </Button>
          </form>

          <p className="text-gray-400 mt-6 text-sm font-medium">
            We care about your data. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
