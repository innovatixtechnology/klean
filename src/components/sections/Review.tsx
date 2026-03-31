import Image from "next/image";

const REVIEWS = [
  {
    name: "Happy Customer 1",
    rating: 5,
    review: "Klean services are absolutely amazing. I loved the experience at my own home!",
    date: "2022-01-01",
  },
  {
    name: "Happy Customer 2",
    rating: 4,
    review: "Klean services are absolutely amazing. I loved the experience at my own home!",
    date: "2022-01-02",
  },
  {
    name: "Happy Customer 3",
    rating: 3,
    review: "Klean services are absolutely amazing. I loved the experience at my own home!",
    date: "2022-01-03",
  },
  {
    name: "Happy Customer 4",
    rating: 2,
    review: "Klean services are absolutely amazing. I loved the experience at my own home!",
    date: "2022-01-04",
  },
  {
    name: "Happy Customer 5",
    rating: 1,
    review: "Klean services are absolutely amazing. I loved the experience at my own home!",
    date: "2022-01-05",
  },
]

export default function Review() {
  return (
    <section id="review" className="mt-20 px-4 md:px-10 lg:max-w-[80%] mx-auto">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between mb-4 mt-20 gap-10 md:gap-8 text-center md:text-left">
        <div className="flex-[0.5] flex flex-col items-center md:items-start">
          <h2 className="text-[#121212] text-3xl md:text-5xl font-inter font-bold leading-tight">Love from our customers</h2>
          <div className="flex items-center mt-6">
            <div className="relative w-16 h-16 md:w-20 md:h-20">
              <Image src="/images/gold-star.svg" alt="Star" fill className="object-contain" />
            </div>
            <h2 className="text-5xl md:text-7xl font-extrabold ml-2">4.5</h2>
          </div>
          <p className="text-[#646464] font-inter text-xl md:text-3xl mt-4">Based on 100+ reviews</p>
        </div>
        <div className="flex-[0.5] w-full min-h-[300px] bg-primary/5 rounded-3xl p-8 flex items-center justify-center border border-primary/10">
          <p className="text-[#646464] italic text-lg md:text-xl font-inter">"Professional, hygienic and the services were excellent!"</p>
        </div>
      </div>
      <div className="relative flex justify-around gap-5 overflow-hidden shrink-0">
        <div className="max-w-full mx-auto px-4 md:px-10 mx-auto w-full">
          <ul className="animate-scroll flex flex-nowrap w-max min-w-full hover:[animation-play-state:paused] overflow-hidden relative gap-5 justify-around shrink-0">
            {REVIEWS.map((review) => (
              <li key={`top-${review.date}`} className="">
                <div key={review.name} className="w-[85vw] md:w-[400px] shrink-0 p-6 shadow-xl bg-white rounded-2xl border border-gray-50">
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map(s => <Image key={s} src="/images/gold-star.svg" alt="star" width={16} height={16} />)}
                  </div>
                  <p className="text-[#646464] text-sm md:text-base font-inter">Klean services are absolutely amazing. I loved the experience at my own home!</p>
                  <p className="font-bold mt-4 text-[#121212]">{review.name}</p>
                </div>
              </li>
            ))}
          </ul>
          <ul className="animate-scrollReverse mt-2 flex flex-nowrap w-max min-w-full hover:[animation-play-state:paused] overflow-hidden relative gap-5 justify-around shrink-0">
            {REVIEWS.map((review) => (
              <li key={`bottom-${review.date}`} className="">
                <div key={review.name} className="w-[85vw] md:w-[400px] shrink-0 p-6 shadow-xl bg-white rounded-2xl border border-gray-50">
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map(s => <Image key={s} src="/images/gold-star.svg" alt="star" width={16} height={16} />)}
                  </div>
                  <p className="text-[#646464] text-sm md:text-base font-inter">Klean services are absolutely amazing. I loved the experience at my own home!</p>
                  <p className="font-bold mt-4 text-[#121212]">{review.name}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}