import React, { useContext, useState, useEffect } from "react";
import Skeleton from "../components/skeleton";
import { LoadingContext } from "../utils/LoadingContext";
import { motion } from "framer-motion";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/src/components/ui/accordion";
export default function Pos() {
  const { loading } = useContext(LoadingContext);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer to trigger animation
  useEffect(() => {
    const element = document.getElementById("posSection", "erpSection");
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
    <>
      {/* POS Section Skeleton */}
      <section
        id="posSection"
        className="px-24px rounded-xl mt-48px"
      >
        <div className="max-w-[1000px] mx-auto">
          {/* Video placeholder */}
          <Skeleton height="220px" width="100%" className="rounded-lg mb-6" />

          {/* Accordion cards skeleton */}
          <div
            className="flex flex-col gap-[24px]
              sm:grid sm:grid-cols-2
              md:grid md:grid-cols-3 md:max-w-5xl mx-auto mt-24px"
          >
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-gray-200 w-full h-auto rounded-lg p-[24px] flex flex-col gap-4"
              >
                {/* Icon placeholder */}
                <Skeleton height="45px" width="45px" className="mb-2" />
                {/* Title placeholder */}
                <Skeleton height="24px" width="80%" className="mb-2" />
                {/* Small text line */}
                <Skeleton height="16px" width="60%" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ERP Section Skeleton */}
      <section
        id="erpSection"
        className="px-24px max-w-[1200px] mx-auto text-center mt-48px"
      >
        {/* Heading */}
        <Skeleton height="36px" width="70%" className="mb-6 mx-auto" />
        <Skeleton height="20px" width="90%" className="mb-4 mx-auto" />

        {/* 3 Feature rows */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="flex flex-col lg:flex-row lg:items-start justify-between gap-10 mt-24px"
          >
            {/* Text block skeleton */}
            <div className="flex-1">
              <Skeleton height="20px" width="80%" className="mb-3 mx-auto lg:mx-0" />
              <Skeleton height="20px" width="60%" className="mb-3 mx-auto lg:mx-0" />
            </div>

            {/* Video placeholder */}
            <div className="flex-1 flex justify-center">
              <Skeleton height="220px" width="100%" className="max-w-md rounded-lg" />
            </div>
          </div>
        ))}
      </section>
    </>
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

  const containerVariant = {
    hidden: { x: 100, opacity: 0 }, // start offscreen right
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <>
      {/* Pos Section */}
    <section
      id="posSection"
      className=" px-24px rounded-xl  mt-48px"
    >
      <motion.div
        variants={variant}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="max-w-[1000px] mx-auto"
      >
        <div className="">
          <video
            src="/videos/barcode.mp4"
            muted
            autoPlay
            loop
            playsInline
            className="w-full h-auto object-contain rounded-lg"
          />
        </div>
         <Accordion
          type="single"
          collapsible
          className="flex flex-col gap-[24px]
    sm:grid sm:grid-cols-2
    md:grid md:grid-cols-3 md:max-w-5xl mx-auto  mt-24px"
        >
          {/* Card 1 */}
          <AccordionItem
            value="card-1"
            className="flex flex-col justify-center bg-gradient-to-r from-[#E6E6E6] to-[#C8C8C8]
      w-full h-auto rounded-lg p-[24px] "
          >
            <AccordionTrigger className="flex justify-between items-start w-full hover:no-underline">
              {/* Left: Icon + Title */}
              <div className="flex flex-col items-start gap-[24px]">
                <img
                  src="/images/instant.png"
                  alt="Instant Access Icon"
                  className="w-[45px] h-[45px]"
                />
                <span className="text-black text-fluid-h3 font-normal">
                  Direct Interface to Tax Portals
                </span>
              </div>
              {/* The arrow will render automatically here */}
            </AccordionTrigger>

            <AccordionContent className="px-1 pb-2 text-gray-700 text-sm">
              Extra details about <b>Instant Access</b> will appear here when expanded.
            </AccordionContent>
          </AccordionItem>

          {/* Card 2 */}
          <AccordionItem
            value="card-2"
            className="flex flex-col justify-center bg-gradient-to-r from-[#E6E6E6] to-[#C8C8C8]
      w-full h-auto rounded-lg p-[24px]"
          >
            <AccordionTrigger className="flex justify-between items-start w-full hover:no-underline">
              <div className="flex flex-col items-start gap-[24px]">
                <img
                  src="/images/invoice.png"
                  alt="Automated Data Migration Icon"
                  className="w-[45px] h-[45px]"
                />
                <span className="text-black text-fluid-h3 text-left font-normal">
                  Custom Invoices Templates
                </span>
              </div>
            </AccordionTrigger>

            <AccordionContent className="px-1 pb-2 text-gray-700 text-sm">
              Extra details about <b>Automated Data Migration</b> will be shown here.
            </AccordionContent>
          </AccordionItem>

          {/* Card 3 */}
          <AccordionItem
            value="card-3"
            className="flex flex-col justify-center bg-gradient-to-r from-[#E6E6E6] to-[#C8C8C8]
      w-full h-auto rounded-lg p-[24px]"
          >
            <AccordionTrigger className="flex justify-between items-start w-full hover:no-underline">
              <div className="flex flex-col items-start gap-[24px]">
                <img
                  src="/images/audit.png"
                  alt="Role based access Icon"
                  className="w-[45px] h-[45px]"
                />
                <span className="text-black text-left text-fluid-h3 font-normal">
                  Audit Trails & Deletion Logs
                </span>
              </div>
            </AccordionTrigger>

            <AccordionContent className="px-1 pb-2 text-gray-700 text-sm">
              Extra details about <b>Role-Based User Setup</b> will go here.
            </AccordionContent>
          </AccordionItem>
        </Accordion> 

      </motion.div>
    </section>

    {/* Erp Section */}
    <section
          id="erpSection"
          className="px-24px max-w-[1200px] mx-auto text-center mt-48px"
        >
          <motion.div 
            variants={containerVariant}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            <h2 className="text-fluid-h2 font-medium tracking--2 leading-tight ">
              Grows with Your Business<br />
              <span className="text-fluid-h2 font-medium">
                Scale to Full <span className="text-[#C2185B]">ERP</span> Instantly
              </span>
            </h2>
            <p className="text-fluid-caption text-[#737373] mt-16px tracking--2 max-w-4xl mx-auto">
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
                className="flex flex-col  lg:flex-row lg:items-start  justify-between gap-10 mt-24px"
                initial={{ x: 100, opacity: 0 }}
                animate={isVisible ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: i * 0.2 }}
              >
                <p className="flex-1 text-left leading-snug text-fluid-h3 text-[#C2185B] font-light max-w-lg">
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
        </>
  );
}
