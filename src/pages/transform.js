import React, { useContext, useState, useEffect } from "react";
import Skeleton from "../components/skeleton";
import { LoadingContext } from "../utils/LoadingContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Transform() {
  const { loading } = useContext(LoadingContext);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer to trigger animation
  useEffect(() => {
    const element = document.getElementById("transformSection", "ownerSection");
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { rootMargin: "0px", threshold: 0.3 }
    );

    observer.observe(element);
    return () => element && observer.unobserve(element);
  }, []);

  const sectionPadding = "py-12 px-4 max-w-[1200px] mx-auto";

  if (loading || !isVisible) {
    return (
      <>
        <section id="transformSection" className={sectionPadding}>
          {/* Skeleton Header */}
          <div className="text-center mb-12">
            <Skeleton height="36px" width="60%" className="mx-auto mb-4" />
            <Skeleton height="20px" width="80%" className="mx-auto" />
          </div>

          {/* Skeleton Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-gray-400 rounded-lg w-auto h-[250px] md:h-[320px] flex flex-col items-center justify-start p-4"
              >
                <Skeleton height="20px" width="70%" className="mb-3" />
                <Skeleton height="16px" width="80%" className="mb-2" />
                <Skeleton height="100px" width="100px" />
              </div>
            ))}
          </div>
        </section>

        <section id="ownerSection" className="bg-gray-200 w-full mt-8 py-16">
          <div className="flex items-center justify-center text-center">
            <div className="max-w-2xl">
              <Skeleton height="32px" width="80%" className="mb-4 rounded-md" />
              <Skeleton height="20px" width="40%" className="rounded-md" />
            </div>
          </div>
        </section>
      </>
    );
  }

  // Framer Motion variants
  const containerVariant = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 },
    },
  };

  const itemVariant = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Framer Motion variants for right-to-left slide
  const variant = {
    hidden: { x: 100, opacity: 0 }, // start offscreen right
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <>
      <section id="transformSection" className={sectionPadding}>
        <motion.div
          className="space-y-12"
          variants={containerVariant}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {/* Header */}
          <motion.div className="text-center" variants={itemVariant}>
            <h2 className="text-fluid-h2 md:font-light font-medium mt-8 mb-8 md:max-w-[700px] mx-auto px-4 pt-1 pb-5">
              Transform Your Retail Operations with{" "}
              <span
                className="text-[#C2185B] 
   px-2 py-3 relative top-1 sm:top-2 md:top-4"
              >
                Zero-Hassle
              </span>{" "}
              <span className="relative top-1 sm:top-2 md:top-4">
                Onboarding
              </span>
            </h2>
            <p className="text-[#000000B2] text-fluid-body font-light max-w-3xl mx-auto px-4 py-2">
              Get up and running in minutes, not days. Accqrate Retail’s
              cloud-native architecture means you can onboard each outlet
              effortlessly—no dedicated POS hardware, no complex installations.
            </p>
          </motion.div>

          {/* Cards */}
<motion.div
  className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
  variants={itemVariant}
>
  {[
    {
      title: "No POS hardware needed",
      desc: "Works instantly on Android, iOS, Windows, and Mac",
      video: "/videos/card1.mp4",
    },
    {
      title: "Zero hassle setup",
      desc: "Cloud-based and ready to use — no installations or IT assistance needed.",
      video: "/videos/card2.mp4",
    },
    {
      title: "Plug-and-Play Printers",
      desc: "No drivers, no manual setup—automatic detection and configuration",
      video: "/videos/card3.mp4",
    },
    {
      title: "Auto-Print & Cut",
      desc: "Receipts print, cut and display for customers instantly.",
      video: "/videos/card4.mp4",
    },
  ].map((card, idx) => (
    <motion.div
      key={idx}
      className="bg-[#A1A1A1] text-white px-4 rounded-lg w-full h-[250px] md:h-[320px] flex flex-col items-center justify-start py-2 cursor-pointer transition-colors duration-300 hover:bg-[#C2185B] group"
      variants={itemVariant}
    >
      <p className="text-fluid-body font-medium text-left mb-2">
        {card.title}
      </p>
      <p className="text-fluid-small mt-6 text-left transition-opacity duration-300 group-hover:opacity-0">
        {card.desc}
      </p>
      <video
        src={card.video}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="hidden group-hover:block h-36 -mt-12 md:h-56 md:-mt-12 rounded-md"
      />
    </motion.div>
  ))}
</motion.div>

        </motion.div>
      </section>

      {/* Owner Section */}
      <section
  id="ownerSection"
  className="bg-[#F2F2F2] w-full md:w-[1266px] h-auto md:h-[190px] mx-auto flex items-center justify-center mt-2 rounded-lg px-4 py-8 md:py-0 "
>
  <motion.div
    className="flex items-center justify-center"
    variants={variant}
    initial="hidden"
    animate={isVisible ? "visible" : "hidden"}
  >
    <div className="max-w-5xl px-2 md:px-6 text-center md:text-left">
      <p className="font-light leading-tight text-lg sm:text-xl md:text-fluid-h3 lg:text-fluid-h2 mb-5">
        “We set up 5 new outlets in under an hour—no IT team needed.”
      </p>
      <p className="text-gray-500 text-sm sm:text-base md:text-fluid-body flex justify-center md:justify-end">
        — Retail Owner, Jeddah
      </p>
    </div>
  </motion.div>
</section>

    </>
  );
}
