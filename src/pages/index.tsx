import React from "react";

import About from "../components/About";
import LazyShow from "../components/LazyShow";
import Pricing from "../components/Pricing";
import WhatWeOffer from "../components/WhatWeOffer";
import Projects from "../components/Projects";

import HeroSection from "../components/HeroSection"; // <-- New combined hero

const App = () => (
  <div className="bg-[#0a0e1a] grid gap-y-0 overflow-x-hidden">
    {/* Hero Section */}
    <HeroSection />

    {/* Other sections */}
    <WhatWeOffer />
    <LazyShow>
      <Projects />
    </LazyShow>
    <LazyShow>
      <Pricing />
    </LazyShow>
    <LazyShow>
      <About />
    </LazyShow>
  </div>
);

export default App;
