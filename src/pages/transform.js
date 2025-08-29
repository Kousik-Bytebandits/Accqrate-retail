import React, { useContext, useState, useEffect } from "react";
import Skeleton from "../components/skeleton";
import { LoadingContext } from "../utils/LoadingContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Transform() {
  const { loading } = useContext(LoadingContext);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer to trigger animation
  useEffect(() => {
    const element = document.getElementById("transformSection");
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
    );
  }

  // Framer Motion variants
  const containerVariant = {
    hidden: { x: -100, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1, 
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 } 
    },
  };

  const itemVariant = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section id="transformSection" className={sectionPadding}>
      <motion.div
        className="space-y-12"
        variants={containerVariant}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        {/* Header */}
        <motion.div className="text-center" variants={itemVariant}>
          <h2 className="text-fluid-h2 md:font-light font-medium mb-4 md:max-w-[700px] mx-auto">
            Transform Your Retail Operations with{" "}
            <span className="text-[#C2185B] font-bold md:font-light">
              Zero-Hassle
            </span>{" "}
            Onboarding
          </h2>
          <p className="text-[#000000B2] text-fluid-body font-light max-w-3xl mx-auto">
            Get up and running in minutes, not days. Accqrate Retail’s
            cloud-native architecture means you can onboard each outlet
            effortlessly—no dedicated POS hardware, no complex installations.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4" variants={itemVariant}>
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
              className="bg-[#A1A1A1] text-white px-4 rounded-lg w-auto h-[250px] md:h-[320px] flex flex-col items-center justify-start py-2 cursor-pointer transition-colors duration-300 hover:bg-[#C2185B] group"
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
  );
}
