import {CustomVideo} from "../components/CommonComponents"
import CustomButton from "../components/CommonComponents";
import {Paragraph} from "../components/CommonComponents";
import { CustomImage } from "../components/CommonComponents";
import { useContext } from "react";
import { LoadingContext } from "../utils/LoadingContext";
import Skeleton from "../components/skeleton";
import { motion } from "framer-motion";


export default function Accqrate() {
  const { loading } = useContext(LoadingContext);

  const sectionPadding = "px-4 py-8 md:py-12 md:px-6";

  const sectionClasses = "w-full bg-[#F2F2F2] mt-6 py-8";
  const containerClasses =
    "flex flex-col text-center lg:flex-row justify-between max-w-[1300px] mx-auto gap-5 px-6 ";

  if (loading) {
    return (
      <>
      {/* Accqrate section */}
      <section className={`w-full ${sectionPadding}`}>
        <div className="flex flex-col items-center">
          <Skeleton height="48px" width="60%" className="mb-8" />
          <Skeleton height="20px" width="40%" className="mb-3" />
          <Skeleton height="20px" width="80%" className="mb-3" />
          <Skeleton height="20px" width="70%" className="mb-3" />
          <Skeleton height="20px" width="50%" className="mb-3" />
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            <Skeleton height="44px" width="160px" />
            <Skeleton height="44px" width="160px" />
          </div>
        </div>
      </section>

      {/* Dashboard Section */}
      <section className="w-full flex items-center justify-center mt-4 box-border">
        <Skeleton height="220px" width="100%" className="mb-6 mx-auto" />
      </section>

      {/* Built Section */}
      <section className={sectionClasses}>
        <div className={containerClasses}>
          <div className="flex flex-col justify-center flex-1">
            <Skeleton height="36px" width="60%" className="mb-4" />
            <Skeleton height="20px" width="80%" className="mb-3" />
            <Skeleton height="20px" width="80%" className="mb-3" />
          </div>
          <Skeleton height="350px" width="350px" className="mx-auto" />
        </div>
      </section>
      
      </>
    );
  }

  return (

    <>
    {/* Accqrate Section */}
    <section className={`w-full ${sectionPadding} flex flex-col items-center`}>
      <h2 className="text-center text-fluid-h1 leading-tight font-medium mb-4 mt-4 ">
        <span className="text-black font-medium">Accqrate</span>{" "}
        <span className="text-[#C2185B] font-medium">Retail</span>
      </h2>

      <p className="text-center text-fluid-h2  leading-tight font-light  mb-4">
        Your Modern <span className="text-[#C2185C] font-medium text-fluid-h2">ZATCA Compliant</span> Pos Platform
      </p>

      <p lines={2} className="text-center text-fluid-h3 font-light leading-tight md:font-semibold text-black  mb-0 md:mb-4 ">
        All-in-one retail management, designed for speed and flexibility
      </p>

      <p className="md:block hidden max-w-[700px] text-center text-[20px] font-normal text-gray-700  mb-2">
        Launch your store in minutes, manage everything in one place - from sales to  stock, from any device
      </p>

      <div className="flex flex-wrap md:flex-nowrap w-full justify-center gap-4 mt-8 md:mt-12">
        <CustomButton className="w-full max-w-[280px] py-2 h-12 bg-[#C2185C] text-white text-lg font-semibold rounded-[53px] md:text-base md:w-[90%] sm:text-base sm:w-full">
          REQUEST A DEMO
        </CustomButton>
        <CustomButton className="w-full max-w-[280px] py-2 h-12 bg-white text-[#C2185C] border border-[#C2185C] text-lg font-semibold rounded-[53px]  md:text-base md:w-[90%] sm:text-base sm:w-full">
          CONTACT SALES
        </CustomButton>
      </div>
    </section>


    {/* Dashboard Section */}
    <section className="w-full flex items-center justify-center mt-4 box-border px-4 md:px-2 sm:px-1">
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
          className="flex flex-col justify-center flex-1"
          initial={{ opacity: 0, x: -50 }}   // start hidden, left
          whileInView={{ opacity: 1, x: 0 }} // fade in, slide right
          viewport={{ once: false, amount: 0.3 }} // animate every time in view
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-fluid-h2 font-semibold text-[#C2185B] mb-2">
            Built-In{" "}
            <span className="text-[#C2185B] font-semibold">
              E-Invoicing Compliance
            </span>
          </h2>
          <p className=" text-black mx-auto mt-4 text-fluid-h3 md:max-w-[500px] mb-1 sm:text-base">
            <span className="font-semibold text-black">100% ZATCA</span> phase 2
            compliance: Issue e-invoice receipts with every sale, no extra fees
          </p>
        </motion.div>

        {/* Image */}
        <motion.div
          className="sm:flex sm:justify-center w-auto"
          initial={{ opacity: 0, x: 50 }}    // start hidden, right
          whileInView={{ opacity: 1, x: 0 }} // fade in, slide left
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
}
