"use client";

import React, { useEffect, useRef, useMemo, JSX } from "react";
import gsap from "gsap";

interface ScrollRevealProps<T extends keyof JSX.IntrinsicElements = "h2"> {
  children: string | React.ReactNode;
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
  as?: T;
}

const ScrollReveal = <T extends keyof JSX.IntrinsicElements = "h2">({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.2,
  baseRotation = 2,
  blurStrength = 2,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom 60%",
  as = "h2" as T,
}: ScrollRevealProps<T>) => {
  // Correctly type the ref based on the 'as' element
  const containerRef = useRef<HTMLElement & SVGElement | null>(null);

  // Split text into words
  const splitText = useMemo(() => {
    if (typeof children !== "string") return children;
    return children.split(/(\s+)/).map((word, index) =>
      /^\s+$/.test(word) ? word : (
        <span className="inline-block word" key={index}>
          {word}
        </span>
      )
    );
  }, [children]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let triggers: gsap.core.ScrollTrigger[] = [];

    (async () => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const el = containerRef.current;
      if (!el) return;

      const scroller = scrollContainerRef?.current || undefined;
      ScrollTrigger.refresh();

      // Rotation animation
      triggers.push(
        gsap.fromTo(
          el,
          { transformOrigin: "0% 50%", rotate: baseRotation },
          {
            rotate: 0,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              scroller,
              start: "top bottom",
              end: rotationEnd,
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        ).scrollTrigger as gsap.core.ScrollTrigger
      );

      // Opacity/Y/blur animation
      const targets =
        typeof children === "string" ? el.querySelectorAll(".word") : [el];

      triggers.push(
        gsap.fromTo(
          targets,
          {
            opacity: baseOpacity,
            y: 20,
            filter: enableBlur ? `blur(${blurStrength}px)` : "blur(0px)",
            willChange: "opacity, transform, filter",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            ease: "power2.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: el,
              scroller,
              start: "top bottom-=10%",
              end: wordAnimationEnd,
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        ).scrollTrigger as gsap.core.ScrollTrigger
      );
    })();

    return () => triggers.forEach((t) => t.kill());
  }, [
    scrollContainerRef,
    enableBlur,
    baseRotation,
    baseOpacity,
    rotationEnd,
    wordAnimationEnd,
    blurStrength,
    children,
  ]);

  const Component = as;

  return (
    <Component ref={containerRef as any} className={containerClassName}>
      {typeof children === "string" ? (
        <span className={textClassName}>{splitText}</span>
      ) : (
        children
      )}
    </Component>
  );
};

export default ScrollReveal;
