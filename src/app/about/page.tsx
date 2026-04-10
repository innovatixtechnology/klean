import Image from "next/image";

export default function About() {
  return (
    <div className="bg-white min-h-screen font-sans selection:bg-primary/10 selection:text-primary">
      {/* Hero / About Header */}
      <section id="about" className="pt-20 pb-20 px-6 lg:px-16 max-w-7xl mx-auto overflow-hidden">
        <div className="animate-slide-up">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-16 text-gray-900">
            About <span className="text-primary italic">Klean Company.</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
          {/* Left: Founder Image (lg:col-span-5) */}
          <div className="lg:col-span-5 relative group animate-fade-in delay-200">
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl transition-transform duration-700 hover:scale-[1.02]">
               <Image 
                src="/images/owners_images.png" 
                alt="Sanchita Dhariwal - Founder of Klean Company" 
                  fill 
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
               <div className="absolute bottom-10 left-10 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-3xl font-black tracking-tight mb-1">Sanchita Dhariwal</p>
                  <p className="text-white/90 text-sm font-bold uppercase tracking-widest flex items-center gap-3">
                    <span className="w-8 h-[2px] bg-primary"></span>
                    Founder, Klean Company
                  </p>
               </div>
            </div>
            
            {/* Decorative element */}
            <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full border-2 border-primary/20 rounded-[3rem] translate-x-4 translate-y-4" />
          </div>

          {/* Right: Founder Message (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col justify-center gap-10 animate-slide-up delay-300">
             <div className="space-y-8">
                <div className="relative">
                  <span className="absolute -left-10 -top-6 text-9xl text-primary/5 font-serif select-none">“</span>
                  <p className="text-2xl md:text-4xl font-extrabold leading-tight text-gray-900 tracking-tight italic">
                     Klean Company is not just a service — it’s a promise.
                  </p>
                </div>
                
                <div className="space-y-6 text-lg text-gray-600 leading-relaxed font-medium">
                  <p>
                     Like many of you, I’ve faced the struggle of finding reliable help for everyday home needs. 
                     That’s exactly why I created Klean Company — a place where you can find trusted services without the stress.
                  </p>

                  <p>
                     Klean Company is not just a company, it’s a commitment to making your life easier, cleaner, and more comfortable. 
                     Every service we offer is designed with care, quality, and your convenience in mind.
                  </p>

                  <p>
                     Klean Company was built with a simple vision — to make everyday home services reliable, professional, and truly hassle-free. 
                     What started as an idea to simplify daily living has now grown into a platform that brings multiple essential services under one trusted name.
                  </p>

                  <p>
                     I believe your home deserves the best — whether it’s cleaning, repairs, grooming, or daily essentials. 
                     With Klean Company, my goal is to ensure every service feels effortless, premium, and dependable.
                  </p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-32 bg-gray-50/50 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-blue-500/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-7xl mx-auto px-6 lg:px-16 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          
          {/* Mission */}
          <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100 group hover:-translate-y-3 transition-all duration-700 fade-in-up">
             <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-10 group-hover:bg-primary group-hover:rotate-6 transition-all duration-500">
                <span className="text-4xl group-hover:scale-110 transition-transform">🎯</span>
             </div>
             <h2 className="text-4xl font-black tracking-tighter mb-8 text-gray-900">MISSION</h2>
             <div className="space-y-6">
                <p className="text-xl text-gray-800 leading-relaxed font-bold">
                   At Klean Company, our mission is to simplify everyday living by delivering reliable, high-quality home services that you can truly depend on.
                </p>
                <div className="space-y-4 text-gray-500 leading-relaxed">
                  <p>
                    We aim to bring together essential services like cleaning, repairs, grooming, and daily needs under one trusted platform—ensuring convenience, professionalism, and consistency in every experience.
                  </p>
                  <p>
                    Through trained experts, attention to detail, and a customer-first approach, we strive to make every service seamless, efficient, and stress-free—so you can focus on what truly matters.
                  </p>
                </div>
             </div>
          </div>

          {/* Vision */}
          <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100 group hover:-translate-y-3 transition-all duration-700 fade-in-up delay-200">
             <div className="w-20 h-20 bg-blue-500/10 rounded-3xl flex items-center justify-center mb-10 group-hover:bg-blue-500 group-hover:-rotate-6 transition-all duration-500">
                <span className="text-4xl group-hover:scale-110 transition-transform">👁</span>
             </div>
             <h2 className="text-4xl font-black tracking-tighter mb-8 text-gray-900">VISION</h2>
             <div className="space-y-6">
                <p className="text-xl text-gray-800 leading-relaxed font-bold">
                   Our vision is to redefine the way home services are experienced by becoming a trusted, go-to brand for modern households across India.
                </p>
                <div className="space-y-4 text-gray-500 leading-relaxed">
                  <p>
                    We aspire to build a platform where quality meets convenience, and where customers feel confident relying on a single name for all their home needs.
                  </p>
                  <div className="pt-8 mt-8 border-t border-gray-100">
                    <p className="text-primary font-black italic text-lg leading-snug">
                      “Klean Company is not just a service provider — it’s a commitment to better, easier living.”
                    </p>
                  </div>
                </div>
             </div>
          </div>

        </div>
      </section>
    </div>
  );
}