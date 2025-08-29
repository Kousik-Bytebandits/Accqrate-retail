import React, { useContext, useState, useEffect } from "react";
import { LoadingContext } from "../utils/LoadingContext";
import Skeleton from "../components/skeleton";

export default function Onboarding() {
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

    const element = document.getElementById("onboardingSection");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  if (loading || !isVisible) {
    return (
      <section id="onboardingSection" className="px-5 max-w-6xl mx-auto mt-12">
        <Skeleton height="36px" width="60%" className="mx-auto mb-6 rounded-md" />
        {[1, 2].map((i) => (
          <div key={i} className="bg-gray-100 border border-pink-700 rounded-xl p-8 mb-8 shadow-sm w-11/12 max-w-3xl mx-auto">
            <Skeleton height="24px" width="40%" className="mb-3 rounded-md" />
            <Skeleton height="180px" width="100%" className="mb-3 rounded-lg" />
            <Skeleton height="20px" width="80%" className="rounded-md" />
          </div>
        ))}
      </section>
    );
  }

  return (
    <section id="onboardingSection" className="px-5 max-w-6xl mx-auto mt-12">
      <h2 className="text-center font-medium text-fluid-h2  mb-6">
        Fast Data Onboarding & Customization
      </h2>

      <div className="bg-gray-100 border border-pink-700 rounded-xl p-8 mb-8 shadow-sm w-11/12  mx-auto">
        <div className="video-wrapper overflow-hidden rounded-xl">
          <video
            src="/videos/Master Upload.mp4"
            muted
            autoPlay
            loop
            playsInline
            controls={false}
            preload="auto"
            className="w-full h-auto object-contain block"
          />
        </div>
        <p className="text-center font-semibold text-fluid-body mt-3">
          Bulk uploads: Import your entire product catalog via Excel, fast
        </p>
      </div>

      <div className="bg-gray-100 border border-pink-700 rounded-xl p-8 mb-8 shadow-sm w-11/12  mx-auto">
        <div className="video-wrapper overflow-hidden rounded-xl">
          <video
            src="/videos/Add New Category.mp4"
            muted
            autoPlay
            loop
            playsInline
            controls={false}
            preload="auto"
            className="w-full h-auto object-contain block"
          />
        </div>
        <p className="text-center font-semibold text-fluid-body mt-3">
          Organize categories: Structure your catalog for easy browsing and search.
        </p>
      </div>
    </section>
  );
}
