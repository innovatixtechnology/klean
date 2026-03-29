import { CATEGORY, SERVICES } from "@/constants";
import Image from "next/image";

export default function Service() {
  return (
    <section id="service" className="mt-20 max-w-[80%] mx-auto">
      <h2 className="text-center text-[#121212] text-5xl font-inter font-bold">Services we offer</h2>
      <ul className="flex justify-between item-start item-center text-center mt-8 gap-8">
        {
          SERVICES.map((service) => (
            <li key={service.text} className="flex flex-col item-center">
              <Image src={service.img} alt={service.text} width={320} height={350} />
              <h3 className="text-2xl text-[#121212] font-inter font-semibold my-4">{service.text}</h3>
              <p className="text-[#646464] font-inter text-sm w-[300px]">{service.subText}</p>
            </li>
          ))
        }
      </ul>
      <ul className="flex justify-between items-center mt-16 gap-8">
        {
          CATEGORY.map((category) => (
            <li key={category.text} className="flex flex-col justify-center items-center">
              <Image src={category.img} alt={category.text} width={166} height={132} />
              <p className="text-[#121212] text-base font-semibold font-inter w-[70px] text-center mt-4">{category.text}</p>
            </li>
          ))
        }
      </ul>
    </section>
  );
}