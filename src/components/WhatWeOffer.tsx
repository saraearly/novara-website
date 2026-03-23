/* eslint-disable */
import React, { MutableRefObject, useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import config from "../config/index.json";
import OfferingHubDiagram from "./OfferingHubDiagram";
import OfferingDetailPanel from "./OfferingDetailPanel";

function useOnScreen(
  ref: MutableRefObject<HTMLDivElement | null>,
  rootMargin = "0px"
) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    let currentRef: any = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setIntersecting(true);
      },
      { rootMargin }
    );

    if (ref && ref.current) {
      currentRef = ref.current;
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [ref, rootMargin]);

  return isIntersecting;
}

const AUTO_ROTATE_INTERVAL = 4000;

const WhatWeOffer = () => {
  const { product } = config;
  // Only show Clinical Insights and Predictive Analytics
  const items = [product.items[2], product.items[3]];

  const [activeIndex, setActiveIndex] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useOnScreen(sectionRef, "-100px");

  // Mobile detection
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768);
      const handleResize = () => setIsMobile(window.innerWidth < 768);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
    return undefined;
  }, []);

  // Auto-rotation
  useEffect(() => {
    if (!isInView || userInteracted) return undefined;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, AUTO_ROTATE_INTERVAL);

    return () => clearInterval(interval);
  }, [isInView, userInteracted, items.length]);

  const handleSelect = useCallback((index: number) => {
    setActiveIndex(index);
    setUserInteracted(true);
  }, []);

  return (
    <section className="bg-background py-6" id="product" ref={sectionRef}>
      <div className="container max-w-6xl mx-auto m-4 px-4">
        {/* Heading */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900 mb-4 max-w-4xl mx-auto">
            {product.title}
          </h2>
          <p className="text-lg text-gray-600 font-medium tracking-wide max-w-2xl mx-auto">
            Unified AI analytics for clinical intelligence
          </p>
        </motion.div>

        {/* Mobile: Tab pills */}
        {isMobile && (
          <motion.div
            className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {items.map((item, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSelect(i)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeIndex === i
                    ? "bg-primary text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {(item as any)?.shortTitle || item?.title}
              </button>
            ))}
          </motion.div>
        )}

        {/* Desktop: Hub diagram */}
        {!isMobile && (
          <OfferingHubDiagram
            activeIndex={activeIndex}
            onSelect={handleSelect}
            isInView={isInView}
            items={items as Array<{ shortTitle?: string; title: string }>}
          />
        )}

        {/* Detail panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          <OfferingDetailPanel
            item={items[activeIndex] as any}
            activeIndex={activeIndex}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
