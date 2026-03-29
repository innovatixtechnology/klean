import Image from "next/image";

export default function Media() {
  return (
    <section id="media" className="relative mt-16">
      <Image src="/images/media-coverage.svg" alt="Media" width={1280} height={720} className="object-contain w-full" />
      <div className="absolute top-10   md:top-36 left-[50%] transform -translate-x-1/2">
        <Image src="/images/media-heading.webp" alt="Media Coverage" width={1280} height={720} className="object-contain w-full" />
      </div>
      <div className="bg-[#F7F2E6] flex flex-1 justify-center ">
        <div className="flex flex-col space-y-4 flex-[0.5]">
          <Image src="/images/news-1.webp" alt="Media 1" width={1280} height={720} className="object-contain w-full" />
        </div>
      </div>
      <div className="relative overflow-y-hidden h-40 -mt-2 ">
        <Image src="/images/media-footer.svg" alt="Media Footer" width={1280} height={720} className="object-contain w-full" />
      </div>
    </section>
  )
}