import { CATEGORY } from "@/constants";
import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";

export default function Service() {
  return (
    <section id="services" className="mt-20 px-4 md:px-10 lg:max-w-[80%] mx-auto">
      <h2 className="text-center text-[#121212] text-3xl md:text-5xl font-inter font-bold">Services we offer</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center mt-12">
        {
          CATEGORY.map((service) => (
            <li key={service.text} className="flex flex-col items-center w-full max-w-sm mx-auto group">
              <Link href={`/service/${service.slug}` as Route} className="w-full">
                <div className="relative w-full aspect-[320/350]">
                  <Image src={service.img} alt={service.text} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover rounded-2xl" />
                </div>
                <h3 className="text-xl md:text-2xl text-[#121212] font-inter font-semibold my-4">{service.text}</h3>
                <p className="text-[#646464] font-inter text-sm md:text-base leading-relaxed">{service?.description}</p>
              </Link>
            </li>
          ))
        }
      </ul>
    </section>
  );
}