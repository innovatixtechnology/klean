import Banner from "@/components/sections/Banner";
import Hero from "@/components/sections/Hero";
import Media from "@/components/sections/Media";
import Review from "@/components/sections/Review";
import Service from "@/components/sections/Service";

export default function Home() {
  return (
    <>
      <Hero />
      <Service />
      <Banner />
      <Media />
      <Review />
    </>
  );
}
