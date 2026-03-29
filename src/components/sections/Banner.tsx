import Image from "next/image";

export default function Banner() {
  return (
    <section id="banner" className="mt-20 max-w-[80%] mx-auto">
      <div className="flex gap-4">
        <Image src="/images/hydra-facial-treatment1.webp" alt="corporate wellness" width={1280} height={720} />
        <Image src="/images/Laser-Banner.webp" alt="corporate wellness" width={1280} height={720} />
      </div>
    </section>
  );
}