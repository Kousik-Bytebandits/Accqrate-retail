import { useContext, useState, useEffect } from "react";
import Skeleton from "../components/skeleton";
import { LoadingContext } from "../utils/LoadingContext";
import Image from "next/image";

export default function Choose() {
  const { loading } = useContext(LoadingContext);
  const [isVisible, setIsVisible] = useState(false);

  const handleVisibilityChange = (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) setIsVisible(true);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleVisibilityChange, {
      rootMargin: "0px",
      threshold: 0.5,
    });

    const element = document.getElementById("chooseSection");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  if (loading || !isVisible) {
    return (
      <section
        id="chooseSection"
        className="bg-[#f2f2f2] text-center font-sans min-h-full m-0 py-8"
      >
        <Skeleton height="36px" width="60%" className="mb-6 mx-auto" />
        <Skeleton height="300px" width="700px" className="mb-6 mx-auto" />
        <Skeleton height="80px" width="80px" className="mb-6 mx-auto" />
        <Skeleton height="20px" width="80%" className="mb-3 mx-auto" />
        <Skeleton height="20px" width="80%" className="mb-3 mx-auto" />
        <Skeleton height="20px" width="80%" className="mb-3 mx-auto" />
      </section>
    );
  }

  return (
    <section
      id="chooseSection"
      className="bg-[#F2F2F2] text-center font-sans min-h-full m-0 py-12 px-4"
    >
      <h2 className="text-fluid-h2 font-normal mb-12">Why Choose Accqrate Retail?</h2>

      <div className="flex flex-col gap-12 items-center md:flex-row md:justify-center md:items-start">
        <div className="relative inline-block max-w-[600px] md:max-w-[600px]">
          <Image
            src="/images/choose.svg"
            alt="Why Choose Accqrate Retail"
            width={700}
            height={300}
            className="w-full h-auto  md:h-[450px] block"
            loading="lazy"
          />
          <Image
            src="/gif/Shopping.gif"
            alt="Animated Character"
            width={80}
            height={80}
            className="absolute right-0 bottom-0 md:bottom-16 md:right-[-10px] w-[100px] h-auto pointer-events-none"
            loading="lazy"
          />
        </div>

        <div className="max-w-[600px]  text-left md:max-w-[500px]">
          <p className="text-black font-light mb-8 text-fluid-h3 leading-tight">
            <span className="font-semibold">Compliance by design:</span>
            <br />
            Stay ready for every regulation—
            <br />
            no last-minute changes.
          </p>
          <ol className="pl-4 pr-20 text-black font-light space-y-8 text-fluid-body">
            <li>1. Device & vendor freedom: Use any hardware, any printer, no lock-in.</li>
            <li>2. Future-proof scaling: Grow from single store POS to a full ERP suite, no re-implementation.</li>
            <li>3. Total control: See your data, operations, and compliance in real time.</li>
          </ol>
        </div>
      </div>
    </section>
  );
}
