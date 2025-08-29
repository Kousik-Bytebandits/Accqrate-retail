import React, { useContext, useState, useEffect } from "react";
import Skeleton from "../components/skeleton";
import { LoadingContext } from "../utils/LoadingContext";
import { motion } from "framer-motion";

export default function Ready() {
  const { loading } = useContext(LoadingContext);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = document.getElementById("readySection");
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

  const buttons = ["REQUEST A DEMO", "CONTACT SALES", "LEARN MORE"];

  if (loading || !isVisible) {
    return (
      <section
        id="readySection"
        className="bg-gray-200 py-12 px-4 text-center min-h-full mt-20"
      >
        <Skeleton
          height="36px"
          width="60%"
          className="mb-8 mx-auto rounded-md"
        />
        <div className="flex flex-wrap justify-center gap-4">
          {buttons.map((_, idx) => (
            <Skeleton
              key={idx}
              height="44px"
              width="180px"
              className="rounded-full"
            />
          ))}
        </div>
      </section>
    );
  }

  const fadeInRight = {
    hidden: { x: 100, opacity: 0 }, // start offscreen right
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <motion.section
      id="readySection"
      className="bg-[#F2F2F2] py-12 px-4 text-center min-h-full mt-20"
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      <motion.h2
        className="text-black font-normal mb-8 text-fluid-h2"
        variants={fadeInRight}
      >
        Ready to accelerate your retail business?
      </motion.h2>
      <motion.div
        className="flex flex-col lg:flex-row md:max-w-[700px] mx-auto justify-center gap-4"
        variants={fadeInRight}
        transition={{ delay: 0.2 }}
      >
        {buttons.map((label, idx) => (
          <motion.button
            key={idx}
            className="bg-[#C2185C] hover:bg-pink-800 text-white font-light rounded-lg px-6 py-2 w-[260px] md:w-[300px] mx-auto text-center transition-colors"
            variants={fadeInRight}
            transition={{ delay: 0.3 + idx * 0.2 }} // stagger each button slightly
          >
            {label}
          </motion.button>
        ))}
      </motion.div>
    </motion.section>
  );
}
