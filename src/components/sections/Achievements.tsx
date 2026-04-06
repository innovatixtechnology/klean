import { FOOTER_TURSTS } from "@/constants";
import { CheckCircleIcon } from "@/components/icons";

export default function Achievements() {
  return (
    <section id="achievements" className="mt-20 px-4 md:px-10 lg:max-w-[80%] mx-auto">
      <h2 className="text-center text-[#121212] text-5xl font-inter font-bold">
        Trust & Safety
      </h2>
      <div className="flex justify-between items-start mt-16">
        {
          FOOTER_TURSTS.map((trust) => (
            <div key={trust} className="flex flex-col justify-center items-center text-center">
              <div className="bg-gradient-to-b from-[#FFEBF2] to-[#FFF] rounded-[90px] p-10">
                <CheckCircleIcon className="text-primary" />
              </div>
              <p className="text-[#121212] text-2xl font-bold flex items-center justify-center gap-2">
                {trust}
              </p>
            </div>
          ))
        }
      </div>
    </section>
  )
}