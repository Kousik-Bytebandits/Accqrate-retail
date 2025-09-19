import React, { useContext, useState, useEffect } from "react";
import Skeleton from "../components/skeleton";
import { LoadingContext } from "../utils/LoadingContext";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
export default function Transform() {
  const { loading } = useContext(LoadingContext);
  const [isVisible, setIsVisible] = useState(false);
 const [openIndex, setOpenIndex] = useState(null);


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

  
  const cards = [
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
  ];

  return (
    <>
       <section id="transformSection" className={sectionPadding}>
      {/* Grid Layout: 1 col mobile, 2 col tablet, 4 col desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
  {cards.map((card, idx) => (
    <div
      key={idx}
      className="bg-[#C2185B] text-white rounded-lg w-full
                 sm:h-[280px] md:h-[320px] lg:h-[340px]"
    >
      {/* Header */}
      <div
        className="flex justify-between items-center px-3 py-8 cursor-pointer"
        onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
      >
        <p className="font-medium text-[18px] leading-snug text-center mx-auto md:mx-0 md:text-left">{card.title}</p>
        {openIndex === idx ? (
          <ChevronUp className="w-5 h-5" />
        ) : (
          <ChevronDown className="w-5 h-5" />
        )}
      </div>

      {/* Mobile: Accordion dropdown */}
      <div className="block sm:hidden">
        <AnimatePresence>
          {openIndex === idx && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="px-4 pb-4"
            >
              <p className="text-sm mb-3 ">{card.desc}</p>
              <video
                src={card.video}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-[200px] rounded-lg"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Tablet & Desktop: Fixed-size content area */}
      <div className="hidden sm:flex flex-col h-[calc(90%-56px)] px-4 pb-4">
        {openIndex === idx ? (
          <video
            src={card.video}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-contain rounded-lg"
          />
        ) : (
          <p className="text-sm">{card.desc}</p>
        )}
      </div>
    </div>
  ))}
</div>

    </section>
      {/* Owner Section */}
      <section
  id="ownerSection"
  className="bg-[#F2F2F2] w-full max-w-[1280px] h-auto md:h-[190px] mx-auto flex items-center justify-center mt-2 rounded-lg px-4 py-8 md:py-0 "
>
  <motion.div
    className="flex items-center justify-center"
    variants={variant}
    initial="hidden"
    animate={isVisible ? "visible" : "hidden"}
  >
    <div className="max-w-2xl px-2 md:px-6 text-center md:text-left">
      <p className="font-light leading-snug text-fluid-small md:text-fluid-body lg:text-fluid-h3 mb-5">
        “We set up 5 new outlets in under an hour—no IT team needed.”
      </p>
      <p className="text-gray-500 text-xs sm:text-base md:text-fluid-body flex justify-end">
        — Retail Owner, Jeddah
      </p>
    </div>
  </motion.div>
</section>

    </>
  );
}
