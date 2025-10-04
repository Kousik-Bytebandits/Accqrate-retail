"use client";

import { CustomImage } from "../components/CommonComponents";
import React, { useContext, useRef, JSX } from "react";
import { LoadingContext } from "../utils/LoadingContext";
import { Skeleton } from "../components/ui/skeleton"
import { motion, useInView } from "framer-motion";
import ButtonGroup from "../components/ui/ButtonGroup";

interface ButtonProps {
  text: string;
  href: string;
  variant?: "filled" | "outline";
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
}

const Accqrate: React.FC = (): JSX.Element => {
  const { loading } = useContext(LoadingContext);
  const heroRef = useRef<HTMLElement>(null);
  const isVisible = useInView(heroRef);

  const sectionClasses = "w-full bg-[#F2F2F2] mt-32px md:mt-[40px] pt-[32px]";
  const containerClasses =
    "flex flex-col text-center lg:flex-row justify-between max-w-[1300px] mx-auto gap-[12px] px-24px md:px-[32px] items-center";

  if (loading) {
    return (
      <>
        {/* Accqrate Section Skeleton */}
        <section
          className="w-full px-6 md:px-8 flex flex-col items-center text-[#333333] mt-20"
        >
          {/* Main Heading Skeleton */}
          <Skeleton className="h-12 md:h-16 w-64 md:w-80 mx-auto mb-8" />

          {/* Subheading Skeleton */}
          <Skeleton className="h-8 md:h-10 w-72 md:w-96 mx-auto mb-6" />

          {/* Description Line 1 */}
          <Skeleton className="h-6 w-80 md:w-[500px] mx-auto mb-4" />

          {/* Description Line 2 */}
          <Skeleton className="h-5 w-72 md:w-[400px] mx-auto mb-8" />

          {/* Buttons Skeleton */}
          <div className="flex gap-4 mb-12">
            <Skeleton className="h-12 w-40 rounded-full" />
            <Skeleton className="h-12 w-40 rounded-full" />
          </div>
        </section>

        {/* Dashboard Section Skeleton */}
        <section className="w-full flex items-center justify-center px-6 md:px-8 mb-12">
          <div className="relative w-full max-w-[1200px]">
            <Skeleton className="w-full h-[300px] md:h-[400px] rounded-lg" />
          </div>
        </section>

        {/* Built Section Skeleton */}
        <section className="w-full bg-[#F2F2F2] mt-8 md:mt-10 pt-8">
          <div className="flex flex-col lg:flex-row justify-between max-w-[1300px] mx-auto gap-6 px-6 md:px-8 items-center">
            {/* Text Content Skeleton */}
            <div className="flex flex-col justify-center flex-1 space-y-4">
              <Skeleton className="h-8 md:h-10 w-48 md:w-56" />
              <Skeleton className="h-6 w-full max-w-[400px]" />
              <Skeleton className="h-6 w-3/4 max-w-[350px]" />
            </div>

            {/* Image Skeleton */}
            <div className="flex justify-center w-full lg:w-auto">
              <Skeleton className="h-[200px] md:h-[250px] w-[200px] md:w-[250px] rounded-lg" />
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* Accqrate Section */}
      <section
        className={`w-full px-24px md:px-[32px] flex flex-col items-center text-[#333333]`}
      >
        <h2 className="text-center text-fluid-h1 leading-tight tracking--5 font-semibold mt-82px">
          <span className="text-[#333333] ">Accqrate</span>{" "}
          <span className="text-[#C2185B] ">Retail</span>
        </h2>

        <p className="text-center text-fluid-h2 leading-tight tracking--2 font-light mt-32px md:mt-[40px]">
          Your Modern{" "}
          <span className="text-[#C2185C] font-medium text-fluid-h2">
            ZATCA Compliant
          </span>{" "}
          Pos Platform
        </p>

        <p
          className="text-center text-fluid-body font-light tracking--2 leading-tight md:font-semibold mt-32px md:mt-[40px]"
          style={{ WebkitLineClamp: 2 }}
        >
          All-in-one retail management, designed for speed and flexibility
        </p>

        <p className="max-w-[700px] text-center text-fluid-body tracking--2 font-normal text-[#737373] mt-[16px] md:mt-[24px]">
          Launch your store in minutes, manage everything in one place - from
          sales to stock, from any device
        </p>

        <div className="flex justify-center">
          <ButtonGroup
            buttons={[
              {
                text: "REQUEST A DEMO",
                href: "/demo",
                variant: "filled",
                bgColor: "bg-[#C2185C]",
                textColor: "text-white",
              },
              {
                text: "CONTACT SALES",
                href: "/contact",
                variant: "outline",
                borderColor: "border-[#C2185C]",
              },
            ]}
          />
        </div>
      </section>

      {/* Dashboard Section */}
      <section className="w-full flex items-center justify-center box-border px-24px md:px-[32px]">
        <div className="relative w-full max-w-[1200px] overflow-visible">
          <video
            src="/videos/accqratedashboard.mp4"
            muted
            autoPlay
            loop
            playsInline
            controls={false}
            preload="auto"
            className="w-full h-auto block object-contain max-h-[60vh] sm:max-h-[60vh]"
          />
        </div>
      </section>

      {/* Built Section */}
      <section className={sectionClasses}>
        <div className={containerClasses}>
          {/* Text */}
          <motion.div
            className="flex flex-col justify-center flex-1 text-[#333333]"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-fluid-h2 font-semibold text-[#C2185B] tracking--2">
              Built-In{" "}
              <span className="text-[#C2185B] font-semibold tracking--2">
                E-Invoicing Compliance
              </span>
            </h2>
            <p className="mx-auto mt-32px md:mt-[40px] text-fluid-h3 md:max-w-[500px] sm:text-base tracking--2 font-normal">
              <span className="font-semibold text-black">100% ZATCA</span> phase
              2 compliance: Issue e-invoice receipts with every sale, no extra
              fees
            </p>
          </motion.div>

          {/* Image */}
          <motion.div
            className="sm:flex sm:justify-center w-auto"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <CustomImage
              src="/images/zatak.svg"
              alt="E-Invoice"
              width={350}
              height={350}
              className="h-[200px] md:h-[250px]"
            />
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Accqrate;