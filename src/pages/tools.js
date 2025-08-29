import React, { useContext, useState, useEffect } from "react";
import Skeleton from "../components/skeleton";
import { LoadingContext } from "../utils/LoadingContext";

export default function Tools() {
  const { loading } = useContext(LoadingContext);
  const [isVisible, setIsVisible] = useState(false);

  const handleVisibilityChange = (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleVisibilityChange, {
      rootMargin: "0px",
      threshold: 0.5,
    });

    const element = document.getElementById("toolsSection");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  if (loading || !isVisible) {
    return (
      <section
        id="toolsSection"
        className="bg-white py-8 px-4 max-w-[1200px] mx-auto"
      >
        <Skeleton
          height="36px"
          width="60%"
          className="mx-auto mb-4"
        />
        <Skeleton
          height="20px"
          width="80%"
          className="mx-auto mb-8"
        />
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col md:flex-row items-center gap-4 mb-8">
            <div className="flex-1">
              <Skeleton height="24px" width="60%" className="mb-2" />
              <Skeleton height="16px" width="80%" />
            </div>
            <div className="flex-1 flex justify-center">
              <Skeleton height="120px" width="100%" />
            </div>
          </div>
        ))}
      </section>
    );
  }

  return (
    <section
      id="toolsSection"
      className="bg-white py-8 px-4 max-w-[1200px] mx-auto"
    >
      <h2 className="text-center text-fluid-h2 font-normal mb-2">
        Robust Control &{" "}
        <span className="text-[#C2185B] font-bold">Compliance Tools</span>
      </h2>
      <p className="text-center text-[#000000B2] mb-12 text-fluid-body">
        Maintain tight governance over your retail footprint, from terminal
        permissions to financial integrity
      </p>

      {/* Sections */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
        <div className="flex-1">
          <h3 className="text-[#C2185B] font-bold text-fluid-h3 mb-2">
            User-Level Access Controls:
          </h3>
          <p className=" text-fluid-h3 leading-tight">
            Assign roles, limit functions and monitor activity logs.
          </p>
        </div>
        <div className="flex-1 flex justify-center">
          <video
            src="/videos/manageroles.mp4"
            muted
            autoPlay
            loop
            playsInline
            className="w-full max-w-md rounded-lg"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
        <div className="flex-1">
          <h3 className="text-[#C2185B] font-bold text-fluid-h3 mb-2">
            Day-End Closure & Auditor Reports:
          </h3>
          <p className="text-fluid-h3 leading-tight">
            Generate comprehensive financial summaries—midnight, festival days,
            or anytime.
          </p>
        </div>
        <div className="flex-1 flex justify-center">
          <video
            src="/videos/dayclosure.mp4"
            muted
            autoPlay
            loop
            playsInline
            className="w-full max-w-md rounded-lg"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h3 className="text-[#C2185B] font-bold text-fluid-h3 mb-2">
            Sales Returns, Credit Notes & Advance Bookings:
          </h3>
          <p className="text-fluid-h3 leading-tight">
            Handle exchanges and pre-orders directly at the counter.
          </p>
        </div>
        <div className="flex-1 flex justify-center">
          <video
            src="/videos/productsearch.mp4"
            muted
            autoPlay
            loop
            playsInline
            className="w-full max-w-md rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}
