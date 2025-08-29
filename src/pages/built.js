import { useContext, useState, useEffect } from "react";
import Skeleton from "../components/skeleton";
import { LoadingContext } from "../utils/LoadingContext";
import CustomImage from "../components/Image";

export default function Built() {
  const { loading } = useContext(LoadingContext);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = document.getElementById("builtSection");
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true); // only set once, don’t flip back
          observer.unobserve(entry.target); // stop observing
        }
      },
      { rootMargin: "0px", threshold: 0.3 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const sectionClasses = "w-full bg-[#F2F2F2] mt-6 py-8";
  const containerClasses =
    "flex flex-wrap md:flex-row md:text-left justify-between max-w-[1300px] mx-auto gap-5 px-10 md:px-6 sm:flex-col sm:text-center";

  if (loading || !isVisible) {
    return (
      <section id="builtSection" className={sectionClasses}>
        <div className={containerClasses}>
          <div className="flex flex-col justify-center flex-1">
            <Skeleton height="36px" width="60%" className="mb-4" />
            <Skeleton height="20px" width="80%" className="mb-3" />
            <Skeleton height="20px" width="80%" className="mb-3" />
          </div>
          <Skeleton height="350px" width="350px" className="mx-auto" />
        </div>
      </section>
    );
  }

  return (
    <section id="builtSection" className={sectionClasses}>
      <div className={containerClasses}>
        <div
          className="flex flex-col justify-center flex-1"
        
        >
          <h2 className="text-fluid-h2 font-semibold text-[#C2185B] mb-2">
            Built-In{" "}
            <span className="text-[#C2185B] font-semibold">
              E-Invoicing Compliance
            </span>
          </h2>
          <p className="text-fluid-body text-black md:max-w-[500px] mb-1 sm:text-base">
            <span className="font-semibold text-black">100% ZATCA</span> phase 2
            compliance: Issue e-invoice receipts with every sale, no extra fees
          </p>
        </div>

        <div
          className="sm:flex sm:justify-center w-auto"
         
        >
          <CustomImage
            src="/images/zatak.svg"
            alt="E-Invoice"
            width={350}
            height={350}
            className="h-[200px] md:h-[250px]"
          />
        </div>
      </div>
    </section>
  );
}
