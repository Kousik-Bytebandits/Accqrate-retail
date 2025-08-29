import React, { useContext, useState, useEffect } from "react";
import { LoadingContext } from "../utils/LoadingContext";
import Skeleton from "../components/skeleton";
import { motion } from "framer-motion";

export default function Owner() {
  const { loading } = useContext(LoadingContext);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer to trigger animation
  useEffect(() => {
    const element = document.getElementById("ownerSection");
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
      <section id="ownerSection" className="bg-gray-200 w-full mt-8 py-16">
        <div className="flex items-center justify-center text-center">
          <div className="max-w-2xl">
            <Skeleton height="32px" width="80%" className="mb-4 rounded-md" />
            <Skeleton height="20px" width="40%" className="rounded-md" />
          </div>
        </div>
      </section>
    );
  }

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
    <section id="ownerSection" className="bg-[#F2F2F2] w-full mt-8 py-16">
      <motion.div
        className="flex items-center justify-center"
        variants={variant}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        <div className="max-w-6xl px-4 md:px-6">
          <p className="font-light leading-tight text-fluid-h3 md:text-fluid-h2 text-left mb-5">
            “We set up 5 new outlets in under an hour—no IT team needed.”
          </p>
          <p className="text-gray-500 text-fluid-body flex justify-end">
            — Retail Owner, Jeddah
          </p>
        </div>
      </motion.div>
    </section>
  );
}
