"use client";

import React, { useState, useEffect } from "react";
import { Skeleton } from "../components/ui/skeleton";
import AccordionCard from "../components/ui/AccordionSilverCard";
import { Accordion } from "../components/ui/accordion";
import { motion, Variants } from "framer-motion";
import ScrollReveal from "../components/ui/ScrollReveal";

interface ErpFeature {
  text: string;
  video: string;
}

const Pos: React.FC = () => {
  const [isPosVisible, setIsPosVisible] = useState<boolean>(false);
  const [isErpVisible, setIsErpVisible] = useState<boolean>(false);

  // IntersectionObserver for multiple sections
  useEffect(() => {
    const posSection = document.getElementById("posSection");
    const erpSection = document.getElementById("erpSection");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.id === "posSection") setIsPosVisible(true);
            if (entry.target.id === "erpSection") setIsErpVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (posSection) observer.observe(posSection);
    if (erpSection) observer.observe(erpSection);

    return () => {
      if (posSection) observer.unobserve(posSection);
      if (erpSection) observer.unobserve(erpSection);
    };
  }, []);

  // Show skeleton only when both sections are not visible
  if (!isPosVisible && !isErpVisible) {
    return (
      <>
        {/* POS Section Skeleton */}
        <section id="posSection" className="px-6 md:px-8 mt-12 md:mt-[56px]">
          <div className="max-w-[1000px] mx-auto">
            {/* Main Video Skeleton */}
            <Skeleton className="w-full h-[220px] md:h-[280px] rounded-lg mb-6" />

            {/* Accordion Cards Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="border border-gray-200 rounded-lg p-4">
                  {/* Icon Skeleton */}
                  <Skeleton className="w-12 h-12 rounded-md mb-3" />

                  {/* Title Skeleton */}
                  <Skeleton className="h-6 w-3/4 mb-2" />

                  {/* Content Skeleton */}
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ERP Section Skeleton */}
        <section id="erpSection" className="px-6 md:px-8 mt-24 md:mt-32">
          <div className="max-w-[1200px] mx-auto text-center">
            {/* Heading Skeleton */}
            <div className="max-w-4xl mx-auto mb-6">
              <Skeleton className="h-8 md:h-10 w-3/4 mx-auto mb-4" />
              <Skeleton className="h-6 w-5/6 mx-auto" />
            </div>

            {/* ERP Features Skeleton */}
            <div className="space-y-8 md:space-y-12">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  {/* Text Content Skeleton */}
                  <div className="flex-1 text-left space-y-2 max-w-lg">
                    <Skeleton className="h-6 w-4/5" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>

                  {/* Video Skeleton */}
                  <div className="flex-1 flex justify-center">
                    <Skeleton className="w-full max-w-md h-[200px] md:h-[250px] rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }

  // Variants for POS animations
  const containerVariant: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, when: "beforeChildren" },
    },
  };

  const itemVariant: Variants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // ERP-specific variants (video-only animation)
  const erpVideoContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.4, when: "beforeChildren" },
    },
  };

  const videoVariantLeft: Variants = {
    hidden: { x: -120, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  // ERP Features
  const erpFeatures: ErpFeature[] = [
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
  ];

  return (
    <>
      {/* POS Section */}
      <section
        id="posSection"
        className="px-6 md:px-8 mt-12 md:mt-[56px] text-[#333333]"
      >
        <motion.div
          variants={containerVariant}
          initial="hidden"
          animate={isPosVisible ? "visible" : "hidden"}
          className="max-w-[1000px] mx-auto"
        >
          <motion.div variants={itemVariant}>
            <video
              src="/videos/barcode.mp4"
              muted
              autoPlay
              loop
              playsInline
              className="w-full h-auto object-contain rounded-lg"
            />
          </motion.div>

          <Accordion
            type="single"
            collapsible
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6"
          >
            <AccordionCard
              value="card-1"
              icon="/images/instant.png"
              title="Direct Interface to Tax Portals"
            >
              Extra details about <b>Instant Access</b> will appear here when
              expanded.
            </AccordionCard>
            <AccordionCard
              value="card-2"
              icon="/images/invoice.png"
              title="Custom Invoices Templates"
            >
              Extra details about <b>Automated Data Migration</b> will be shown
              here.
            </AccordionCard>
            <AccordionCard
              value="card-3"
              icon="/images/audit.png"
              title="Audit Trails & Deletion Logs"
            >
              Extra details about <b>Role-Based User Setup</b> will go here.
            </AccordionCard>
          </Accordion>
        </motion.div>
      </section>

      {/* ERP Section */}
      <section
        id="erpSection"
        className="px-6 md:px-8 max-w-[1200px] mx-auto text-center mt-[48px] md:[56px] text-[#333333]"
      >
        <motion.div
          variants={erpVideoContainer}
          initial="hidden"
          animate={isErpVisible ? "visible" : "hidden"}
        >
          <ScrollReveal
            as="h2"
            containerClassName="text-fluid-h2 font-medium tracking-tight leading-tight"
          >
            Grows with Your Business
            <br className="md:hidden" />
            <span className="text-fluid-h2 font-medium">
              Scale to Full <span className="text-[#C2185B]">ERP</span> Instantly
            </span>
          </ScrollReveal>

          <ScrollReveal
            as="p"
            containerClassName="text-fluid-caption text-[#737373] max-w-4xl mx-auto"
          >
            As your business grows, Accqrate Retail grows with you. Flip the
            switch to add procurement, finance, HR and supply-chain modules—no
            data migration, no downtime.
          </ScrollReveal>

          {erpFeatures.map((feature, i) => (
            <div
              key={i}
              className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mt-6 md:mt-8 lg:mt-10"
            >
              {/* Text stays static */}
              <p className="flex-1 text-left leading-snug text-fluid-h3 text-[#C2185B] font-light max-w-lg">
                {feature.text}
              </p>

              {/* Video slides in left-to-right */}
              <motion.div
                className="flex-1 flex justify-center"
                variants={videoVariantLeft}
              >
                <video
                  src={feature.video}
                  muted
                  autoPlay
                  loop
                  playsInline
                  className="w-full max-w-md h-auto rounded-lg"
                />
              </motion.div>
            </div>
          ))}
        </motion.div>
      </section>
    </>
  );
};

export default Pos;