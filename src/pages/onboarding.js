import React, { useContext, useState, useEffect } from "react";
import { LoadingContext } from "../utils/LoadingContext";
import Skeleton from "../components/skeleton";
import { motion } from "framer-motion";

export default function Onboarding() {
  const { loading } = useContext(LoadingContext);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = document.getElementById("onboardingSection");
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

  if (loading || !isVisible) {
    return (
      <section id="onboardingSection" className="px-5 max-w-6xl mx-auto mt-12">
        <Skeleton height="36px" width="60%" className="mx-auto mb-6 rounded-md" />
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
    );
  }

  const cardVariant = {
    hidden: { x: 100, opacity: 0 }, // start offscreen right
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <motion.section
      id="onboardingSection"
      className="px-5 max-w-6xl mx-auto mt-12"
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      <motion.h2
        className="text-center font-medium text-fluid-h2 mb-6"
        variants={cardVariant}
      >
        Fast Data Onboarding & Customization
      </motion.h2>

      {[
        {
          video: "/videos/Master Upload.mp4",
          text: "Bulk uploads: Import your entire product catalog via Excel, fast",
        },
        {
          video: "/videos/Add New Category.mp4",
          text: "Organize categories: Structure your catalog for easy browsing and search.",
        },
      ].map((item, idx) => (
        <motion.div
          key={idx}
          className="bg-gray-100 border border-pink-700 rounded-xl p-8 mb-8 shadow-sm w-11/12 mx-auto"
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
          <p className="text-center font-semibold text-fluid-body mt-3">
            {item.text}
          </p>
        </motion.div>
      ))}
    </motion.section>
  );
}
