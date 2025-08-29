import CustomVideo from "../components/video";
import CustomButton from "../components/button";
import Paragraph from "../components/paragraph";
import CustomImage from "../components/Image";
import { useContext } from "react";
import { LoadingContext } from "../utils/LoadingContext";
import Skeleton from "../components/skeleton";

export default function Accqrate() {
  const { loading } = useContext(LoadingContext);

  const sectionPadding = "px-4 py-8 md:py-12 md:px-6";

  if (loading) {
    return (
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
    );
  }

  return (
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
      

      <div className="flex flex-wrap justify-center gap-4 mt-8 md:mt-12">
        <CustomButton className="w-full max-w-[280px] py-2 h-12 bg-[#C2185C] text-white text-lg font-semibold rounded-[53px] hover:bg-[#a0164d] md:text-base md:w-[90%] sm:text-base sm:w-full">
          REQUEST A DEMO
        </CustomButton>
        <CustomButton className="w-full max-w-[280px] py-2 h-12 bg-[#C2185C] text-white text-lg font-semibold rounded-[53px] hover:bg-[#a0164d] md:text-base md:w-[90%] sm:text-base sm:w-full">
          CONTACT SALES
        </CustomButton>
      </div>
    </section>
  );
}