"use client";

import React, { useContext, useState, useEffect, JSX } from "react";
import { Skeleton } from "../components/ui/skeleton"
import { LoadingContext } from "../utils/LoadingContext";
import { motion, Variants, easeOut } from "framer-motion";
import { AccordionCard } from "../components/ui/accordion";
import ScrollReveal from "../components/ui/ScrollReveal";

interface Card {
  title: string;
  desc: string;
  video: string;
}

export default function Transform(): JSX.Element {
  const { loading } = useContext(LoadingContext);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // INTERSECTION OBSERVER
  useEffect(() => {
    const transformEl = document.getElementById("transformSection");
    const ownerEl = document.getElementById("ownerSection");

    const observerCallback: IntersectionObserverCallback = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) setIsVisible(true);
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: "0px",
      threshold: 0.3,
    });

    if (transformEl) observer.observe(transformEl);
    if (ownerEl) observer.observe(ownerEl);

    return () => {
      if (transformEl) observer.unobserve(transformEl);
      if (ownerEl) observer.unobserve(ownerEl);
    };
  }, []);

  const sectionPadding =
    "mt-24px md:mt-[32px] lg:mt-[40px] px-24px md:px-[32px] w-full max-w-[1350px] mx-auto";

  if (loading || !isVisible) {
    return (
      <>
        {/* HEADING & DESCRIPTION */}
        <section className="mt-48px px-24px text-center max-w-[1200px] mx-auto">
          <Skeleton height="36px" width="70%" className="mx-auto mb-6" />
          <Skeleton height="20px" width="90%" className="mx-auto mb-3" />
          <Skeleton height="20px" width="80%" className="mx-auto" />
        </section>

        {/* TRANSFORM SECTION (CARDS) */}
        <section id="transformSection" className={sectionPadding}>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-[24px] text-[#333333]">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-gray-200 rounded-lg w-full sm:h-[280px] md:h-[320px] lg:h-[340px] p-4 flex flex-col justify-start"
              >
                <Skeleton height="20px" width="70%" className="mb-4" />
                <div className="flex-1 flex flex-col items-center justify-center gap-3">
                  <Skeleton height="16px" width="80%" />
                  <Skeleton height="120px" width="100%" className="rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* OWNER SECTION */}
        <section
          id="ownerSection"
          className="bg-[#F2F2F2] w-full max-w-[1280px] h-auto md:h-[190px] mx-auto flex items-center justify-center mt-24px rounded-lg px-24px py-8 md:py-0"
        >
          <div className="flex items-center justify-center text-center md:text-left max-w-2xl w-full">
            <div className="w-full">
              <Skeleton height="28px" width="90%" className="mb-5 mx-auto md:mx-0" />
              <Skeleton height="16px" width="40%" className="mx-auto md:mx-0" />
            </div>
          </div>
        </section>
      </>
    );
  }

  const cards: Card[] = [
    { title: "No POS hardware needed", desc: "Works instantly on Android, iOS, Windows, and Mac", video: "/videos/card1.mp4" },
    { title: "Zero hassle setup", desc: "Cloud-based and ready to use — no installations or IT assistance needed.", video: "/videos/card2.mp4" },
    { title: "Plug-and-Play Printers", desc: "No drivers, no manual setup—automatic detection and configuration", video: "/videos/card3.mp4" },
    { title: "Auto-Print & Cut", desc: "Receipts print, cut and display for customers instantly.", video: "/videos/card4.mp4" },
  ];

  // FIXED FRAMER MOTION VARIANT
  const variant: Variants = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: easeOut } },
  };

  return (
    <>
      <div className="md:max-w-5xl mx-auto text-[#333333]">
        <ScrollReveal
          as="h1"
          containerClassName="text-center text-fluid-h2 leading-tight tracking--5 font-semibold mt-48px md:mt-[56px] px-24px md:px-[32px]"
        >
          Transform Your Retail Operations with{" "}
          <span className="text-[#C2185B]"> Zero-Hassle </span> Onboarding
        </ScrollReveal>
        <ScrollReveal
          as="p"
          containerClassName="text-center text-fluid-caption px-24px md:px-[32px] font-light tracking--2 w-full max-w-[1280px] mx-auto text-[#333333]"
        >
          Get up and running in minutes, not days. Accqrate Retail’s cloud-native architecture means you can onboard each outlet effortlessly—no dedicated POS hardware, no complex installations.
        </ScrollReveal>
      </div>

      <section id="transformSection" className={sectionPadding}>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-[16px]">
          {cards.map((card, idx) => (
            <AccordionCard
              key={idx}
              title={card.title}
              desc={card.desc}
              video={card.video}
              isOpen={openIndex === idx}
              onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
            />
          ))}
        </div>
      </section>

      <div className="px-6 md:px-[32px] max-w-[1350px] mx-auto">
        <section
          id="ownerSection"
          className="bg-[#F2F2F2] rounded-lg mx-auto px-6 sm:px-6 md:p-10 text-[#333333] h-auto sm:h-[110px] md:h-[129px] lg:h-[182px] flex flex-col items-center justify-center mt-6 md:mt-[32px] lg:mt-[40px]"
        >
          <motion.div className="w-full" variants={variant} initial="hidden" animate={isVisible ? "visible" : "hidden"}>
            <div className="mx-auto text-left md:max-w-4xl">
              <ScrollReveal
                as="p"
                containerClassName="font-light leading-snug text-fluid-caption md:text-fluid-body lg:text-fluid-h3 mb-5"
              >
                “We set up 5 new outlets in under an hour no IT team needed.”
              </ScrollReveal>
              <ScrollReveal
                as="p"
                containerClassName="text-gray-500 text-xs sm:text-base md:text-fluid-body flex justify-end"
              >
                — Retail Owner, Jeddah
              </ScrollReveal>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
}
