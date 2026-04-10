import Achievements from "@/components/sections/Achievements";
import Banner from "@/components/sections/Banner";
import Hero from "@/components/sections/Hero";
import Newsletter from "@/components/sections/Newsletter";
import Review from "@/components/sections/Review";
import Service from "@/components/sections/Service";

export default async function Home() {
  return (
    <>
      <Hero />
      <Service />
      <Banner />
      <Review />
      <Achievements />
      <Newsletter />
    </>
  );
}
