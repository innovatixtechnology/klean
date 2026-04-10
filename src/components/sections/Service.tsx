import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { getAllCategories } from "@/actions";

export default async function Service() {
  const data = await getAllCategories();
  return (
    <section id="services" className="mt-20 px-4 md:px-10 lg:max-w-[95%] xl:max-w-[1440px] mx-auto py-16">
      <div className="flex flex-col items-center mb-16 text-center">
        <h2 className="text-[#121212] text-3xl md:text-5xl font-inter font-bold tracking-tight mb-4">
          Services We Offer
        </h2>
        <div className="h-1.5 w-24 bg-primary/20 rounded-full overflow-hidden">
          <div className="h-full w-1/3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-6 gap-y-12">
        {data.map((service) => (
          <div key={service.slug} className="group relative flex flex-col items-center w-full">
            <Link href={`/service/${service.slug}` as Route} className="w-full h-full flex flex-col">
              <div className="relative w-full aspect-[280/320] overflow-hidden rounded-[2rem] bg-gray-50 shadow-sm border border-neutral-100 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary/20">
                <Image
                  src={`/images/${service.slug}.webp`}
                  alt={service.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px] flex flex-col items-center justify-center p-6">
                  <div className="transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 ease-out">
                    <Button 
                      variant="secondary" 
                      className="rounded-full px-8 py-6 bg-white text-black hover:bg-neutral-100 text-base font-semibold shadow-xl flex items-center gap-2 group/btn"
                    >
                      View Service
                      <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex flex-col items-center text-center px-1 flex-grow">
                <h3 className="text-lg xl:text-xl text-[#121212] font-inter font-bold tracking-tight mb-2 transition-colors duration-300 group-hover:text-primary">
                  {service.name}
                </h3>
                <p className="text-[#646464] font-inter text-xs lg:text-sm leading-relaxed line-clamp-3">
                  {service?.description}
                </p>
                
                <div className="mt-auto pt-4 flex items-center gap-1.5 text-primary font-bold text-[10px] xl:text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  Explore now <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}