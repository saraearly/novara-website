import React from "react";
import Header from "./Header";
import MainHero from "./MainHero";
import PipelineStoryAnimation from "./PipelineStoryAnimation";
import Canvas from "./Canvas";
import NetworkGraphAnimation from "./NetworkGraphAnimation";

const HeroSection = () => (
  <div className="relative">
    {/* Header */}
    <Header />

    <section className="relative w-full overflow-hidden min-h-[600px] lg:min-h-[700px] bg-[#091232]">
      {/* Subtle gradient orbs */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-15%] w-[50vw] h-[50vw] bg-[#7B2FF7] rounded-full mix-blend-screen filter blur-[150px] opacity-20 animate-blob" />
        <div className="absolute top-[30%] right-[-10%] w-[40vw] h-[40vw] bg-[#18D3C5] rounded-full mix-blend-screen filter blur-[150px] opacity-15 animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-30%] left-[30%] w-[50vw] h-[50vw] bg-[#7B2FF7] rounded-full mix-blend-screen filter blur-[180px] opacity-15 animate-blob animation-delay-4000" />
      </div>

      {/* Background network graph animation */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none opacity-50">
        <Canvas height={700} className="w-full h-full">
          <NetworkGraphAnimation
            color="rgba(255, 255, 255, 0.5)"
            particleCount={70}
            connectionDistance={180}
            speed={0.4}
          />
        </Canvas>
      </div>

      {/* Main content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: Text */}
          <div className="flex-1 w-full lg:w-1/2">
            <MainHero />
          </div>

          {/* Right: Service Hub Diagram */}
          <div className="flex-1 w-full lg:w-1/2">
            <PipelineStoryAnimation />
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 w-full h-24 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to top, #091232 0%, transparent 100%)",
        }}
      />
    </section>
  </div>
);

export default HeroSection;
