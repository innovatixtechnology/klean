import Image from "next/image";
import { siteConfig } from "@/constants";
import NavMenu from "../Layout/NavMenu";
import MobileNav from "../Layout/MobileNav";
import { t } from "@/i18n"

export default function Hero() {
  return (
    <section id="hero" className="relative w-full h-[100dvh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Layer with Premium Effects */}
      <div className="z-0 inset-0 absolute">
        <Image
          src="/images/klean-hero.webp"
          alt="Klean Premium Cleaning"
          fill
          sizes="100vw"
          priority
          className="object-cover object-center"
        />
        {/* Subtle Overlay to ensure text readability while keeping image visible */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60" />
      </div>

      <header className="absolute top-0 left-0 right-0 z-50">
        <nav className="flex items-center justify-between px-6 py-6 lg:px-16 lg:py-8">
          <div className="flex items-center mix-blend-screen bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            <a href="/" className="text-3xl lg:text-4xl font-black tracking-tighter transition-all active:scale-95">
              {siteConfig.shortName.toUpperCase()}
              <span className="text-primary/70">.</span>
            </a>
          </div>

          {/* Responsive Menu Navigation */}
          <NavMenu className="text-white" />
          <MobileNav textColor="bg-white" />

        </nav>
      </header>

      {/* Core Content: Scalable and Responsive typography */}
      <div className="relative z-10 w-full max-w-7xl px-6 lg:px-16 flex flex-col gap-8 md:gap-12 md:mt-10">
        <div className="flex flex-col gap-6 text-center items-center lg:items-start lg:text-left">
          {/* Micro-badge for premium feel */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            {t("Hero.heading-top")}
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[1.1] tracking-tighter flex flex-col gap-2 lg:gap-4">
            <span>{t("Hero.heading-main")}</span>
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-indigo-400 pb-2">{t("Hero.heading-sub")}</span>
          </h1>

          <p className="text-gray-300 text-lg sm:text-xl lg:text-2xl max-w-2xl leading-relaxed font-medium">
            {t("Hero.description")}
          </p>
        </div>

        {/* CTAs with responsive layout */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <a href="#services" className="bg-white text-black px-10 py-5 rounded-2xl font-black text-lg hover:bg-gray-100 transition-all flex items-center justify-center gap-3 shadow-2xl hover:-translate-y-1 active:translate-y-0 group">
            {t("Hero.primary-cta")}
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <title>Right Arrow</title>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </a>
          <a href="/about" className="bg-white/5 backdrop-blur-xl text-white border border-white/20 px-10 py-5 rounded-2xl font-black text-lg hover:bg-white/10 transition-all text-center">
            {t("Hero.secondary-cta")}
          </a>
        </div>
      </div>

      {/* Modern Accents */}
      <div className="absolute top-1/4 -right-20 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}
