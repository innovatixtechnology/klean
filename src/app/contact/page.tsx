import { ContactForm } from "@/components/ContactForm";
import { MailIcon, PhoneIcon, MapPinIcon } from "@/components/icons";
import Image from "next/image";

export default function ContactPage() {
  return (
    <section id="contact" className="bg-white min-h-screen">
      {/* Header Section */}
      <div className="pt-24 pb-16 px-6 lg:px-16 max-w-7xl mx-auto flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 animate-slide-up">
          Get in <span className="text-primary italic">Touch.</span>
        </h1>
        <p className="text-gray-500 text-lg md:text-xl max-w-2xl animate-fade-in delay-200">
          Have questions about our services or need help with a booking?
          Our team is here to provide you with the support you need.
        </p>
      </div>

      {/* Main Content Card Grid */}
      <div className="pb-32 px-6 lg:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          {/* Left Column: Contact Info Cards */}
          <div className="lg:col-span-4 flex flex-col gap-6 animate-slide-up delay-300">

            {/* Info Cards */}
            <div className="bg-gray-50/50 p-8 rounded-[2.5rem] border border-gray-100 group transition-all hover:bg-white hover:shadow-2xl hover:shadow-gray-200/50">
              <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                <PhoneIcon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black mb-2 italic">Call Us</h3>
              <p className="text-gray-500 font-bold tracking-tight">+91 xxxxx xxxxx</p>
              <p className="text-gray-400 text-sm mt-1">Mon - Sun, 9am - 9pm</p>
            </div>

            <div className="bg-gray-50/50 p-8 rounded-[2.5rem] border border-gray-100 group transition-all hover:bg-white hover:shadow-2xl hover:shadow-gray-200/50">
              <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                <MailIcon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black mb-2 italic">Email Us</h3>
              <p className="text-gray-500 font-bold tracking-tight">support@klean.com</p>
              <p className="text-gray-400 text-sm mt-1">We'll respond within 24h</p>
            </div>

            <div className="bg-gray-50/50 p-8 rounded-[2.5rem] border border-gray-100 group transition-all hover:bg-white hover:shadow-2xl hover:shadow-gray-200/50">
              <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                <MapPinIcon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black mb-2 italic">Location</h3>
              <p className="text-gray-500 font-bold tracking-tight leading-snug">Vijayapura, India</p>
              <p className="text-gray-400 text-sm mt-1">Available across the city</p>
            </div>

            {/* Social Links Mini-Grid */}
            <div className="mt-4 flex gap-4">
              {['instagram', 'whatsapp', 'facebook'].map((social) => (
                <a
                  key={social}
                  href="/"
                  className="w-16 h-16 bg-white border border-gray-100 shadow-sm rounded-3xl flex items-center justify-center hover:shadow-xl hover:border-primary/20 transition-all hover:-translate-y-2"
                >
                  <Image src={`/images/${social}.svg`} alt={social} width={24} height={24} />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-8">
            <ContactForm />
          </div>

        </div>
      </div>

      {/* Decorative Accents */}
      <div className="fixed top-1/4 -right-20 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed -bottom-20 -left-20 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />
    </section>
  );
}