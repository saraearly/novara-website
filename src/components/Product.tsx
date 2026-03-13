/* eslint-disable */
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import config from "../config/index.json";

function useOnScreen(
  ref: MutableRefObject<HTMLDivElement | null>,
  rootMargin = "0px"
) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    let currentRef: any = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setIntersecting(entry?.isIntersecting);
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

interface StackedCardProps {
  children: React.ReactNode;
  index: number;
  className?: string;
}

const StackedCard = ({ children, index, className = "" }: StackedCardProps) => {
  const controls = useAnimation();
  const rootRef = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(rootRef, "-150px");

  useEffect(() => {
    if (onScreen) {
      controls.start({
        x: 0,
        y: 0,
        rotate: 0,
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.7,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: index * 0.1,
        },
      });
    }
  }, [onScreen, controls, index]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if window is defined (client-side) and width is less than md breakpoint
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768);

      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
    return undefined;
  }, []);

  const rowIndex = index % 2;
  const stackOffset = rowIndex * 10;
  const initialX = isMobile
    ? 0
    : rowIndex === 0
    ? -30 - stackOffset
    : 30 + stackOffset;
  const initialY = 40;
  const initialRotate = isMobile ? 0 : rowIndex === 0 ? -3 : 3;

  return (
    <motion.div
      ref={rootRef}
      initial={{
        opacity: 0,
        x: initialX,
        y: initialY,
        rotate: initialRotate,
        scale: 0.9,
        zIndex: 5 - index,
      }}
      animate={controls}
      className={`relative ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        className="bg-white rounded-xl shadow-2xl relative overflow-hidden h-full"
        style={{
          boxShadow: `
            0 ${8 + rowIndex * 2}px ${20 + rowIndex * 3}px rgba(0, 0, 0, 0.12),
            0 ${4 + rowIndex}px ${8 + rowIndex}px rgba(0, 0, 0, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.6)
          `,
          transform: isMobile
            ? "none"
            : `perspective(1000px) rotateY(
            ${rowIndex === 0 ? -1 : 1}deg
          ) translateZ(0)`,
        }}
      >
        {children}
      </div>
    </motion.div>
  );
};

const Product = () => {
  const { product } = config;

  return (
    <section className="bg-background py-6" id="product">
      <div className="container max-w-5xl mx-auto m-4 px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold leading-tight text-gray-900 mb-4 max-w-4xl mx-auto">
            {product.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 max-w-4xl mx-auto px-4 justify-items-center">
          {product.items.map((item, index) => (
            <StackedCard key={item.title} index={index}>
              <div className="flex flex-col p-3 h-full">
                <div className="w-full mb-3 relative">
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={500}
                    height={192}
                    className="object-cover w-full h-48 rounded-lg"
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <h3 className="text-2xl text-gray-800 font-bold leading-tight mb-2 text-center">
                    {item.title}
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </StackedCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Product;
