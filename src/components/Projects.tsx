/* eslint-disable */
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";

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
      {
        rootMargin,
      }
    );
    if (ref && ref?.current) {
      currentRef = ref.current;
      observer.observe(currentRef);
    }
    return () => {
      observer.unobserve(currentRef);
    };
  }, [ref, rootMargin]);

  return isIntersecting;
}

interface StackedCardProps {
  children: React.ReactNode;
  index: number;
  isExpanded: boolean;
  className?: string;
}

const StackedCard = ({
  children,
  index,
  isExpanded,
  className = "",
}: StackedCardProps) => {
  const controls = useAnimation();
  const rootRef = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(rootRef, "-150px");
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (onScreen && !hasAnimated) {
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
      setHasAnimated(true);
    }
  }, [onScreen, controls, index, hasAnimated]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768);
      const handleResize = () => setIsMobile(window.innerWidth < 768);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
    return undefined;
  }, []);

  // Create staggered initial positions for stacked effect
  const rowIndex = index % 2; // 0 for left column, 1 for right column
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
        zIndex: isExpanded ? 10 : 5 - index,
      }}
      animate={controls}
      layout={false}
      className={`relative ${className} ${isExpanded ? "md:col-span-2" : ""}`}
      style={{
        transformStyle: "preserve-3d",
        zIndex: isExpanded ? 10 : 1,
        isolation: "isolate",
      }}
    >
      <motion.div
        className="bg-white rounded-xl shadow-2xl relative overflow-hidden h-full"
        layout={false}
        style={{ pointerEvents: "auto" }}
        animate={{
          boxShadow: isExpanded
            ? "0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 16px rgba(0, 0, 0, 0.1)"
            : `
              0 ${8 + rowIndex * 2}px ${
                20 + rowIndex * 3
              }px rgba(0, 0, 0, 0.12),
              0 ${4 + rowIndex}px ${8 + rowIndex}px rgba(0, 0, 0, 0.08),
              inset 0 1px 0 rgba(255, 255, 255, 0.6)
            `,
          transform: isMobile
            ? "none"
            : isExpanded
            ? "perspective(1000px) rotateY(0deg) translateZ(0)"
            : `perspective(1000px) rotateY(${
                rowIndex === 0 ? -1 : 1
              }deg) translateZ(0)`,
        }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const { projects } = config;
  const { title, subtitle, items } = projects;
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className={`bg-background py-6`} id="projects">
      <div className={`container max-w-5xl mx-auto m-4 px-4`}>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold leading-tight text-gray-900 mb-4 max-w-4xl mx-auto">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-gray-600 font-medium tracking-wide max-w-4xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 max-w-4xl mx-auto">
          {items.map((project, index) => {
            const isExpanded = expandedIndex === index;
            const hasAdditionalInfo =
              (project.publishedPapers &&
                Array.isArray(project.publishedPapers) &&
                project.publishedPapers.length > 0) ||
              (project.technologies &&
                Array.isArray(project.technologies) &&
                project.technologies.length > 0) ||
              (project.additionalInfo &&
                typeof project.additionalInfo === "string" &&
                project.additionalInfo.length > 0);

            return (
              <StackedCard
                key={project.title}
                index={index}
                isExpanded={isExpanded}
              >
                <div className="flex flex-col h-full relative">
                  <div className="w-full mb-3 flex-shrink-0">
                    <img
                      className={`w-full object-contain rounded-lg transition-all duration-300 ${
                        isExpanded ? "h-64" : "h-48"
                      }`}
                      src={project.img}
                      alt={project.title}
                    />
                  </div>
                  <div className="flex-1 flex flex-col p-3 relative">
                    <h3
                      className={`text-2xl text-gray-800 font-bold leading-tight mb-2 text-center`}
                    >
                      {project.title}
                    </h3>
                    <p
                      className={`text-base text-gray-600 leading-relaxed mb-3`}
                    >
                      {project.description}
                    </p>

                    <AnimatePresence>
                      {isExpanded && hasAdditionalInfo && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-4 mb-3"
                        >
                          {project.additionalInfo && (
                            <div>
                              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                                Additional Information
                              </h4>
                              <p className="text-base text-gray-600 leading-relaxed">
                                {project.additionalInfo}
                              </p>
                            </div>
                          )}

                          {project.technologies &&
                            project.technologies.length > 0 && (
                              <div>
                                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                                  Technologies Used
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {project.technologies.map(
                                    (tech, techIndex) => (
                                      <span
                                        key={techIndex}
                                        className="px-3 py-1 bg-primary bg-opacity-10 text-primary rounded-full text-sm font-medium"
                                      >
                                        {tech}
                                      </span>
                                    )
                                  )}
                                </div>
                              </div>
                            )}

                          {project.publishedPapers &&
                            project.publishedPapers.length > 0 && (
                              <div>
                                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                                  Published Papers
                                </h4>
                                <div className="space-y-3">
                                  {project.publishedPapers.map(
                                    (paper, paperIndex) => (
                                      <div
                                        key={paperIndex}
                                        className="border-l-4 border-primary pl-3 py-2"
                                      >
                                        <p className="font-medium text-gray-800">
                                          {paper.title}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                          {paper.authors} - {paper.journal} (
                                          {paper.year})
                                        </p>
                                        {paper.link && paper.link !== "#" && (
                                          <a
                                            href={paper.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-primary hover:underline"
                                          >
                                            Read paper →
                                          </a>
                                        )}
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {hasAdditionalInfo && (
                      <div className="mt-auto pt-3 flex justify-end">
                        <button
                          type="button"
                          onClick={() => toggleExpand(index)}
                          className="text-primary hover:text-primary-dark font-medium text-sm transition-colors duration-200 flex items-center gap-1 focus:outline-none active:outline-none rounded px-2 py-1"
                          style={{ outline: "none" }}
                          onMouseDown={(e) => e.preventDefault()}
                          aria-label={
                            isExpanded
                              ? "Collapse project details"
                              : "Expand project details"
                          }
                        >
                          {isExpanded ? (
                            <>
                              <span>Read less</span>
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 15l7-7 7 7"
                                />
                              </svg>
                            </>
                          ) : (
                            <>
                              <span>Read more</span>
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </StackedCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
