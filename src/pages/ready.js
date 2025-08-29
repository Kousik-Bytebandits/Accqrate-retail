import React, { useContext, useState, useEffect } from "react";
import Skeleton from "../components/skeleton";
import { LoadingContext } from "../utils/LoadingContext";

export default function Ready() {
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
    const element = document.getElementById("readySection");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const buttons = ["REQUEST A DEMO", "CONTACT SALES", "LEARN MORE"];

  if (loading || !isVisible) {
    return (
      <section
        id="readySection"
        className="bg-gray-200 py-12 px-4 text-center min-h-full mt-20"
      >
        <Skeleton
          height="36px"
          width="60%"
          className="mb-8 mx-auto rounded-md"
        />
        <div className="flex flex-wrap justify-center gap-4">
          {buttons.map((_, idx) => (
            <Skeleton
              key={idx}
              height="44px"
              width="180px"
              className="rounded-full"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id="readySection"
      className="bg-[#F2F2F2] py-12 px-4 text-center min-h-full mt-20"
    >
      <h2 className="text-black font-normal mb-8 text-fluid-h2">
        Ready to accelerate your retail business?
      </h2>
      <div className="flex  flex-col lg:flex-row  md:max-w-[700px] mx-auto justify-center gap-4 ">
        {buttons.map((label, idx) => (
          <button
            key={idx}
            className="bg-[#C2185C] hover:bg-pink-800 text-white font-light rounded-lg px-6 py-2  w-[260px] md:w-[300px] mx-auto text-center transition-colors"
          >
            {label}
          </button>
        ))}
      </div>
    </section>
  );
}
