import React, { useContext, useState, useEffect } from "react";
import Skeleton from "../components/skeleton";
import { LoadingContext } from "../utils/LoadingContext";

export default function Erp() {
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
    const element = document.getElementById("erpSection");
    if (element) observer.observe(element);
    return () => element && observer.unobserve(element);
  }, []);

  if (loading || !isVisible) {
    return (
      <section id="erpSection" className="px-5 max-w-[1200px] mx-auto text-center mt-2">
        <Skeleton height="36px" width="60%" className="mb-4 mx-auto" />
        <Skeleton height="20px" width="80%" className="mb-3 mx-auto" />
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex flex-col md:flex-row items-center justify-between gap-10 mb-6">
            <Skeleton height="20px" width="60%" className="mb-3 md:mb-0 mx-auto md:mx-0" />
            <Skeleton height="180px" width="100%" className="mx-auto" />
          </div>
        ))}
      </section>
    );
  }

  return (
    <section id="erpSection" className="px-5 max-w-[1200px] mx-auto text-center mt-14">
      <h2 className="text-fluid-h2 font-normal mb-2 leading-snug">
        Grows with Your Business—<br />
        <span className="text-fluid-h2 font-normal">
          Scale to Full <span className="text-[#C2185B]">ERP</span> Instantly
        </span>
      </h2>
      <p className="text-fluid-body text-gray-600 mb-12 max-w-4xl mx-auto">
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
        <div key={i} className="flex flex-col md:flex-row items-center justify-between gap-10 mb-12">
          <p className="flex-1 text-left text-fluid-h3 text-[#C2185B] font-light  max-w-md">
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
        </div>
      ))}
    </section>
  );
}