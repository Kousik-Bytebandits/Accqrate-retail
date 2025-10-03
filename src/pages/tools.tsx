"use client";

import React, { useContext, useState, useEffect, ReactNode, JSX } from "react";
import Skeleton from "../components/skeleton";
import { LoadingContext } from "../utils/LoadingContext";
import { motion, Variants } from "framer-motion";

// import scrollreveal for text animations
import ScrollReveal from "../components/ui/ScrollReveal";

interface Section {
  title?: string;
  text: string;
  video: string;
}

export default function Tools(): JSX.Element {
  const { loading } = useContext(LoadingContext);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const toolsElement = document.getElementById("toolsSection");
    const onboardingElement = document.getElementById("onboardingSection");

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setIsVisible(true);
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "0px",
      threshold: 0.3,
    });

    if (toolsElement) observer.observe(toolsElement);
    if (onboardingElement) observer.observe(onboardingElement);

    return () => {
      if (toolsElement) observer.unobserve(toolsElement);
      if (onboardingElement) observer.unobserve(onboardingElement);
    };
  }, []);

  if (loading || !isVisible) {
    return (
      <>
        {/* toolsSection Skeleton */}
        <section
          id="toolsSection"
          className="bg-white py-8 px-4 max-w-[1200px] mx-auto"
        >
          <Skeleton height="36px" width="60%" className="mx-auto mb-4" />
          <Skeleton height="20px" width="80%" className="mx-auto mb-8" />
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row items-center gap-4 mb-8"
            >
              <div className="flex-1">
                <Skeleton height="24px" width="60%" className="mb-2" />
                <Skeleton height="16px" width="80%" />
              </div>
              <div className="flex-1 flex justify-center">
                <Skeleton height="120px" width="100%" />
              </div>
            </div>
          ))}
        </section>

        {/* onboardingSection Skeleton */}
        <section
          id="onboardingSection"
          className="px-5 max-w-6xl mx-auto mt-12"
        >
          <Skeleton
            height="36px"
            width="60%"
            className="mx-auto mb-6 rounded-md"
          />
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-gray-100 border border-pink-700 rounded-xl p-8 mb-8 shadow-sm w-11/12 max-w-3xl mx-auto"
            >
              <Skeleton height="24px" width="40%" className="mb-3 rounded-md" />
              <Skeleton height="180px" width="100%" className="mb-3 rounded-lg" />
              <Skeleton height="20px" width="80%" className="rounded-md" />
            </div>
          ))}
        </section>
      </>
    );
  }

  const containerVariant: Variants = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const cardVariant: Variants = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const toolsSections: Section[] = [
    {
      title: "User-Level Access Controls",
      text: "Assign roles, limit functions and monitor activity logs.",
      video: "/videos/manageroles.mp4",
    },
    {
      title: "Day-End Closure & Auditor Reports",
      text: "Generate comprehensive financial summaries midnight, festival days, or anytime.",
      video: "/videos/dayclosure.mp4",
    },
    {
      title: "Sales Returns, Credit Notes & Advance Bookings",
      text: "Handle exchanges and pre-orders directly at the counter.",
      video: "/videos/productsearch.mp4",
    },
  ];

  const onboardingItems: Section[] = [
    {
      text: "Bulk uploads: Import your entire product catalog via Excel, fast",
      video: "/videos/Master Upload.mp4",
    },
    {
      text: "Organize categories: Structure your catalog for easy browsing and search.",
      video: "/videos/Add New Category.mp4",
    },
  ];

  return (
    <>
      <motion.section
        id="toolsSection"
        className="bg-white mt-48px md:mt-[56px] px-24px md:px-[32px] max-w-[1200px] mx-auto text-[#333333]"
        variants={containerVariant}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        <ScrollReveal
          as="h2"
          containerClassName="text-center text-fluid-h2 font-medium tracking--5 mb-[24px]"
        >
          Robust Control & <span className="text-[#C2185B] font-medium">Compliance Tools</span>
        </ScrollReveal>
        <ScrollReveal
          as="p"
          containerClassName="text-center text-[#000000B2] tracking--2 text-fluid-caption max-w-lg mb-[24px] md:mb-[32px] lg:mb-[40px] leading-tight mx-auto"
        >
          Maintain tight governance over your retail footprint, from terminal permissions to financial integrity
        </ScrollReveal>

        <div className="space-y-[24px] md:space-y-[32px] lg:space-y-[42px]">
          {toolsSections.map((section, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col lg:flex-row lg:items-start gap-[24px] tracking--5"
              initial={{ x: -100, opacity: 0 }}
              animate={isVisible ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
            >
              <div className="flex-1 space-y-4">
                <h3 className="text-[#C2185B] font-semibold tracking--5 text-fluid-h3 ">
                  {section.title}:
                </h3>
                <p className="text-fluid-body leading-tight tracking--2">{section.text}</p>
              </div>
              <div className="flex-1 flex justify-center">
                <video
                  src={section.video}
                  muted
                  autoPlay
                  loop
                  playsInline
                  className="w-full max-w-md rounded-lg"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="onboardingSection"
        className="px-6 md:px-[32px] max-w-6xl mx-auto md:mt-[56px] mt-48px text-[#333333]"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        <motion.h2
          className="text-center font-medium text-fluid-h2 mb-[24px] md:mb-[32px] lg:mb-[40px] tracking--5"
          variants={cardVariant}
        >
          Fast Data Onboarding & Customization
        </motion.h2>

        {onboardingItems.map((item, idx) => (
          <motion.div
            key={idx}
            className="bg-gray-100 border border-pink-700 rounded-xl p-6 mb-[24px] md:mb-[32px] lg:mb-[40px] shadow-sm mx-auto"
            variants={cardVariant}
            transition={{ delay: idx * 0.2 }}
          >
            <div className="video-wrapper overflow-hidden rounded-xl">
              <video
                src={item.video}
                muted
                autoPlay
                loop
                playsInline
                controls={false}
                preload="auto"
                className="w-full h-auto object-contain block"
              />
            </div>
            <p className="text-center font-semibold text-fluid-caption mt-12px tracking--2">
              {item.text}
            </p>
          </motion.div>
        ))}
      </motion.section>
    </>
  );
}
