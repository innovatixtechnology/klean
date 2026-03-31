import { CATEGORY, SERVICES } from "@/constants";
import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";

export default function Service() {
  return (
    <section id="services" className="mt-20 px-4 md:px-10 lg:max-w-[80%] mx-auto">
      <h2 className="text-center text-[#121212] text-3xl md:text-5xl font-inter font-bold">Services we offer</h2>
      <ul className="flex flex-col lg:flex-row justify-between items-center lg:items-start text-center mt-12 gap-12 lg:gap-8">
        {
          SERVICES.map((service) => (
            <li key={service.text} className="flex flex-col items-center max-w-[350px]">
              <div className="relative w-full aspect-[320/350]">
                <Image src={service.img} alt={service.text} fill className="object-cover rounded-2xl" />
              </div>
              <h3 className="text-xl md:text-2xl text-[#121212] font-inter font-semibold my-4">{service.text}</h3>
              <p className="text-[#646464] font-inter text-sm md:text-base leading-relaxed">{service.subText}</p>
            </li>
          ))
        }
      </ul>
      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 items-center mt-20 gap-8">
        {
          CATEGORY.map((category) => (
            <li key={category.text} className="flex flex-col justify-center items-center group cursor-pointer">
              <Link href={`/service/${category.slug}` as Route}>
                <div className="relative w-24 h-24 md:w-32 md:h-32 transition-transform group-hover:scale-105">
                  <Image src={category.img} alt={category.text} fill className="object-contain" />
                </div>
                <p className="text-[#121212] text-sm md:text-base font-semibold font-inter w-full text-center mt-4">{category.text}</p>
              </Link>
            </li>
          ))
        }
      </ul>
    </section>
  );
}