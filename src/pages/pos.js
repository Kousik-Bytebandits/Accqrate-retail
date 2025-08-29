import React, { useContext, useState, useEffect } from "react";
import Skeleton from "../components/skeleton";
import { LoadingContext } from "../utils/LoadingContext";
import { motion } from "framer-motion";

export default function Pos() {
  const { loading } = useContext(LoadingContext);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer to trigger animation
  useEffect(() => {
    const element = document.getElementById("posSection");
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
      <section
        id="posSection"
        className="bg-gray-200 p-5 rounded-xl shadow-md mt-8"
      >
        <div className="max-w-[1000px] mx-auto">
          <Skeleton height="220px" width="100%" className="rounded-lg mb-6" />
          <div className="flex flex-wrap justify-center gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-gray-400 w-[300px] p-5 rounded-lg flex flex-col"
              >
                <Skeleton height="32px" width="80%" className="mb-2" />
                <Skeleton height="20px" width="100%" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Framer Motion variants for left-to-right slide
  const variant = {
    hidden: { x: -100, opacity: 0 }, // start offscreen left
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section
      id="posSection"
      className="bg-[#F2F2F2] p-5 rounded-xl mx-4 mt-8"
    >
      <motion.div
        variants={variant}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="max-w-[1000px] mx-auto"
      >
        <div className="mb-6">
          <video
            src="/videos/barcode.mp4"
            muted
            autoPlay
            loop
            playsInline
            className="w-full h-auto object-contain rounded-lg"
          />
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            {
              title: "Direct Interface to Tax portals",
              text: "Generate and transmit e- invoices in real time",
            },
            {
              title: "Custom Invoice Template",
              text: "Tailor layouts, logos and messaging without developer support.",
            },
            {
              title: "Audit Trails & Deletion Logs",
              text: "Track voids and deletions, record reasons—always audit-ready.",
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className="bg-[#8A8A8A] w-[330px] md:w-[290px] h-[100px] md:h-[200px] p-2 md:p-6 rounded-xl transition-transform hover:scale-[1.02] hover:-translate-y-1 hover:bg-[#C2185B] relative cursor-pointer"
            >
              <h3 className="text-white text-lg mb-2">{card.title}</h3>
              <p className="text-white opacity-0 transition-opacity hover:opacity-100">
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
