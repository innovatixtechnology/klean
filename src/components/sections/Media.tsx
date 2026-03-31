import Image from "next/image";

export default function Media() {
  return (
    <section id="media" className="relative mt-24">
      <div className="relative w-full">
        <Image src="/images/media-coverage.svg" alt="Media" width={1280} height={720} className="object-contain w-full" />
        <div className="absolute top-4 sm:top-10 md:top-20 lg:top-36 left-1/2 transform -translate-x-1/2 w-[80%] max-w-4xl">
          <Image src="/images/media-heading.webp" alt="Media Coverage" width={1280} height={720} className="object-contain w-full" />
        </div>
      </div>
      
      <div className="bg-[#F7F2E6] flex justify-center py-10 md:py-20">
        <div className="w-[90%] md:w-[60%] lg:w-[50%] flex flex-col space-y-6">
          <Image src="/images/news-1.webp" alt="Media 1" width={1280} height={720} className="object-contain w-full shadow-2xl rounded-xl" />
        </div>
      </div>
      
      <div className="relative w-full">
        <Image src="/images/media-footer.svg" alt="Media Footer" fill className="object-cover md:object-contain w-full h-full" />
      </div>
    </section>
  )
}