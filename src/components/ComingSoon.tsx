import { t } from "@/i18n";

export default function ComingSoon() {
  return (
    <section
      id="coming-soon"
      className="h-[calc(100vh-12rem)] px-6 flex flex-col items-center text-center justify-center">
      <h1 className="text-5xl text-primary font-bold mb-8 animate-pulse">
        {t("ComingSoon.heading")}
      </h1>
      <p className="text-primary text-balance text-center text-lg mb-8">
        {t("ComingSoon.message")}
      </p>
    </section>
  );
}
