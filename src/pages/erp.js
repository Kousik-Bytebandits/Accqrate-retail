import React, { useContext, useState, useEffect } from "react";
import Skeleton from "../components/skeleton";
import { LoadingContext } from "../utils/LoadingContext";
import { motion } from "framer-motion";

export default function Erp() {
  const { loading } = useContext(LoadingContext);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = document.getElementById("erpSection");
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
      <section id="erpSection" className="px-5 max-w-[1200px] mx-auto text-center mt-2">
        <Skeleton height="36px" width="60%" className="mb-4 mx-auto" />
        <Skeleton height="20px" width="80%" className="mb-3 mx-auto" />
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex flex-col md:flex-row items-center justify-between gap-10 mb-6">
            <Skeleton height="20px" width="60%" className="mb-3 md:mb-0 mx-auto md:mx-0" />
            <Skeleton height="180px" width="100%" className="mx-auto" />
          </div>
        ))}
      </section>
    );
  }

  const containerVariant = {
    hidden: { x: 100, opacity: 0 }, // start offscreen right
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section
      id="erpSection"
      className="px-5 max-w-[1200px] mx-auto text-center mt-14"
    >
      <motion.div
        variants={containerVariant}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        <h2 className="text-fluid-h2 font-normal mb-2 leading-snug">
          Grows with Your Business—<br />
          <span className="text-fluid-h2 font-normal">
            Scale to Full <span className="text-[#C2185B]">ERP</span> Instantly
          </span>
        </h2>
        <p className="text-fluid-body text-gray-600 mb-12 max-w-4xl mx-auto">
          As your business grows, Accqrate Retail grows with you. Flip the switch to add
          procurement, finance, HR and supply-chain modules—no data migration, no downtime.
        </p>

        {[
          {
            text: "Central procurement: Manage suppliers and POs across all locations.",
            video: "/videos/pos.mp4",
          },
          {
            text: "Real-time inventory: See live stock updates and automate reordering.",
            video: "/videos/dashboard.mp4",
          },
          {
            text: "Safety-stock alerts: Never run out, never over-order.",
            video: "/videos/crm.mp4",
          },
        ].map((feature, i) => (
          <motion.div
            key={i}
            className="flex flex-col md:flex-row items-center justify-between gap-10 mb-12"
            initial={{ x: 100, opacity: 0 }}
            animate={isVisible ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: i * 0.2 }}
          >
            <p className="flex-1 text-left text-fluid-h3 text-[#C2185B] font-light max-w-md">
              {feature.text}
            </p>
            <div className="flex-1 flex justify-center">
              <video
                src={feature.video}
                muted
                autoPlay
                loop
                playsInline
                controls={false}
                preload="auto"
                className="w-full max-w-md h-auto"
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
