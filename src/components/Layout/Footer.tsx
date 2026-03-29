import { siteConfig } from "@/constants"
import Image from "next/image"

function Footer() {
  return (
    <footer className="bg-[#F1F0F5] -mb-8 pb-4">
      <div className="w-[90%] mx-auto ">
        <div className="pt-10 border-b-[1px] border-[#C6C6C6] pb-8">
          <p className="flex items-center gap-1 text-base">
            100% Purely Bhartiya Brand
            <Image src="/INDIA_FLAG.svg" alt="India Flag" width={25} height={17} />
          </p>
        </div>
        <div className="grid grid-rows-3 md:grid-rows-1 md:grid-cols-4 mt-4 gap-3 md:gap-8 border-b-[1px] border-[#C6C6C6] pb-8">
          <div className="">
            <p className="flex items-center text-xl font-semibold gap-2">{siteConfig.shortName}</p>
            <p className="text-[444] text-sm mt-4">Kleanis India’s Prominent Salon at Home, launched in 2026 and currently functioning in Bhagalpur, Bihar, India. Our commitment is to deliver quality salon and wellness services at home with top-level professionals & excellent leading products.</p>
          </div>
          <div className="flex flex-col gap-4 justify-center">
            <p className="text-xl font-semibold">
              Quick Links 
            </p>
            <div className="flex flex-col gap-2">
              <a href="/" className="text-[#444] text-sm">Home</a>
              <a href="/" className="text-[#444] text-sm">About</a>
              <a href="/" className="text-[#444] text-sm">Services</a>
              <a href="/" className="text-[#444] text-sm">Contact</a>
            </div>
          </div>
          <div className="bg-[#E6E3EE] max-h-[100px] p-4 rounded-lg">
            <p className="text-base font-medium">Facing issues? Reach us out at:</p>
            <p className="text-sm font-normal">Contact Us</p>
            <a href="mailto:support@klean.com" className="text-sm">support@klean.com</a>
          </div>
          <div>
            <p className="text-sm font-medium mt-8">Show some love 🩷 on social media</p>
            <div className="flex gap-4 mt-4">
            </div>
          </div>
        </div>
      </div>
      <p className="text-[#848484] text-sm w-[90%] mx-auto my-8">Copyright 2026 @Klean | Powered by: Kleanis Technologies Pvt. Ltd.</p>
    </footer>
  )
}

export default Footer