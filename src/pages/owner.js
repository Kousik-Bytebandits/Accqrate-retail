import React, { useContext, useState, useEffect } from 'react';
import { LoadingContext } from '../utils/LoadingContext';
import Skeleton from '../components/skeleton';

export default function Owner() {
  const { loading } = useContext(LoadingContext);
  const [isVisible, setIsVisible] = useState(false);

  const handleVisibilityChange = (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) setIsVisible(true);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleVisibilityChange, {
      rootMargin: '0px',
      threshold: 0.5,
    });

    const element = document.getElementById('ownerSection');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  if (loading || !isVisible) {
    return (
      <section id="ownerSection" className="bg-gray-200 w-full mt-8 py-16">
        <div className="flex items-center justify-center text-center">
          <div className="max-w-2xl">
            <Skeleton height="32px" width="80%" className="mb-4 rounded-md" />
            <Skeleton height="20px" width="40%" className="rounded-md" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="ownerSection" className="bg-[#F2F2F2] w-full mt-8 py-16">
      <div className="flex items-center justify-center ">
        <div className="max-w-6xl px-4 md:px-6">
          <p className=" font-light leading-tight text-fluid-h3 md:text-fluid-h2 text-left mb-5">
            “We set up 5 new outlets in under an hour—no IT team needed.”
          </p>
          <p className="text-gray-500 text-fluid-body flex justify-end ">
            — Retail Owner, Jeddah
          </p>
        </div>
      </div>
    </section>
  );
}
