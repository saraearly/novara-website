import React from "react";

import About from "../components/About";
import LazyShow from "../components/LazyShow";
import Pricing from "../components/Pricing";
import WhatWeOffer from "../components/WhatWeOffer";
import Projects from "../components/Projects";

import HeroSection from "../components/HeroSection"; // <-- New combined hero

const App = () => (
  <div className="bg-background grid gap-y-8 overflow-x-hidden pb-8">
    {/* Hero Section */}
    <HeroSection />

    {/* Other sections */}
    <WhatWeOffer />
    <LazyShow>
      <Pricing />
    </LazyShow>
    <LazyShow>
      <Projects />
    </LazyShow>
    <LazyShow>
      <About />
    </LazyShow>
  </div>
);

export default App;
