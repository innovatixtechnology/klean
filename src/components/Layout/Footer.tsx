import { siteConfig, FOOTER_LINKS, FOOTER_TURSTS } from "@/constants"
import { CheckCircleIcon, MailIcon, PhoneIcon } from "@/components/icons"
import type { Route } from "next"
import Image from "next/image"
import Link from "next/link"

function Footer() {
  return (
    <footer className="bg-[#F1F0F5] mt-20 pb-10">
      <div className="w-[90%] mx-auto ">
        <div className="pt-10 border-b-[1px] border-[#C6C6C6] pb-8">
          <p className="flex items-center gap-2 text-base font-semibold">
            100% Purely Bhartiya Brand
            <Image src="/INDIA_FLAG.svg" alt="India Flag" width={25} height={17} className="inline-block" />
          </p>
          <div className="flex items-center gap-2 mt-2">
            <h2 className="text-xl font-semibold">LOCATION / SERVICE AREA: </h2>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center text-lg font-normal">
                <span className="font-bold text-primary">Vijayapura</span> <span className="text-sm">(expandable to other cities soon)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mt-12 gap-10 md:gap-8 border-b-[1px] border-[#C6C6C6] pb-12">
          <div className="flex flex-col gap-4">
            <Link href="/" className="text-2xl font-black tracking-tight">
              <Image src={siteConfig.logo.src2} alt={siteConfig.logo.alt} width={200} height={200} />
            </Link>
            <p className="text-[#444] text-sm leading-relaxed max-w-sm">
              {siteConfig.description}
            </p>
          </div>

          {
            FOOTER_LINKS.map((footer) => (

              <div key={footer.title} className="flex flex-col gap-6">
                <p className="text-xl font-bold">{footer.title}</p>
                <nav className="flex flex-col gap-3">
                  {footer.links.map((link) => (
                    <Link key={link.text} href={link.href as Route} className="text-[#444] hover:text-primary transition-colors text-sm font-medium">{link.text}</Link>
                  ))}
                </nav>
              </div>
            ))

          }

          <div className="flex flex-col gap-6">
            <p className="text-xl font-bold">Support</p>
            <div className="bg-[#E6E3EE]/50 p-6 rounded-[2rem] border border-[#E6E3EE]">
              <p className="text-sm font-bold text-gray-800 mb-2">Need Help?</p>
              <a href="mailto:support@klean.com" className="text-primary hover:underline text-sm block font-bold transition-all flex items-center gap-2"><PhoneIcon /> +91 xxxxx xxxxx</a>
              <a href="mailto:support@klean.com" className="text-primary hover:underline text-sm block font-bold transition-all flex items-center gap-2"><MailIcon /> support@klean.com</a>
              <p className="text-xs text-gray-500 mt-3 font-medium">Available 7 days a week to assist you.</p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <p className="text-xl font-bold">Trust & Safety</p>
            <div className="bg-[#E6E3EE]/50 p-6 rounded-[2rem] border border-[#E6E3EE]">
              {
                FOOTER_TURSTS.map((it) => (
                  <p key={it} className="text-sm flex items-center gap-2 font-bold text-gray-800 mb-2">
                    <CheckCircleIcon className="text-primary" />
                    {it}
                  </p>
                ))
              }
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <p className="text-xl font-bold w-full">Stay Connected</p>
            <p className="text-sm text-gray-600 font-medium">Follow us for updates, offers and tips 🩷</p>
            <div className="flex gap-4 mt-2">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100 cursor-pointer hover:border-primary transition-all">
                <Image src="/images/instagram.svg" alt="Instagram" width={20} height={20} />
              </div>
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100 cursor-pointer hover:border-primary transition-all">
                <Image src="/images/whatsapp.svg" alt="whatsapp" width={20} height={20} />
              </div>
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100 cursor-pointer hover:border-primary transition-all">
                <Image src="/images/facebook.svg" alt="facebook" width={20} height={20} />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <a href="https://wa.me/910000000000?text=Hi%20Klean%2C%20I%20want%20to%20book%20a%20service" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-[#25D366]/30 hover:bg-[#20bd5a] transition-all hover:-translate-y-1 active:translate-y-0 relative overflow-hidden group">
              <Image src="/images/whatsapp.svg" alt="whatsapp" width={20} height={20} />
              <span className="z-10">Book on WhatsApp</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0"></div>
            </a>
          </div>
        </div>
      </div>

      <div className="w-[90%] mx-auto py-8">
        <p className="text-[#848484] text-xs font-medium uppercase tracking-widest text-center md:text-left">
          Copyright 2026 Klean Company | All Rights Reserved. <span className="text-primary">|</span> <span className="text-primary">Design to simplify everyday living</span>
        </p>
      </div>
    </footer>
  )
}

export default Footer