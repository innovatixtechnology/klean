import Image from "next/image";

export default function Banner() {
  return (
    <section id="banner" className="mt-20 px-4 md:px-10 lg:max-w-[80%] mx-auto">
      <div className="flex flex-col lg:flex-row gap-6 md:gap-4">
        <div className="relative w-full aspect-video md:aspect-1280/720">
          <Image src="/images/servicebanner1.webp" alt="HydraGlo facial treatments banner" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover rounded-3xl" />
        </div>
        <div className="relative w-full aspect-video md:aspect-1280/720">
          <Image src="/images/servicebanner2.webp" alt="Laser hair reduction banner" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover rounded-3xl" />
        </div>
      </div>
    </section>
  );
}