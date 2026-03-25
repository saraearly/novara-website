import React from "react";
import Image from "next/image";
import Header from "./Header";
import MainHero from "./MainHero";
import MainHeroImage from "./MainHeroImage";

const HeroSection = () => (
  <div className="relative">
    {/* Header */}
    <Header />

    <section className="relative w-full overflow-visible h-[300px] lg:h-[600px]">
      {/* Gradient overlay */}
      <div
        className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, #091232ff 0%, #151f41ff 30%, rgba(15,42,68,0.0) 100%)",
        }}
      />

      {/* Hero text */}
      <div className="relative z-20 px-4 sm:px-6 lg:pl-16 flex items-center h-full">
        <div className="text-left px-4 sm:px-6 lg:pl-16 lg:max-w-none">
          <MainHero />
        </div>
      </div>

      {/* Hero image */}
      <div className="absolute top-0 left-[30%] w-[70%] h-full z-0">
        <MainHeroImage className="w-full h-full object-cover" />
      </div>

      {/* Circular logo at the bottom center */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-30">
        <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-visible shadow-lg border-4 border-white flex items-center justify-center">
          <Image
            src="/assets/images/network_bluebackground.svg"
            alt="Logo"
            width={128}
            height={128}
            className="object-contain"
          />
        </div>
      </div>
    </section>
  </div>
);

export default HeroSection;
