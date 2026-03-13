import React from "react";
import Image from "next/image";
import Header from "./Header";
import MainHero from "./MainHero";
import Canvas from "./Canvas";
import HexNetAnimation from "./HexNetAnimation";
import NetworkGraphAnimation from "./NetworkGraphAnimation";

const HeroSection = () => (
  <div className="relative">
    {/* Header */}
    <Header />

    <section className="relative w-full overflow-visible h-[400px] lg:h-[550px] bg-[#091232]">
      {/* Animated Gradient Orbs */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#7B2FF7] rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-blob" />
        <div className="absolute top-[20%] right-[-10%] w-[45vw] h-[45vw] bg-[#18D3C5] rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] bg-[#7B2FF7] rounded-full mix-blend-screen filter blur-[120px] opacity-30 animate-blob animation-delay-4000" />
      </div>

      {/* Background Animation (Hex Net) */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none opacity-60">
        <Canvas height={550} className="w-full h-full">
          <HexNetAnimation />
        </Canvas>
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, #091232 0%, #151f41 50%, transparent 100%)",
        }}
      />

      {/* Hero text */}
      <div className="relative z-20 px-4 sm:px-6 lg:pl-16 flex items-center h-full">
        <div className="text-left px-4 sm:px-6 lg:pl-16 lg:max-w-none">
          <MainHero />
        </div>
      </div>

      {/* Network Animation replacing Hero image */}
      <div className="absolute top-0 right-0 w-3/5 h-full lg:h-full lg:left-[40%] lg:w-[60%] z-0">
        <Canvas height={550} className="w-full h-full opacity-60">
          <NetworkGraphAnimation color="#18D3C5" particleCount={100} />
        </Canvas>
      </div>

      {/* Circular logo at the bottom center */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-30">
        <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-visible shadow-lg border-4 border-white flex items-center justify-center">
          <Image
            src="assets/images/network_bluebackground.svg"
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
