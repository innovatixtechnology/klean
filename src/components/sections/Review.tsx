import Image from "next/image";

export default function Review() {
  return (
    <section id="review" className="mt-20 max-w-[80%] mx-auto">
      <div className="flex flex-1 mb-20 mt-32 gap-8">
        <div className="flex-[0.4]">
          <h2 className="text-[#121212] text-5xl font-inter font-bold">Love from our customers</h2>
          <div className="flex items-center mt-8">
            <Image src="/images/gold-star.svg" alt="Star" width={78} height={78} className="object-contain w-full" />
            <h2 className="text-7xl font-extrabold">4.5</h2>
          </div>
          <p className="text-[#646464] font-inter text-3xl mt-4">Based on 100+ reviews</p>
        </div>
        <div className="flex-[0.6] overflow-x-hidden mb-10"></div>
      </div>
      <div className="flex-[0.6] relative overflow-x-hidden mb-10">
        <div className="flex gap-4 ml-20">
          <div className="min-w-0 shrink-0 grow-0 basis-full pl-4 shadow-lg w-full max-w-[500px] bg-white rounded-lg mb-5"></div>
        </div>
      </div>
    </section>
  )
}