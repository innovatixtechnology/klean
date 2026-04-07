import { FOOTER_TURSTS } from "@/constants";
import { CheckCircleIcon } from "@/components/icons";

export default function Achievements() {
  return (
    <section id="achievements" className="mt-24 px-6 md:px-10 lg:max-w-[1240px] mx-auto py-16 overflow-hidden">
      <div className="flex flex-col items-center mb-16 text-center">
        <h2 className="text-[#121212] text-3xl md:text-5xl font-inter font-bold tracking-tight mb-4">
          Trust & Safety
        </h2>
        <div className="h-1.5 w-24 bg-primary/20 rounded-full overflow-hidden">
          <div className="h-full w-1/3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 xl:gap-12">
        {FOOTER_TURSTS.map((trust) => (
          <div key={trust} className="flex flex-col items-center text-center group">
            <div className="relative mb-8">
              {/* Animated Background Blur */}
              <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-700" />
              
              {/* Icon Container */}
              <div className="relative bg-gradient-to-b from-[#FFEBF2] to-white rounded-[40px] md:rounded-[50px] p-8 md:p-10 border border-primary/5 shadow-sm transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-xl group-hover:shadow-primary/5">
                <CheckCircleIcon className="text-primary size-10 md:size-12 stroke-[1.5px]" />
              </div>
            </div>
            
            <h3 className="text-[#121212] text-xl md:text-2xl font-inter font-bold tracking-tight px-4 leading-snug transition-colors duration-300 group-hover:text-primary">
              {trust}
            </h3>
            
            <div className="mt-6 h-1 w-0 bg-primary/20 rounded-full transition-all duration-500 ease-in-out group-hover:w-12" />
          </div>
        ))}
      </div>
    </section>
  )
}