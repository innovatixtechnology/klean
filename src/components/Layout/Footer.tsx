import { siteConfig } from "@/constants"
import Image from "next/image"

function Footer() {
  return (
    <footer className="bg-[#F1F0F5] mt-20 pb-10">
      <div className="w-[90%] mx-auto ">
        <div className="pt-10 border-b-[1px] border-[#C6C6C6] pb-8">
          <p className="flex items-center gap-2 text-base font-semibold">
            100% Purely Bhartiya Brand
            <Image src="/INDIA_FLAG.svg" alt="India Flag" width={25} height={17} className="inline-block" />
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-12 gap-10 md:gap-8 border-b-[1px] border-[#C6C6C6] pb-12">
          <div className="flex flex-col gap-4">
            <p className="text-2xl font-black tracking-tight">{siteConfig.shortName.toUpperCase()}<span className="text-primary">.</span></p>
            <p className="text-[#444] text-sm leading-relaxed max-w-sm">
              Klean is India’s Prominent Salon at Home, launched in 2026 and currently functioning in Bhagalpur, Bihar, India. Our commitment is to deliver quality salon and wellness services at home with top-level professionals & excellent leading products.
            </p>
          </div>
          
          <div className="flex flex-col gap-6 lg:ml-10">
            <p className="text-xl font-bold">Quick Links</p>
            <nav className="flex flex-col gap-3">
              <a href="/" className="text-[#444] hover:text-primary transition-colors text-sm font-medium">Home</a>
              <a href="/about" className="text-[#444] hover:text-primary transition-colors text-sm font-medium">About</a>
              <a href="/milestones" className="text-[#444] hover:text-primary transition-colors text-sm font-medium">Milestones</a>
              <a href="/services" className="text-[#444] hover:text-primary transition-colors text-sm font-medium">Services</a>
            </nav>
          </div>
          
          <div className="flex flex-col gap-6">
            <p className="text-xl font-bold">Support</p>
            <div className="bg-[#E6E3EE]/50 p-6 rounded-[2rem] border border-[#E6E3EE]">
              <p className="text-sm font-bold text-gray-800 mb-2">Facing issues? Reach out:</p>
              <a href="mailto:support@klean.com" className="text-primary hover:underline text-sm block font-bold transition-all">support@klean.com</a>
              <p className="text-xs text-gray-500 mt-3 font-medium">Available 24/7 for you.</p>
            </div>
          </div>
          
          <div className="flex flex-col gap-6 lg:items-end">
            <p className="text-xl font-bold lg:text-right w-full">Stay Connected</p>
            <p className="text-sm text-gray-600 font-medium lg:text-right">Follow us for updates 🩷</p>
            <div className="flex gap-4 mt-2">
               {/* Add social icons here if available */}
               <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100 cursor-pointer hover:border-primary transition-all">
                  <span className="text-lg">📱</span>
               </div>
               <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100 cursor-pointer hover:border-primary transition-all">
                  <span className="text-lg">📸</span>
               </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-[90%] mx-auto py-8">
        <p className="text-[#848484] text-xs font-medium uppercase tracking-widest text-center md:text-left">
          Copyright 2026 @Klean | Powered by: Kleanis Technologies Pvt. Ltd.
        </p>
      </div>
    </footer>
  )
}

export default Footer